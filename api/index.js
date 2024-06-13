const jwt = require("jsonwebtoken");
const crypto = require('node:crypto');
const {Errors: E} = require("moleculer-web");
const settings = require("./config.js");

class Api {
  constructor(service) {
    this.service = service;
    this.settings = settings;
  }

  context(ctx) {
    this.ctx = ctx;
    return this;
  }

  model(name) {
    if (this.service.name === name) return this.service;
    return this._modelApi(name);
  }

  _modelApi(name) {
    return {
      list: params => this.ctx.call(`${name}.list`, params),
      find: params => this.ctx.call(`${name}.find`, params),
      insert: params => this.ctx.call(`${name}.insert`, params),
      get: params => this.ctx.call(`${name}.get`, params),
      create: params => this.ctx.call(`${name}.create`, params),
      update: params => this.ctx.call(`${name}.update`, params),
      remove: params => this.ctx.call(`${name}.remove`, params),
      count: params => this.ctx.call(`${name}.count`, params)
    };
  }

  async checkAuthState(_, {user}) {
    return Promise.resolve({user});
  }

  async login({username, password}) {
    const account = await this.model("account").getById(username);
    if (!account) throw new E.InvalidRequestBodyError();

    const hashedPassword = this.getHash(password + this.settings.salt);
    if (hashedPassword !== account.password) throw new E.InvalidRequestBodyError();

    const data = {
      id: account.profile,
      role: account.role,
      account: username,
      created: account.createdAt
    };
    const token = jwt.sign(data, this.settings.jwtSecret, this.settings.jwtOptions);

    return {result: data, token};
  }

  async registerUser({name, email, phone, password}) {
    if (await this.isExisted(email)) throw new E.BadRequestError();

    const profile = await this.model("profile").create({name, email, phone});
    if (!profile) throw new E.InvalidRequestBodyError();

    const account = await this.model("account").create({
      username: email,
      profile: profile._id,
      role: "user",
      password: this.getHash(password + this.settings.salt)
    });
    if (!account) throw new E.InvalidRequestBodyError();

    return profile;
  }

  async updateProfile({id, name, email, phone, password}, { user }) {
    if (id !== user.id) throw new E.UnAuthorizedError();
    const profile = await this.model("profile")._get(this.ctx, {id});
    if (!profile) throw new E.NotFoundError();

    const nextProfile = {
      name: name || profile.name,
      email: profile.email,
      phone: phone || profile.phone
    };

    if (email || password) {
      let account = await this._findOne("account", {profile: id});
      if (email && email !== profile.email) {
        if (await this.isExisted(email)) throw new E.BadRequestError();
        nextProfile.email = email;
        await this.model("account").remove({id: profile.email});
        account = await this.model("account").create(Object.assign({}, account, {
          username: email
        }));
      }
      const accountID = account.username;
      const nextAccount = Object.assign({}, account);

      if (password) {
        nextAccount.password = this.getHash(password + this.settings.salt);
        await this.model("account").update({id: accountID, ...nextAccount});
      }
    }

    if (name || email || phone) {
      await this.model("profile")._update(this.ctx, {id, ...nextProfile});
    }

    return this.model("profile")._get(this.ctx, {id});
  }

  async _findOne(model, query) {
    const data = await this.model(model).find({query});
    if (!data) throw new E.NotFoundError();
    if (data.length > 1) throw new E.BadRequestError();
    return data[0];
  }

  async isExisted(email) {
    try {
      const existed = await this.model("account").get({id: email});
      return !!existed;
    } catch (err) {
      return false;
    }

  }

  resolveToken({token}) {
    return jwt.verify(token, this.settings.jwtSecret, this.settings.jwtOptions);
  }

  getHash(str) {
    return crypto.hash(this.settings.hashType, str);
  }
}

module.exports = {Api};
