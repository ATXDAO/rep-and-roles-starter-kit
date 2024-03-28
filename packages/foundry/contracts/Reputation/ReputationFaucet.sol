// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ReputationTokensStandalone} from "@atxdao/contracts/reputation/ReputationTokensStandalone.sol";
import {ReputationTokensInternal} from "@atxdao/contracts/reputation/ReputationTokensInternal.sol";

contract ReputationFaucet {
    ReputationTokensStandalone reputationTokens;

    constructor(address addr) {
        reputationTokens = ReputationTokensStandalone(addr);
    }

    function claim() external {
        ReputationTokensInternal.TokensOperations memory tokenOperations;
        tokenOperations
            .operations = new ReputationTokensInternal.TokenOperation[](3);
        tokenOperations.to = msg.sender;

        for (uint256 i = 0; i < tokenOperations.operations.length; i++) {
            tokenOperations.operations[i].id = i;
            tokenOperations.operations[i].amount = 15;
        }

        reputationTokens.distribute(address(this), tokenOperations, "");
    }
}
