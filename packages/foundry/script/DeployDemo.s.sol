//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/console.sol";

import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
import {ReputationTokensStandalone} from "@atxdao/contracts/reputation/ReputationTokensStandalone.sol";
import {TokensPropertiesStorage} from "@atxdao/contracts/reputation/storage/TokensPropertiesStorage.sol";
import {IReputationTokensInternal} from "@atxdao/contracts/reputation/interfaces/IReputationTokensInternal.sol";
import {Hats} from "../contracts/Hats/Hats.sol";
// import {MultiClaimsHatter} from "../contracts/MultiClaimsHatter.sol";
import {SimpleClaimHatter} from "../contracts/SimpleClaimHatter.sol";
import {ERC1155EligibiltiyModule} from "../contracts/ERC1155EligibiltiyModule.sol";
import {ActiveModule} from "../contracts/ActiveModule.sol";

contract DeployDemoScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    address controller = 0x4161f8A8DfF60aEdB63baFb7d5843b0988393eC9; //replace with burner or other address from wallet!

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

        Hats hatsInstance = new Hats("v0.1", "Default IFPS");

        console.log(deployerPubKey);

        uint256 topHatId = hatsInstance.mintTopHat(
            deployerPubKey,
            "Top Hat",
            "TopHat IPFS"
        );
        console.log(topHatId);

        uint256 hatterHatId = hatsInstance.createHat(
            topHatId,
            "Hatter",
            5,
            deployerPubKey,
            deployerPubKey,
            true,
            "Hatter IPFS"
        );

        console.log(hatterHatId);

        SimpleClaimHatter hatter = new SimpleClaimHatter(
            "v0.1",
            address(hatsInstance)
        );

        hatsInstance.mintHat(hatterHatId, address(hatter));

        console.log(address(hatter));

        ActiveModule activeModule = new ActiveModule();
        ERC1155EligibiltiyModule eligibilityModule = new ERC1155EligibiltiyModule();

        uint256 claimableHatId = hatsInstance.createHat(
            hatterHatId,
            "Claimable Hat",
            100,
            address(eligibilityModule),
            address(activeModule),
            true,
            "Claimable IPFS"
        );

        console.log(claimableHatId);

        vm.stopBroadcast();
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
                3
            );

        tokensProperties[0] = TokensPropertiesStorage.TokenProperties(
            true,
            false,
            100
        );

        tokensProperties[1] = TokensPropertiesStorage.TokenProperties(
            true,
            true,
            100
        );

        tokensProperties[2] = TokensPropertiesStorage.TokenProperties(
            false,
            false,
            100
        );

        instance.batchCreateTokens(tokensProperties);
    }

    function batchSetTokenURIs(ReputationTokensStandalone instance) public {
        string
            memory BASE_URI = "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/";

        instance.setTokenURI(0, string.concat(BASE_URI, "0"));
        instance.setTokenURI(1, string.concat(BASE_URI, "1"));
        instance.setTokenURI(
            2,
            "ipfs://bafkreiheocygb3ty4uo3znjw2wz2asjzavn56owlqjoz4cvxvspg64egtq"
        );
    }

    function batchMint(ReputationTokensStandalone instance) public {
        IReputationTokensInternal.TokensOperations memory mintOperations;
        mintOperations.to = controller;

        mintOperations
            .operations = new IReputationTokensInternal.TokenOperation[](3);
        mintOperations.operations[0] = IReputationTokensInternal.TokenOperation(
            0,
            50
        );
        mintOperations.operations[1] = IReputationTokensInternal.TokenOperation(
            1,
            25
        );

        mintOperations.operations[2] = IReputationTokensInternal.TokenOperation(
            2,
            75
        );

        instance.mint(mintOperations);
    }
}
