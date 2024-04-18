const path = require('path');
const fs = require('fs');
const { LanguageNames } = require('tera-toolbox-mui');
const ConfigFilePath = path.join(__dirname, '..', 'config.json');

const bigIntSerializator = (key, value) => (typeof value === "bigint" ? `BIGINT:${value}` : value);

const bigIntDeserializator = (key, value) => {
    if (typeof value === "string" && value.startsWith("BIGINT:")) {
        return BigInt(value.substr(7));
    }
    return value;
};

const getUiLanguage = () => {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    if (LanguageNames[locale]) {
        return locale;
    } else if (LanguageNames[locale.split('-')[0]]) {
        return locale.split('-')[0];
    }
    return 'en';
};

const uilanguage = getUiLanguage();
const defaultSettings = {
    version: 1,
    branch: 'beta',
    uilanguage,
    updatelog: false,
    devmode: false,
    noselfupdate: false,
    noupdate: false,
    noslstags: false,
    noserverautojoin: false
};

function loadConfig(returnArray = false) {
    if (!fs.existsSync(ConfigFilePath)) {
        return returnArray ? [defaultSettings, 0] : defaultSettings;
    }
    let result = null;
    try {
        result = fs.readFileSync(ConfigFilePath, 'utf8');
        result = JSON.parse(result, bigIntDeserializator);
        result = migrateConfig(result);
        return returnArray ? [result, 0] : result;
    } catch (_) {
        return returnArray ? [defaultSettings, 1] : defaultSettings;
    }
}

function saveConfig(newConfig) {
    fs.writeFileSync(ConfigFilePath, JSON.stringify(newConfig, bigIntSerializator, 4));
}

function migrateConfig(config) {
    const version = config.version || 0;
    if (version < defaultSettings.version) {
        // Migrations
        if (version < 1) {
            config.branch = defaultSettings.branch;
        }
        config.version = defaultSettings.version;
        config = { ...defaultSettings, ...config };
        saveConfig(config);
    }
    return config;
}

module.exports = { loadConfig, saveConfig };
