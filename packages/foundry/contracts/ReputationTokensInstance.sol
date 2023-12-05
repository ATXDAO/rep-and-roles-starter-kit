// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ReputationTokensStandalone} from "@atxdao/contracts/reputation/ReputationTokensStandalone.sol";

contract ReputationTokensInstance is ReputationTokensStandalone {
    constructor(
        address ownerNominee,
        address[] memory admins,
        string memory baseURI
    ) ReputationTokensStandalone(ownerNominee, admins, baseURI) {}

    function imatest() external pure returns (uint256) {
        return 5;
    }

    // hello
    //
}
