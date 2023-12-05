// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ReputationTokensInstance} from "../contracts/ReputationTokensInstance.sol";
import {Script, console} from "../lib/forge-std/src/Script.sol";

contract DeployRepTokensInstance is Script {
    function run(
        address ownerNominee,
        address[] memory admins,
        string memory baseURI
    ) public returns (ReputationTokensInstance) {
        vm.startBroadcast();
        ReputationTokensInstance instance = new ReputationTokensInstance(
            ownerNominee,
            admins,
            baseURI
        );
        vm.stopBroadcast();
        return instance;
    }
}
