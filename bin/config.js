const path = require('path');
const fs = require('fs');
const { LanguageNames } = require('tera-toolbox-mui');
const ConfigFilePath = path.join(__dirname, '..', 'config.json');

const bigIntSerializator = (key, value) => {
    return typeof value === "bigint" ? `BIGINT:${value}` : value;
};

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
    branch: 'master',
    uilanguage,
    updatelog: false,
    devmode: false,
    noselfupdate: false,
    noupdate: false,
    noslstags: false,
    noserverautojoin: false
};

function loadConfig() {
    if (!fs.existsSync(ConfigFilePath)) {
        return [defaultSettings, 0];
    }
    let result = null;
    try {
        result = fs.readFileSync(ConfigFilePath, 'utf8');
        return [JSON.parse(result, bigIntDeserializator), 0];
    } catch (_) {
        return [defaultSettings, 1];
    }
}

function saveConfig(newConfig) {
    fs.writeFileSync(ConfigFilePath, JSON.stringify(newConfig, bigIntSerializator, 4));
}

module.exports = { loadConfig, saveConfig };
