const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY } = require('../config');

class Block {
    constructor(timestamp, lasthash, hash, data, nonce) {
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    toString() {
        return `Block - 
        Timestamp: ${this.timestamp}
        Last hash: ${this.lasthash.substring(0, 10)}
        Hash     : ${this.hash.substring(0, 10)}
        Nonce    : ${this.nonce}
        Data     : ${this.data} 
        `
    }

    static genesis() {
        return new this('Genesis time', '-----', 'f1r57-h45h', [], 0);
    }

    static mineBlock(lastBlock, data) {
        const lastHash = lastBlock.hash;
        let nonce = 0;
        let hash, timestamp

        do {
            nonce++;
            hash = Block.hash(timestamp, lastHash, data, nonce);
            timestamp = Date.now();
        } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY))

        return new this(timestamp, lastHash, hash, data, nonce);
    }

    static hash(timestamp, lastHash, data, nonce) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lasthash, data, nonce } = block;
        return Block.hash(timestamp, lasthash, data, nonce);
    }
}

module.exports = Block;