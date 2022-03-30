// JavaScript source code
const SHA256 = require('crypto-js/sha256'); // For hash generation: Import using; npm install --save crypto-js


//Keeping a track of all the values
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash;
    }

    //Hash generation.
    calcuateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

/*constructor is responsible for initialising the block chain. The chain is an array of blocks (you see where this is going)
 * The genisis block is simply the first bloch in the chain this is why 0*/

class Blockchain {
    constructor() {                     
        this.chain = [this.createGenisisBlock()];
    }

    createGenisisBlock() {
        return new Block(0, "30/03/2022", "Genisis block", "0");
    }

    //returns latest block in the chain 
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /*This is self explanatory I think, so previous hash for new block is the previous blocks hash. 
     * Then you need to recalculate the hash as new.
     * Then pushes the new Block onto the chain*/
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calcuateHash();
        this.chain.push(newBlock);
    }


/*Start with index 1 as block 0 is Genisis Block  
 */  
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calcuateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

/*Creating an instance */
let geilhashCoin = new Blockchain();
geilhashCoin.addBlock(new Block(1, "30/03/2022", { amount: 8 }));
geilhashCoin.addBlock(new Block(2, "1/04/2022", { amount: 4 }));

/*Will print out blockchain result. Sringify to make it readable*/
console.log(JSON.stringify(geilhashCoin, null, 4));

//console.log('Is block chain valid?' + geilhashCoin.isChainValid());

//geilhashCoin.chain[1].data = { amount: 100 };//Tamper with test example  
//geilhashCoin.chain[1].data.hash = geilhashCoin.chain[1].calcuateHash(); //Can't be recalculated as broken

//console.log('Is block chain valid?' + geilhashCoin.isChainValid());




