const account = require.resolve("auth/account.service.js");
const profile = require.resolve("profile/profile.service.js");
const registration = require.resolve("register/register.service.js");

module.exports = function (broker) {
	broker.loadService("./lab.service.js");
	broker.loadService("./web.service.js");

	broker.loadService(account);
	broker.loadService(profile);
  broker.loadService(registration);

	return {
		name: "service-father"
	}
}
