// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {RepTokensInstance} from "../contracts/RepTokensInstance.sol";
import {Script, console} from "../lib/forge-std/src/Script.sol";

contract DeployRepTokensInstance is Script {
    function run(
        address ownerNominee,
        address[] memory admins,
        string memory baseURI
    ) public returns (RepTokensInstance) {
        vm.startBroadcast();
        RepTokensInstance instance = new RepTokensInstance(
            ownerNominee,
            admins,
            baseURI
        );
        vm.stopBroadcast();
        return instance;
    }
}
