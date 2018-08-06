// const Blockchain = require('./blockchain');

// const bc = new Blockchain();

// for (let i=0; i < 10; i++){
//     console.log(bc.addBlock(`foo ${i}`).toString());
// }

 const Wallet = require('./wallet');
 const TransactionPool = require('./wallet/transaction-pool');
 const Blockchain = require('./blockchain');
// const Transaction = require('./wallet/transaction');
// wallet = new Wallet();
// amount = 50;
// recipient = 'r3c1p13nt';
// transaction = Transaction.newTransaction(wallet, recipient, amount);
// console.log('The test!!!!',transaction.outputs.find(output => output.address === wallet.publicKey).amount);
 const INITIAL_BALANCE = require('./config').INITIAL_BALANCE;
// let transaction, sendAmount, recipient;
// sendAmount = 50;
// recipient = 'r4nd0m-4ddr355';
// transaction = wallet.createTransaction(recipient, sendAmount, bc, tp);
// wallet.createTransaction(recipient, sendAmount, bc, tp);
// console.log('The transaction: ', transaction.outputs.find(output => output.address === wallet.publicKey).amount);
// let validTransactions;
// validTransactions = [...tp.transactions];
// for (let i=0 ; i < 6; i++){
//     wallet = new Wallet();
//     transaction = wallet.createTransaction('r4and-4ddr355', 30, bc, tp);
//     console.log(transaction);
// }

//console.log(tp.validTransactions())

// let addBalance, repeatAdd, senderWallet;
// senderWallet = new Wallet();
// addBalance = 100;
// repeatAdd = 3;
// for (let i=0; i<repeatAdd; i++) {
//     senderWallet.createTransaction(wallet.publicKey, addBalance, bc, tp);
// }
// bc.addBlock(tp.transactions);
// console.log(bc);
// console.log(wallet.calculateBalance(bc))
// console.log(INITIAL_BALANCE + (addBalance * repeatAdd));

let tp, wallet, transaction, bc;
tp = new TransactionPool();
wallet = new Wallet();
bc = new Blockchain();
transaction = wallet.createTransaction('r4nd-4ddr355', 30, bc, tp);
console.log(tp.transactions.find(t => t.id === transaction.id));
console.log('===> transaction ', transaction);
console.log(tp.transactions.find(t => t.id === transaction.id) === transaction)