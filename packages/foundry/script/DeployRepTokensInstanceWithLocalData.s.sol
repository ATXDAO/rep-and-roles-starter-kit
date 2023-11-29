// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {RepTokensInstance} from "../contracts/RepTokensInstance.sol";
import {Script, console} from "../lib/forge-std/src/Script.sol";

contract DeployRepTokensInstanceWithLocalData is Script {
    address[] _admins = [0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266];
    uint256 maxMintAmount = 10;
    string baseURI =
        "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/";

    function run() public returns (RepTokensInstance) {
        vm.startBroadcast(
            0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
        );
        RepTokensInstance instance = new RepTokensInstance(
            _admins[0],
            _admins,
            baseURI
        );

        vm.stopBroadcast();
        return instance;
    }
}
