const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Exclude services or utils from being treated as routes
// defaultConfig.resolver.blockList = [/services\/.*/];

module.exports = defaultConfig;
