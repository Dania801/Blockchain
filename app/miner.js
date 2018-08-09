const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction');

class Miner {
    constructor(blockchain, transactionPool, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine() {
        // validate the transactions in transaction pool
        const validTransactions = this.transactionPool.validTransactions();
        // reward miner
        validTransactions.push(
          Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet())
        );
        // add the reward transaction to local blockchain
        const block = this.blockchain.addBlock(validTransactions);
        // sync chains between all peers
        this.p2pServer.syncChains();
        // clear the local transaction pool from all transaction
        this.transactionPool.clear();
        // clear transactions pool globaly
        this.p2pServer.broadcastClearTransactions();
    
        return block;
    }
}

module.exports = Miner;