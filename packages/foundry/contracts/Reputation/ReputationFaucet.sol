// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ReputationTokens} from "@atxdao/contracts/reputation/ReputationTokens.sol";

contract ReputationFaucet {
    ReputationTokens reputationTokens;

    constructor(address addr) {
        reputationTokens = ReputationTokens(addr);
    }

    function claim() external {
        ReputationTokens.Sequence memory sequence;
        sequence.operations = new ReputationTokens.Operation[](3);
        sequence.recipient = msg.sender;

        for (uint256 i = 0; i < sequence.operations.length; i++) {
            sequence.operations[i].id = i;
            sequence.operations[i].amount = 15;
        }

        reputationTokens.distribute(address(this), sequence);
    }
}
