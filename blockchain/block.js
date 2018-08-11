const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
    constructor(index, timestamp, lasthash, hash, data, nonce, difficulty) {
        this.index = index;
        this.timestamp = timestamp;
        this.lasthash = lasthash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block - 
        Index     : ${this.index}
        Timestamp : ${this.timestamp}
        Last hash : ${this.lasthash.substring(0, 10)}
        Hash      : ${this.hash.substring(0, 10)}
        Nonce     : ${this.nonce}
        Difficulty: ${this.difficulty}
        Data      : ${this.data} 
        `
    }

    static genesis() {
        let index = 0;
        let timestamp = '1465154705';
        let lasthash = null;
        let data = [];
        let nonce = 0;
        let difficulty = DIFFICULTY;
        let hash = ChainUtil.hash(`${index}${timestamp}${lasthash}${data}${nonce}${difficulty}`).toString();
        return new this(index, timestamp, lasthash, hash, data, nonce, difficulty);
    }

    static mineBlock(lastBlock, data) {
        const lastHash = lastBlock.hash;
        let nonce = 0;
        let index = lastBlock.index + 1;
        let hash, timestamp;
        let { difficulty } = lastBlock;

        do {
            nonce++;
            timestamp = new Date().getTime() /1000;
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(index, timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty))

        return new this(index, timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash(index, timestamp, lastHash, data, nonce, difficulty) {
        return ChainUtil.hash(`${index}${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const {index, timestamp, lasthash, data, nonce, difficulty } = block;
        return Block.hash(index, timestamp, lasthash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ?
          difficulty + 1 : difficulty - 1;
        return difficulty;
    }

    static isValidNewBlock(newBlock, previousBlock) {
        if (previousBlock.index +1 !== newBlock.index) {
            console.log('invalid index!');
            return false;
        } else if (previousBlock.hash !== newBlock.lasthash) {
            console.log('Invalid previous hash!');
            return false;
        } else if (newBlock.hash !== this.blockHash(newBlock)){
            console.log('Invalid hash!');
            return false;
        }
        return true;
    }
}

module.exports = Block;