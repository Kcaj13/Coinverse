//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

contract Coinverse {


    //Coins to eth (Check if coin value is < uint coins on front end)
    function convertToEth(uint coins) public {
        uint toEth = (coins / 1000) * (1 ether); //Convert coins to ethereum
        (bool sent, ) = msg.sender.call{value: toEth }("");
        require(sent, "Failed to send Ether");
    }

    //ETH to coins
    function convertToCoins() public payable {
        //Update users coin balance on front-end
    }

    //Send eth to other user 
    //Add value parameter? and remove payable to prevent sending to contract
    function sendEth(address payable _to) public payable {
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
} 