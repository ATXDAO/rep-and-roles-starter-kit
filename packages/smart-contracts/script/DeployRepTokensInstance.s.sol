// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {RepTokensInstance} from "../src/RepTokensInstance.sol";
import {Script, console} from "../lib/forge-std/src/Script.sol";

contract DeployRepTokensInstance is Script {
    function run(
        address ownerNominee,
        address[] memory admins,
        uint256 maxMintAmount,
        string memory baseURI
    ) public returns (RepTokensInstance) {
        vm.startBroadcast();
        RepTokensInstance instance = new RepTokensInstance(
            ownerNominee,
            admins,
            maxMintAmount,
            baseURI
        );
        vm.stopBroadcast();
        return instance;
    }
}
