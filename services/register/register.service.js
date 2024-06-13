const { Api } = require("api");
const validate = require("api/validation");

module.exports = {
  // Define service name
  name: "registration",
  dependencies: [
    "account",
    "profile"
  ],

  created() {
    this.api = new Api(this);
  },

  settings: {

  },

  actions: {
    registerUser: {
      rest: [
        { method: 'POST', fullPath: '/api/register' }
      ],
      params: {
        name: validate.name,
        email: validate.username,
        phone: validate.phone,
        password: validate.password
      },
      async handler(ctx) {
        return this.api.context(ctx).registerUser(ctx.params);
      }
    }
  }
};
