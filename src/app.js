const { buildLogger } = require("./plugins");

const logger = buildLogger("app.js");

logger.log("Hello World222");
logger.error("Error");
