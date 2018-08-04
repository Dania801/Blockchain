// const Blockchain = require('./blockchain');

// const bc = new Blockchain();

// for (let i=0; i < 10; i++){
//     console.log(bc.addBlock(`foo ${i}`).toString());
// }

 const Wallet = require('./wallet');
 const TransactionPool = require('./wallet/transaction-pool');
// const Transaction = require('./wallet/transaction');
// wallet = new Wallet();
// amount = 50;
// recipient = 'r3c1p13nt';
// transaction = Transaction.newTransaction(wallet, recipient, amount);
// console.log('The test!!!!',transaction.outputs.find(output => output.address === wallet.publicKey).amout);

wallet = new Wallet();
tp = new TransactionPool();
let transaction, sendAmount, recipient;
sendAmount = 50;
recipient = 'r4nd0m-4ddr355';
transaction = wallet.createTransaction(recipient, sendAmount, tp);
wallet.createTransaction(recipient, sendAmount, tp);
console.log('The transaction: ', transaction.outputs.find(output => output.address === wallet.publicKey).amount);
//console.log(transaction.outputs.find(output => output.address === wallet.publicKey).amount);
