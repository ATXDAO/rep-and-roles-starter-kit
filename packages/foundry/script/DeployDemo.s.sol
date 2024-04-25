//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/console.sol";

import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
import {ReputationTokens} from "@atxdao/contracts/reputation/ReputationTokens.sol";
import {IReputationTokensTypes} from "@atxdao/contracts/reputation/IReputationTokensTypes.sol";
import {Hats} from "../contracts/Hats/Hats.sol";
// import {MultiClaimsHatter} from "../contracts/MultiClaimsHatter.sol";
import {MultiClaimsHatter} from "../contracts/MultiClaimsHatter.sol";
import {ERC1155EligibiltiyModule} from "../contracts/ERC1155EligibiltiyModule.sol";
import {ActiveModule} from "../contracts/ActiveModule.sol";
import {ReputationFaucet} from "../contracts/Reputation/ReputationFaucet.sol";

contract DeployDemoScript is ScaffoldETHDeploy {
    error InvalidPrivateKey(string);

    address controller = 0x2F15D4A66D22ecC6967928b6A76Ab06897b05676; //replace with burner or other address from wallet!

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

        ReputationTokens instance = new ReputationTokens(controller, admins);

        setupAccountWithAllRoles(instance, deployerPubKey);
        setupAccountWithAllRoles(instance, controller);

        ReputationFaucet faucet = new ReputationFaucet(address(instance));
        setupAccountWithAllRoles(instance, address(faucet));

        batchCreateTokens(instance);

        batchSetTokenURIs(instance);

        uint256[] memory tokenIds = new uint256[](3);
        tokenIds[0] = 0;
        tokenIds[1] = 1;
        tokenIds[2] = 2;

        uint256[] memory mintAmounts = new uint256[](3);
        mintAmounts[0] = 10000;
        mintAmounts[1] = 10000;
        mintAmounts[2] = 10000;

        instance.mintBatch(address(faucet), tokenIds, mintAmounts, "");
        // batchMint(instance, controller, 50, 25, 75);
        // batchMint(instance, address(faucet), 10000, 10000, 10000);

        uint256 id;
        assembly {
            id := chainid()
        }

        if (id == 31337) {
            Hats hatsInstance = new Hats("v0.1", "Default IFPS");

            console.log(deployerPubKey);

            uint256 topHatId = hatsInstance.mintTopHat(deployerPubKey, "Top Hat", "TopHat IPFS");
            console.log(topHatId);

            uint256 hatterHatId =
                hatsInstance.createHat(topHatId, "Hatter", 5, deployerPubKey, deployerPubKey, true, "Hatter IPFS");

            MultiClaimsHatter hatter = new MultiClaimsHatter("v0.1", address(hatsInstance));

            hatsInstance.mintHat(hatterHatId, address(hatter));

            ActiveModule activeModule = new ActiveModule();
            ERC1155EligibiltiyModule eligibilityModule = new ERC1155EligibiltiyModule(address(instance), 100);
            ERC1155EligibiltiyModule eligibilityModule2 = new ERC1155EligibiltiyModule(address(instance), 500);
            ERC1155EligibiltiyModule eligibilityModule3 = new ERC1155EligibiltiyModule(address(instance), 1500);

            uint256 claimableHatId1 = hatsInstance.createHat(
                hatterHatId,
                "Hat of Engineering",
                30,
                address(eligibilityModule),
                address(activeModule),
                true,
                "ipfs://bafkreicff2j67tg5g3klktkk4wavcctorj65y5upkolznwgbhmrakv4dba"
            );

            uint256 claimableHatId2 = hatsInstance.createHat(
                hatterHatId,
                "Hat of Steardship",
                30,
                address(eligibilityModule2),
                address(activeModule),
                true,
                "ipfs://bafkreibfian6fybuifdvchrjspqpedvrkakhwdnyhpwrroustpa7mjtto4"
            );

            uint256 claimableHatId3 = hatsInstance.createHat(
                hatterHatId,
                "Hat of Warden",
                30,
                address(eligibilityModule3),
                address(activeModule),
                true,
                "ipfs://bafkreigvzey77niarqslm6wjd3e77ihwc5rcdrrahp3o6og2dszzzw2fpi"
            );

            console.log(claimableHatId1);
            console.log(claimableHatId2);
            console.log(claimableHatId3);
        }

        vm.stopBroadcast();
    }

    ///////////////////////////////////
    // HELPER FUNCTIONS
    ///////////////////////////////////

    function setupAccountWithAllRoles(ReputationTokens instance, address addr) public {
        instance.grantRole(instance.TOKEN_UPDATER_ROLE(), addr);
        instance.grantRole(instance.TOKEN_URI_SETTER_ROLE(), addr);
        instance.grantRole(instance.MINTER_ROLE(), addr);
        instance.grantRole(instance.TOKEN_MIGRATOR_ROLE(), addr);
    }

    function batchCreateTokens(ReputationTokens instance) public {
        // ReputationTokens.TokenProperties[] memory tokensProperties = new ReputationTokens.TokenProperties[](3);

        // tokensProperties[0] = ReputationTokens.TokenProperties(ReputationTokens.TokenType.Soulbound, 10000);

        // tokensProperties[1] = ReputationTokens.TokenProperties(ReputationTokens.TokenType.Redeemable, 10000);

        // tokensProperties[2] = ReputationTokens.TokenProperties(ReputationTokens.TokenType.Transferable, 10000);

        uint256[] memory tokenIds = new uint256[](3);
        tokenIds[0] = 0;
        tokenIds[1] = 1;
        tokenIds[2] = 2;

        IReputationTokensTypes.TokenType[] memory tokenTypes = new IReputationTokensTypes.TokenType[](3);
        tokenTypes[0] = IReputationTokensTypes.TokenType.Soulbound;
        tokenTypes[1] = IReputationTokensTypes.TokenType.Redeemable;
        tokenTypes[2] = IReputationTokensTypes.TokenType.Transferable;

        instance.updateTokenBatch(tokenIds, tokenTypes);
        // instance.batchCreateTokens(tokensProperties);
    }

    function batchSetTokenURIs(ReputationTokens instance) public {
        string memory BASE_URI = "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/";

        instance.setTokenURI(0, string.concat(BASE_URI, "0"));
        instance.setTokenURI(1, string.concat(BASE_URI, "1"));
        instance.setTokenURI(2, "ipfs://bafkreiheocygb3ty4uo3znjw2wz2asjzavn56owlqjoz4cvxvspg64egtq");
    }

    // function batchMint(
    //     ReputationTokens instance,
    //     address recipient,
    //     uint256[]
    //     uint256 token0Amount,
    //     uint256 token1Amount,
    //     uint256 token2Amount
    // ) public {
    //     ReputationTokens.Sequence memory mintOperations;
    //     mintOperations.recipient = recipient;

    //     mintOperations.operations = new ReputationTokens.Operation[](3);
    //     mintOperations.operations[0] = ReputationTokens.Operation(0, token0Amount);
    //     mintOperations.operations[1] = ReputationTokens.Operation(1, token1Amount);
    //     mintOperations.operations[2] = ReputationTokens.Operation(2, token2Amount);

    //     instance.mint(mintOperations);
    // }
}
