// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {RepTokensInstance} from "../contracts/RepTokensInstance.sol";
import {Script, console} from "../lib/forge-std/src/Script.sol";
import {TokensPropertiesStorage} from "@atxdao/contracts/reputation/storage/TokensPropertiesStorage.sol";
import {IReputationTokensInternal} from "@atxdao/contracts/reputation/interfaces/IReputationTokensInternal.sol";

contract DeployRepTokensInstanceWithData is Script {
    address deployer = 0xc4f6578c24c599F195c0758aD3D4861758d703A3; // testnet/mainnet
    // address deployer = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266; // localhost

    uint256 maxMintAmount = 100;
    string baseURI =
        "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/";

    function run() public returns (RepTokensInstance) {
        address[] memory admins = new address[](1);
        admins[0] = deployer;

        //uncomment when deploying to localhost
        // vm.startBroadcast(
        //     0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
        // );
        uint256 deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        RepTokensInstance instance = new RepTokensInstance(
            deployer,
            admins,
            baseURI
        );

        instance.grantRole(instance.TOKEN_CREATOR_ROLE(), deployer);

        instance.grantRole(instance.TOKEN_UPDATER_ROLE(), deployer);

        instance.grantRole(instance.MINTER_ROLE(), deployer);

        instance.grantRole(instance.DISTRIBUTOR_ROLE(), deployer);

        TokensPropertiesStorage.TokenProperties
            memory tokenProperties = TokensPropertiesStorage.TokenProperties(
                true,
                100
            );

        instance.createToken(tokenProperties);
        instance.createToken(tokenProperties);

        IReputationTokensInternal.TokenOperation[]
            memory ops = new IReputationTokensInternal.TokenOperation[](2);
        IReputationTokensInternal.TokenOperation
            memory tokenOp1 = IReputationTokensInternal.TokenOperation(0, 90);
        IReputationTokensInternal.TokenOperation
            memory tokenOp2 = IReputationTokensInternal.TokenOperation(1, 90);

        ops[0] = tokenOp1;
        ops[1] = tokenOp2;

        instance.mint(deployer, ops, "");

        vm.stopBroadcast();
        return instance;
    }
}
