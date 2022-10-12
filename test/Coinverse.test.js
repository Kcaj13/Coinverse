const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledCoinverse = require("../ethereum/contracts-build/Coinverse.json");
const abi = compiledCoinverse.abi
const bytecode = compiledCoinverse.evm.bytecode.object

let coinverse;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    coinverse = await new web3.eth.Contract(abi)
    .deploy({ data: '0x' + bytecode })
    .send({ gas: "1000000", from: accounts[0] });
});

describe('Coinverse Contract', () => {
    it('deploys a contract', () => {
        assert.ok(coinverse.options.address);
    });

    it('can transfer ethereum to an account', async () => {
        const acc1StartBalance = await web3.eth.getBalance(accounts[1]);
        const acc2StartBalance = await web3.eth.getBalance(accounts[2]);

        await coinverse.methods.sendEth(accounts[2]).send({ from: accounts[1], value: web3.utils.toWei('2', 'ether'), gas: '1000000' });

        const acc1EndBalance = await web3.eth.getBalance(accounts[1]);
        const acc2EndBalance = await web3.eth.getBalance(accounts[2]);

        const ethSent = acc1StartBalance - acc1EndBalance;
        const ethReceived = acc2EndBalance - acc2StartBalance;

        assert(ethSent > web3.utils.toWei('2', 'ether')); //Takes into account gas fees
        assert(ethSent < web3.utils.toWei('2.1', 'ether'));
        assert(ethReceived == web3.utils.toWei('2', 'ether'));
    });

    it('can recieve ethereum to be swapped for coins', async() => {
        const acc0StartBalance = await web3.eth.getBalance(coinverse.options.address)
        const acc3StartBalance = await web3.eth.getBalance(accounts[3]);

        await coinverse.methods.convertToCoins().send({ from: accounts[3], value: web3.utils.toWei('2', 'ether'), gas: '1000000' });
       
        const acc0EndBalance = await web3.eth.getBalance(coinverse.options.address)
        const acc3EndBalance = await web3.eth.getBalance(accounts[3]);

        const ethSent = acc3StartBalance - acc3EndBalance;
        const ethReceived = acc0EndBalance - acc0StartBalance;

        assert(ethSent > web3.utils.toWei('2', 'ether')); //Takes into account gas fees
        assert(ethSent < web3.utils.toWei('2.1', 'ether'));
        assert(ethReceived == web3.utils.toWei('2', 'ether'));
    });

    it('can send ethereum to an account depending on the coins inputted', async() => {
        //Send 2 eth to contract to be used to send to user
        await coinverse.methods.convertToCoins().send({ from: accounts[3], value: web3.utils.toWei('2', 'ether'), gas: '1000000' });

        const acc0StartBalance = await web3.eth.getBalance(coinverse.options.address)
        const acc4StartBalance = await web3.eth.getBalance(accounts[4]);

        await coinverse.methods.convertToEth(2000).send({ from: accounts[4] });

        const acc0EndBalance = await web3.eth.getBalance(coinverse.options.address)
        const acc4EndBalance = await web3.eth.getBalance(accounts[4]);

        const ethSent = acc0StartBalance - acc0EndBalance;
        const ethReceived = acc4EndBalance - acc4StartBalance;

        assert(ethSent == web3.utils.toWei('2', 'ether')); //Takes into account gas fees
        assert(ethReceived > web3.utils.toWei('1.9', 'ether'));
    });

});
