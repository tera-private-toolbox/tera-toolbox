const padding = require('./data/padding.json');

function hasPadding(protocolVersion, name) {
    const packets = padding[protocolVersion];
    if (packets) {
        return packets.includes(name);
    }
    return false;
}

module.exports = hasPadding;
