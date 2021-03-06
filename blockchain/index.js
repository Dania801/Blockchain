const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    getBlockchain() {
        return this.chain;
    }

    getLastestBlock() {
        return this.chain[this.chain.length -1];
    }

    addBlock(data) {
        const block = Block.mineBlock(this.getLastestBlock(), data);
        if(Block.isValidNewBlock(block, this.getLastestBlock())) {
            this.chain.push(block);
            return block;
        }
        return false;
    }

    isValidChain(chain) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
            console.log('GENESIS BLOCK ERROR!')
            return false;
        }
        for (let i=1; i<chain.length; i++) {
          const block = chain[i];
          const lastBlock = chain[i-1];
          if (block.lasthash !== lastBlock.hash ||
              block.hash !== Block.blockHash(block)) {
            return false;
          }
        }
    
        return true;
      }

    getAccumulatedDifficulty(blockchain) {
        return blockchain
            .map(block => block.difficulty)
            .map(difficulty => Math.pow(2, difficulty))
            .reduce((a, b) => a + b);
    }

    replaceChain(newChain) {
        if(!this.isValidChain(newChain)) {
            console.log('The recieved chain is not valid.');
            return;
        } else if (this.getAccumulatedDifficulty(newChain) >= this.getAccumulatedDifficulty(this.chain)){
            console.log('Replacing blockchain with the new chain');
            this.chain = newChain;
        } else {
            console.log('Recieved invalid blockchain!');
        }

        // if(newChain.length <= this.chain.legnth) {
        //     console.log('Recieved chain not longer than the current chain.');
        //     return;
        // } else if (!this.isValidChain(newChain)) {
        //     console.log('The recieved chain is not valid.');
        //     return;
        // }
        // console.log('Replacing blockchain with the new chain');
        // this.chain = newChain;
    }
}

module.exports = Blockchain;