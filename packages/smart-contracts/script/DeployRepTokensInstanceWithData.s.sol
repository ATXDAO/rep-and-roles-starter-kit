// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {RepTokensInstance} from "../src/RepTokensInstance.sol";
import {Script, console} from "../lib/forge-std/src/Script.sol";

contract DeployRepTokensInstanceWithData is Script {
    address[] _admins = [0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266];
    uint256 maxMintAmount = 10;
    string baseURI =
        "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/";

    function run() public returns (RepTokensInstance) {
        vm.startBroadcast();
        RepTokensInstance instance = new RepTokensInstance(
            _admins,
            maxMintAmount,
            baseURI
        );
        vm.stopBroadcast();
        return instance;
    }
}
