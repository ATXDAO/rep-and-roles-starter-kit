//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/console.sol";

import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
import {ReputationTokensStandalone} from "@atxdao/contracts/reputation/ReputationTokensStandalone.sol";
import {TokensPropertiesStorage} from "@atxdao/contracts/reputation/storage/TokensPropertiesStorage.sol";
import {IReputationTokensInternal} from "@atxdao/contracts/reputation/interfaces/IReputationTokensInternal.sol";
import {Hats} from "../contracts/Hats/Hats.sol";

contract DeployDemoScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    address controller = 0x62286D694F89a1B12c0214bfcD567bb6c2951491; //replace with burner or other address from wallet!

    function run() external {
        uint256 deployerPrivateKey = setupLocalhostEnv();
        if (deployerPrivateKey == 0) {
            revert InvalidPrivateKey(
                "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
            );
        }
        address deployerPubKey = vm.createWallet(deployerPrivateKey).addr;

        vm.startBroadcast(deployerPrivateKey);
        address[] memory admins = new address[](2);
        admins[0] = deployerPubKey;
        admins[1] = controller;

        ReputationTokensStandalone instance = new ReputationTokensStandalone(
            controller,
            admins
        );

        setupAccountWithAllRoles(instance, deployerPubKey);
        setupAccountWithAllRoles(instance, controller);

        batchCreateTokens(instance);

        batchSetTokenURIs(instance);

        batchMint(instance);

        vm.stopBroadcast();

        exportDeployments();
    }

    ///////////////////////////////////
    // HELPER FUNCTIONS
    ///////////////////////////////////

    function setupAccountWithAllRoles(
        ReputationTokensStandalone instance,
        address addr
    ) public {
        instance.grantRole(instance.TOKEN_CREATOR_ROLE(), addr);
        instance.grantRole(instance.TOKEN_UPDATER_ROLE(), addr);
        instance.grantRole(instance.TOKEN_URI_SETTER_ROLE(), addr);
        instance.grantRole(instance.MINTER_ROLE(), addr);
        instance.grantRole(instance.DISTRIBUTOR_ROLE(), addr);
        instance.grantRole(instance.TOKEN_MIGRATOR_ROLE(), addr);
    }

    function batchCreateTokens(ReputationTokensStandalone instance) public {
        TokensPropertiesStorage.TokenProperties[]
            memory tokensProperties = new TokensPropertiesStorage.TokenProperties[](
                2
            );

        tokensProperties[0] = TokensPropertiesStorage.TokenProperties(
            false,
            100
        );

        tokensProperties[1] = TokensPropertiesStorage.TokenProperties(
            true,
            100
        );

        instance.batchCreateTokens(tokensProperties);
    }

    function batchSetTokenURIs(ReputationTokensStandalone instance) public {
        string
            memory BASE_URI = "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/";

        instance.setTokenURI(0, string.concat(BASE_URI, "0"));
        instance.setTokenURI(1, string.concat(BASE_URI, "1"));
    }

    function batchMint(ReputationTokensStandalone instance) public {
        IReputationTokensInternal.TokensOperations memory mintOperations;
        mintOperations.to = controller;

        mintOperations
            .operations = new IReputationTokensInternal.TokenOperation[](2);
        mintOperations.operations[0] = IReputationTokensInternal.TokenOperation(
            0,
            50
        );
        mintOperations.operations[1] = IReputationTokensInternal.TokenOperation(
            1,
            50
        );
        instance.mint(mintOperations);
    }
}
