'use strict';

class PacketIntegrity {
    constructor(iv) {
        this.iv = iv;
        this.counters = [];

        for (let i = 0; i < 0x10000; i++)
            this.counters.push(0);
    }

    calc(data, opcode, count) {
        const { iv } = this;

        if (iv == null) return 0; // Patch 92 shim - server checks are disabled via hotfix 92.04

        let res = 0;
        for (let i = 0, acc = iv; i < data.length; i++) {
            if (i - 8 >>> 0 < 4) continue; // Skip hash placeholder

            switch ((acc += i) % 5) {
                case 0:
                    res += (-iv + opcode + count + i) ^ (data[i] << i % 3);
                    break;
                case 1:
                    res += (iv + opcode + count + i) & (data[i] << (i & 3));
                    break;
                case 2:
                    res += (-2*iv + opcode + count + i) | (data[i] << (i & 1));
                    break;
                case 3:
                    res += (2*iv + -opcode + count + i) ^ (data[i] << i % 3);
                    break;
                case 4:
                    res += (iv + opcode + count) ^ (data[i] << i % 3);
                    break;
            }
        }

        return res >>> 0;
    }

    apply(data, opcode) {
        let count = ++this.counters[opcode];

        data.writeUInt32LE(count >>> 0, 4); // Must be written first (affects hash output)
        data.writeUInt32LE(this.calc(data, opcode, count), 8);
    }

    validate(data) {
        if (data.length < 12) return false;

        const opcode = data.readUInt16LE(2);
        const count = data.readUInt32LE(4);
        const hash = data.readUInt32LE(8);

        return hash === this.calc(data, opcode, count);
    }
}

module.exports = PacketIntegrity;
