// moleculer.config.js
require("@moleculer/lab");

module.exports = {
	transporter: "TCP",
	logger: [{
		type: "Console",
		options: { /*...*/ }
	}, "Laboratory"],  
	tracing: {
      enabled: true,
      exporter: "Laboratory"
  },
  metrics: {
      enabled: true,
      reporter: "Laboratory"
  },
};
