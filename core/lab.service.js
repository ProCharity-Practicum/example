// lab.service.js
const Laboratory = require("@moleculer/lab");

module.exports = {
    mixins: [Laboratory.AgentService],
    settings: {
        token: "testtoken",
        apiKey: "3M7C36T-KG942ZN-Q9BH8FF-HS9CVD0" // ТАК ДЕЛАТЬ НЕЛЬЗЯ! Только для примера
    }
};
