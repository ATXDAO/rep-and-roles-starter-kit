import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */
const externalContracts = {
  11155111: {
    MultiClaimsHatter: {
      address: "0x79c249148A8a1257Da253B9A42868eF0C62855DB",
      abi: [
        {
          inputs: [{ internalType: "string", name: "_version", type: "string" }],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        { inputs: [], name: "MultiClaimsHatter_ArrayLengthMismatch", type: "error" },
        {
          inputs: [{ internalType: "uint256", name: "hatId", type: "uint256" }],
          name: "MultiClaimsHatter_HatNotClaimable",
          type: "error",
        },
        {
          inputs: [{ internalType: "uint256", name: "hatId", type: "uint256" }],
          name: "MultiClaimsHatter_HatNotClaimableFor",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" },
            { internalType: "uint256", name: "hatId", type: "uint256" },
          ],
          name: "MultiClaimsHatter_NotAdminOfHat",
          type: "error",
        },
        {
          inputs: [
            { internalType: "address", name: "account", type: "address" },
            { internalType: "uint256", name: "hatId", type: "uint256" },
          ],
          name: "MultiClaimsHatter_NotExplicitlyEligible",
          type: "error",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: "uint256", name: "hatId", type: "uint256" },
            { indexed: false, internalType: "enum MultiClaimsHatter.ClaimType", name: "claimType", type: "uint8" },
          ],
          name: "HatClaimabilitySet",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            { indexed: false, internalType: "uint256[]", name: "hatIds", type: "uint256[]" },
            { indexed: false, internalType: "enum MultiClaimsHatter.ClaimType[]", name: "claimTypes", type: "uint8[]" },
          ],
          name: "HatsClaimabilitySet",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [{ indexed: false, internalType: "uint8", name: "version", type: "uint8" }],
          name: "Initialized",
          type: "event",
        },
        {
          inputs: [],
          name: "HATS",
          outputs: [{ internalType: "contract IHats", name: "", type: "address" }],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [],
          name: "IMPLEMENTATION",
          outputs: [{ internalType: "address", name: "", type: "address" }],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_account", type: "address" },
            { internalType: "uint256", name: "_hatId", type: "uint256" },
          ],
          name: "accountCanClaim",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "address", name: "_account", type: "address" },
            { internalType: "uint256", name: "_hatId", type: "uint256" },
          ],
          name: "canClaimForAccount",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "_hatId", type: "uint256" }],
          name: "claimHat",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_hatId", type: "uint256" },
            { internalType: "address", name: "_account", type: "address" },
          ],
          name: "claimHatFor",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256[]", name: "_hatIds", type: "uint256[]" }],
          name: "claimHats",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256[]", name: "_hatIds", type: "uint256[]" },
            { internalType: "address[]", name: "_accounts", type: "address[]" },
          ],
          name: "claimHatsFor",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "_hatId", type: "uint256" }],
          name: "hatExists",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "hatId",
          outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          stateMutability: "pure",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "hatId", type: "uint256" }],
          name: "hatToClaimType",
          outputs: [{ internalType: "enum MultiClaimsHatter.ClaimType", name: "claimType", type: "uint8" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "_hatId", type: "uint256" }],
          name: "isClaimableBy",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "_hatId", type: "uint256" }],
          name: "isClaimableFor",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256", name: "_hatId", type: "uint256" },
            { internalType: "enum MultiClaimsHatter.ClaimType", name: "_claimType", type: "uint8" },
          ],
          name: "setHatClaimability",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract HatsModuleFactory", name: "_factory", type: "address" },
            { internalType: "address", name: "_implementation", type: "address" },
            { internalType: "uint256", name: "_moduleHatId", type: "uint256" },
            { internalType: "bytes", name: "_otherImmutableArgs", type: "bytes" },
            { internalType: "bytes", name: "_initData", type: "bytes" },
            { internalType: "uint256", name: "_hatId", type: "uint256" },
            { internalType: "enum MultiClaimsHatter.ClaimType", name: "_claimType", type: "uint8" },
          ],
          name: "setHatClaimabilityAndCreateModule",
          outputs: [{ internalType: "address", name: "_instance", type: "address" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "uint256[]", name: "_hatIds", type: "uint256[]" },
            { internalType: "enum MultiClaimsHatter.ClaimType[]", name: "_claimTypes", type: "uint8[]" },
          ],
          name: "setHatsClaimability",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            { internalType: "contract HatsModuleFactory", name: "_factory", type: "address" },
            { internalType: "address[]", name: "_implementations", type: "address[]" },
            { internalType: "uint256[]", name: "_moduleHatIds", type: "uint256[]" },
            { internalType: "bytes[]", name: "_otherImmutableArgsArray", type: "bytes[]" },
            { internalType: "bytes[]", name: "_initDataArray", type: "bytes[]" },
            { internalType: "uint256[]", name: "_hatIds", type: "uint256[]" },
            { internalType: "enum MultiClaimsHatter.ClaimType[]", name: "_claimTypes", type: "uint8[]" },
          ],
          name: "setHatsClaimabilityAndCreateModules",
          outputs: [{ internalType: "bool", name: "success", type: "bool" }],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [{ internalType: "bytes", name: "_initData", type: "bytes" }],
          name: "setUp",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "version",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "version_",
          outputs: [{ internalType: "string", name: "", type: "string" }],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [{ internalType: "uint256", name: "_hatId", type: "uint256" }],
          name: "wearsAdmin",
          outputs: [{ internalType: "bool", name: "", type: "bool" }],
          stateMutability: "view",
          type: "function",
        },
      ],
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
