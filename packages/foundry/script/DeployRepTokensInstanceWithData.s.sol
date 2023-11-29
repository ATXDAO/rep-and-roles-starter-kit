// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {RepTokensInstance} from "../contracts/RepTokensInstance.sol";
import {Script, console} from "../lib/forge-std/src/Script.sol";
import {TokenTypesStorage} from "@atxdao/contracts/reputation/storage/TokenTypesStorage.sol";
import {IReputationTokensInternal} from "@atxdao/contracts/reputation/interfaces/IReputationTokensInternal.sol";

contract DeployRepTokensInstanceWithData is Script {
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

        instance.grantRole(
            instance.TOKEN_TYPE_CREATOR_ROLE(),
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        );

        instance.grantRole(
            instance.MINTER_ROLE(),
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        );

        instance.grantRole(
            instance.DISTRIBUTOR_ROLE(),
            0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
        );

        TokenTypesStorage.TokenType memory tokenType = TokenTypesStorage
            .TokenType(true, 100);

        instance.createTokenType(tokenType);
        instance.createTokenType(tokenType);

        IReputationTokensInternal.TokenOperation[]
            memory ops = new IReputationTokensInternal.TokenOperation[](2);
        IReputationTokensInternal.TokenOperation
            memory tokenOp1 = IReputationTokensInternal.TokenOperation(0, 90);
        IReputationTokensInternal.TokenOperation
            memory tokenOp2 = IReputationTokensInternal.TokenOperation(1, 90);

        ops[0] = tokenOp1;
        ops[1] = tokenOp2;

        instance.mint(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, ops, "");

        vm.stopBroadcast();
        return instance;
    }
}
