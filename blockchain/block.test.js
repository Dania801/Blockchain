const Block = require('./block');
const { DIFFICULTY } = require('../config');

describe('Block', () => {
    let data, lastBlock, block;

    beforeEach(() => {
        data = 'bar',
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it('sets the data to match the input', () => {
        expect(block.data).toEqual(data);
    });

    it('sets the lastHash to match the hash of the last block', () => {
        expect(block.lasthash).toEqual(lastBlock.hash);
    });

    it('Generate a hash that matches a difficulty', (next) => {
        expect(block.hash.substring(0, DIFFICULTY)).toEqual('0'.repeat(DIFFICULTY));
        next();
    });

    it('Lowers the difficulty for slowly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp+360000)).toEqual(block.difficulty -1);
    });

    it('Raises the difficulty for quickly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual(block.difficulty +1);
    });
})