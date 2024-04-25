// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ReputationTokens} from "@atxdao/contracts/reputation/ReputationTokens.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

contract ReputationFaucet is ERC1155Holder {
    ReputationTokens reputationTokens;

    constructor(address addr) {
        reputationTokens = ReputationTokens(addr);
    }

    function claim() external {
        uint256[] memory tokenIds = new uint256[](3);
        tokenIds[0] = 0;
        tokenIds[1] = 1;
        tokenIds[2] = 2;

        uint256[] memory mintAmounts = new uint256[](3);
        mintAmounts[0] = 120;
        mintAmounts[1] = 120;
        mintAmounts[2] = 120;

        reputationTokens.distributeBatch(address(this), msg.sender, tokenIds, mintAmounts, "");

        // ReputationTokens.Sequence memory sequence;
        // sequence.operations = new ReputationTokens.Operation[](3);

        // uint256[] memory tokenIds[]
        // sequence.recipient = msg.sender;

        // for (uint256 i = 0; i < sequence.operations.length; i++) {
        //     sequence.operations[i].id = i;
        //     sequence.operations[i].amount = 120;
        // }

        // reputationTokens.distribute(address(this), sequence);
    }
}
