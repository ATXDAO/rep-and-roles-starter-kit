//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {console} from "forge-std/console.sol";

import {ScaffoldETHDeploy} from "./DeployHelpers.s.sol";
import {ReputationTokens} from "@atxdao/contracts/reputation/ReputationTokens.sol";
import {Hats} from "../contracts/Hats/Hats.sol";
// import {MultiClaimsHatter} from "../contracts/MultiClaimsHatter.sol";
import {MultiClaimsHatter} from "../contracts/MultiClaimsHatter.sol";
import {ERC1155EligibiltiyModule} from "../contracts/ERC1155EligibiltiyModule.sol";
import {ActiveModule} from "../contracts/ActiveModule.sol";
import {ReputationFaucet} from "../contracts/Reputation/ReputationFaucet.sol";

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

        ReputationTokens instance = new ReputationTokens(controller, admins);

        setupAccountWithAllRoles(instance, deployerPubKey);
        setupAccountWithAllRoles(instance, controller);

        ReputationFaucet faucet = new ReputationFaucet(address(instance));
        setupAccountWithAllRoles(instance, address(faucet));

        batchCreateTokens(instance);

        batchSetTokenURIs(instance);

        batchMint(instance, controller, 50, 25, 75);
        batchMint(instance, address(faucet), 500, 500, 500);

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
            ERC1155EligibiltiyModule eligibilityModule = new ERC1155EligibiltiyModule(address(instance));

            uint256 claimableHatId = hatsInstance.createHat(
                hatterHatId,
                "Hat of Engineering",
                100,
                address(eligibilityModule),
                address(activeModule),
                true,
                "ipfs://bafkreicff2j67tg5g3klktkk4wavcctorj65y5upkolznwgbhmrakv4dba"
            );

            console.log(claimableHatId);
        }

        vm.stopBroadcast();
    }

    ///////////////////////////////////
    // HELPER FUNCTIONS
    ///////////////////////////////////

    function setupAccountWithAllRoles(ReputationTokens instance, address addr) public {
        instance.grantRole(instance.TOKEN_CREATOR_ROLE(), addr);
        instance.grantRole(instance.TOKEN_UPDATER_ROLE(), addr);
        instance.grantRole(instance.TOKEN_URI_SETTER_ROLE(), addr);
        instance.grantRole(instance.MINTER_ROLE(), addr);
        instance.grantRole(instance.DISTRIBUTOR_ROLE(), addr);
        instance.grantRole(instance.TOKEN_MIGRATOR_ROLE(), addr);
    }

    function batchCreateTokens(ReputationTokens instance) public {
        ReputationTokens.TokenProperties[] memory tokensProperties = new ReputationTokens.TokenProperties[](3);

        tokensProperties[0] = ReputationTokens.TokenProperties(ReputationTokens.TokenType.Soulbound, 1000);

        tokensProperties[1] = ReputationTokens.TokenProperties(ReputationTokens.TokenType.Redeemable, 1000);

        tokensProperties[2] = ReputationTokens.TokenProperties(ReputationTokens.TokenType.Transferable, 1000);

        instance.batchCreateTokens(tokensProperties);
    }

    function batchSetTokenURIs(ReputationTokens instance) public {
        string memory BASE_URI = "ipfs://bafybeiaz55w6kf7ar2g5vzikfbft2qoexknstfouu524l7q3mliutns2u4/";

        instance.setTokenURI(0, string.concat(BASE_URI, "0"));
        instance.setTokenURI(1, string.concat(BASE_URI, "1"));
        instance.setTokenURI(2, "ipfs://bafkreiheocygb3ty4uo3znjw2wz2asjzavn56owlqjoz4cvxvspg64egtq");
    }

    function batchMint(
        ReputationTokens instance,
        address recipient,
        uint256 token0Amount,
        uint256 token1Amount,
        uint256 token2Amount
    ) public {
        ReputationTokens.Sequence memory mintOperations;
        mintOperations.recipient = recipient;

        mintOperations.operations = new ReputationTokens.Operation[](3);
        mintOperations.operations[0] = ReputationTokens.Operation(0, token0Amount);
        mintOperations.operations[1] = ReputationTokens.Operation(1, token1Amount);
        mintOperations.operations[2] = ReputationTokens.Operation(2, token2Amount);

        instance.mint(mintOperations);
    }
}
