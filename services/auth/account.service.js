const DbService = require("moleculer-db");
const path = require('path');

const { Api } = require("api");
const validate = require("api/validation");

module.exports = {
  // Define service name
  name: "account",
  mixins: [DbService],
  adapter: new DbService.MemoryAdapter({
    filename: path.join(process.env.DB_PATH, 'account.db')
  }),

  created() {
    this.api = new Api(this);
  },

  settings: {
    fields: ["profile", "role", "username", "password", "createdAt", "updatedAt"],
    entityValidator: {
      profile: "string",
      role: "string"
    },
    idField: "username"
  },
  beforeEntityCreate(json) {
    json.createdAt = new Date();
    json.updatedAt = new Date();
    return json; // You must return the modified entity here
  },
  beforeEntityUpdate(json) {
      json.updatedAt = new Date()
      return json;
  },
  hooks: {
    after: {
      get: [
        (_, res) => {
          delete res.password;
          return res;
        }
      ],
      list: [
        (_, res) => {
          res.rows = res.rows.map(row => {
            delete row.password;
            return row;
          });
          return res;
        }
      ]
    }
  },
  actions: {
    checkAuthState: {
      rest: [
        { method: 'GET', fullPath: '/api/me' }
      ],
      handler(ctx) {
        return this.api.context(ctx).checkAuthState(ctx.params, ctx.meta);
      }
    },
    login: {
      rest: [
        { method: 'POST', fullPath: '/api/login' }
      ],
      params: {
        username: validate.username,
        password: validate.password
      },
      async handler(ctx) {
        return this.api.context(ctx).login(ctx.params);
      }
    },
    resolveToken(ctx) {
      return this.api.context(ctx).resolveToken(ctx.params);
    }
  }
};
