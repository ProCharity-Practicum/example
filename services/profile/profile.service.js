const DbService = require("moleculer-db");
const path = require("path");
const { Api } = require("api");

module.exports = {
  // Define service name
  name: "profile",
  mixins: [DbService],
  adapter: new DbService.MemoryAdapter({
    filename: path.join(process.env.DB_PATH, 'profile.db')
  }),

  created() {
    this.api = new Api(this);
  },

  dependencies: [
    "account"
  ],

  settings: {
    fields: ["_id", "name", "email", "phone"],
    entityValidator: {
      name: "string",
      email: "string",
      phone: "string"
    }
  },

  actions: {
    update: {
      rest: [
        { method: 'PATCH', fullPath: '/api/profile/:id' }
      ],
      params: {
        id: { type: 'string' },
        name: { type: 'string', optional: true },
        email: { type: 'string', min: 3, max: 50, optional: true },
        phone: { type: 'string', optional: true },
        password: { type: 'string', min: 8, max: 50, optional: true }
      },
      async handler(ctx) {
        return this.api.context(ctx).updateProfile(ctx.params, ctx.meta);
      }
    }
  }
};
