const ApiService = require("moleculer-web");
const E = require("moleculer-web").Errors;

module.exports = {
  // Define service name
  name: "web",
  mixins: [ApiService],

  dependencies: [
    "account",
    "profile"
  ],

  settings: {
    routes: [
      {
        path: '/api',
        authorization: true,
        whitelist: [
          "account.checkAuthState",
          "profile.update",
          "profile.list",
          "profile.get"
        ],
        autoAliases: true
      },
      {
        path: '/auth',
        authorization: false,
        whitelist: [
          "account.login",
          "registration.registerUser"
        ],
        autoAliases: true,
        bodyParsers: {
          json: {
            strict: false
          },
          urlencoded: {
            extended: false
          }
        }
      },
    ]
  },

  methods: {
    // Second thing
    async authorize(ctx, route, req, res) {
        // Read the token from header
        let auth = req.headers["authorization"];
        if (auth && auth.startsWith("Bearer")) {
            let token = auth.slice(7);

            // Check the token
            try {
              ctx.meta.user = await ctx.call("account.resolveToken", {token});
            } catch (err) {
              throw new E.UnAuthorizedError(E.ERR_INVALID_TOKEN);
            }

        } else {
            // No token
            throw new E.UnAuthorizedError(E.ERR_NO_TOKEN);
        }
    }
  }
};
