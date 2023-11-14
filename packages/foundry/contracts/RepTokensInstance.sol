// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ReputationTokensStandalone} from "@atxdao/contracts/reputation/ReputationTokensStandalone.sol";

contract RepTokensInstance is ReputationTokensStandalone {
    constructor(
        address ownerNominee,
        address[] memory admins,
        uint256 maxMintAmountPerTx,
        string memory baseURI
    )
        ReputationTokensStandalone(
            ownerNominee,
            admins,
            maxMintAmountPerTx,
            baseURI
        )
    {}

    function imatest() external pure returns (uint256) {
        return 5;
    }

    // hello
    //
}
