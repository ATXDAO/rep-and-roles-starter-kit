// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// import { console2 } from "forge-std/Test.sol"; // remove before deploy
import {HatsModule} from "./Hats-Modules/HatsModule.sol";
import {HatsModuleFactory} from "./Hats-Modules/HatsModuleFactory.sol";
import {ERC1155EligibiltiyModule} from "../contracts/ERC1155EligibiltiyModule.sol";

/*//////////////////////////////////////////////////////////////
                            CUSTOM ERRORS
  //////////////////////////////////////////////////////////////*/

/// @notice Thrown if the given array parameters are not of equal length
error MultiClaimsHatter_ArrayLengthMismatch();
/// @notice Thrown if the calling account is not an admin of the hat
error MultiClaimsHatter_NotAdminOfHat(address account, uint256 hatId);
/// @notice Thrown if the account is not explicitly eligible for the hat
error MultiClaimsHatter_NotExplicitlyEligible(address account, uint256 hatId);
/// @notice Thrown if the hat is not claimable
error MultiClaimsHatter_HatNotClaimable(uint256 hatId);
/// @notice Thrown if the hat is not claimable on behalf of accounts
error MultiClaimsHatter_HatNotClaimableFor(uint256 hatId);

contract SimpleClaimHatter is HatsModule {
    /*//////////////////////////////////////////////////////////////
                              EVENTS
  //////////////////////////////////////////////////////////////*/

    /// @notice Emitted when the claimability of multiple hats was edited
    event HatsClaimabilitySet(uint256[] hatIds, ClaimType[] claimTypes);
    /// @notice Emitted when the calimability of a hat was edited
    event HatClaimabilitySet(uint256 hatId, ClaimType claimType);

    /*//////////////////////////////////////////////////////////////
                            DATA MODELS
  //////////////////////////////////////////////////////////////*/

    /**
     * @notice Hats claimability types.
     * @param NotClaimable The hat is not claimable
     * @param Claimable The hat is only claimable by the account that will be the hat's wearer
     * @param ClaimableFor The hat is claimable on behalf of accounts (and also by the wearer)
     */
    enum ClaimType {
        NotClaimable,
        Claimable,
        ClaimableFor
    }

    /*//////////////////////////////////////////////////////////////
                            CONSTANTS 
  //////////////////////////////////////////////////////////////*/

    /**
     * This contract is a clone with immutable args, which means that it is deployed with a set of
     * immutable storage variables (ie constants). Accessing these constants is cheaper than accessing
     * regular storage variables (such as those set on initialization of a typical EIP-1167 clone),
     * but requires a slightly different approach since they are read from calldata instead of storage.
     *
     * Below is a table of constants and their location.
     *
     * For more, see here: https://github.com/Saw-mon-and-Natalie/clones-with-immutable-args
     *
     * ----------------------------------------------------------------------+
     * CLONE IMMUTABLE "STORAGE"                                             |
     * ----------------------------------------------------------------------|
     * Offset  | Constant          | Type    | Length  | Source              |
     * ----------------------------------------------------------------------|
     * 0       | IMPLEMENTATION    | address | 20      | HatsModule          |
     * 20      | HATS              | address | 20      | HatsModule          |
     * 40      | hatId             | uint256 | 32      | HatsModule          |
     * ----------------------------------------------------------------------+
     */

    /*//////////////////////////////////////////////////////////////
                            MUTABLE STATE
  //////////////////////////////////////////////////////////////*/

    /// @notice Maps between hats and their claimability type
    mapping(uint256 hatId => ClaimType claimType) public hatToClaimType;

    /*//////////////////////////////////////////////////////////////
                            CONSTRUCTOR
  //////////////////////////////////////////////////////////////*/

    /// @notice Deploy the implementation contract and set its version
    /// @dev This is only used to deploy the implementation contract, and should not be used to deploy clones
    constructor(
        string memory _version,
        address hats
    ) HatsModule(_version, hats) {}

    /*//////////////////////////////////////////////////////////////
                        CLAIMING FUNCTIONS
  //////////////////////////////////////////////////////////////*/

    /**
     * @notice Claim a hat.
     * @dev This contract must be wearing an admin hat of the hat to claim or else it will revert
     * @param _hatId The ID of the hat to claim
     */
    function claimHat(uint256 _hatId) public {
        // if (hatToClaimType[_hatId] == ClaimType.NotClaimable) {
        //     revert MultiClaimsHatter_HatNotClaimable(_hatId);
        // }

        _mint(_hatId, msg.sender);
    }

    /*//////////////////////////////////////////////////////////////
                          VIEW FUNCTIONS
  //////////////////////////////////////////////////////////////*/

    /**
     * @notice Checks if a hat is claimable on behalf of an account
     * @param _account The account to claim for
     * @param _hatId The hat to claim
     */
    function canClaimForAccount(
        address _account,
        uint256 _hatId
    ) public view returns (bool) {
        return (isClaimableFor(_hatId) &&
            _isExplicitlyEligible(_hatId, _account));
    }

    /**
     * @notice Checks if an account can claim a hat.
     * @param _account The claiming account
     * @param _hatId The hat to claim
     */
    function accountCanClaim(
        address _account,
        uint256 _hatId
    ) public view returns (bool) {
        return (isClaimableBy(_hatId) &&
            _isExplicitlyEligible(_hatId, _account));
    }

    /**
     * @notice Checks if a hat is claimable
     * @param _hatId The ID of the hat
     */
    function isClaimableBy(uint256 _hatId) public view returns (bool) {
        return (hatExists(_hatId) &&
            wearsAdmin(_hatId) &&
            hatToClaimType[_hatId] > ClaimType.NotClaimable);
    }

    /**
     * @notice Checks if a hat is claimable on behalf of accounts
     * @param _hatId The ID of the hat
     */
    function isClaimableFor(uint256 _hatId) public view returns (bool) {
        return (hatExists(_hatId) &&
            wearsAdmin(_hatId) &&
            hatToClaimType[_hatId] == ClaimType.ClaimableFor);
    }

    /**
     * @notice Check if this contract is an admin of a hat.
     *   @param _hatId The ID of the hat
     */
    function wearsAdmin(uint256 _hatId) public view returns (bool) {
        return s_hats.isAdminOfHat(address(this), _hatId);
    }

    /// @notice Checks if a hat exists
    function hatExists(uint256 _hatId) public view returns (bool) {
        return s_hats.getHatMaxSupply(_hatId) > 0;
    }

    /*//////////////////////////////////////////////////////////////
                        INTERNAL FUNCTIONS
  //////////////////////////////////////////////////////////////*/

    function _mint(uint256 _hatId, address _account) internal {
        // revert if _wearer is not explicitly eligible
        if (!_isExplicitlyEligible(_hatId, _account))
            revert MultiClaimsHatter_NotExplicitlyEligible(_account, _hatId);
        // mint the hat to _wearer if eligible. This contract can mint as long as its the hat's admin.
        s_hats.mintHat(_hatId, _account);
    }

    function _isExplicitlyEligible(
        uint256 _hatId,
        address _account
    ) internal view returns (bool eligible) {
        // ERC1155EligibiltiyModule eligibility = ERC1155EligibiltiyModule(
        //     s_hats.getHatEligibilityModule(_hatId)
        // );
        // eligible = eligibility.getWearerStatus(_account, _hatId);

        // get the hat's eligibility module address
        address eligibility = s_hats.getHatEligibilityModule(_hatId);
        // get _wearer's eligibility status from the eligibility module
        bool standing;
        (bool success, bytes memory returndata) = eligibility.staticcall(
            abi.encodeWithSignature(
                "getWearerStatus(address,uint256)",
                _account,
                _hatId
            )
        );

        /*
        * if function call succeeds with data of length == 64, then we know the contract exists
        * and has the getWearerStatus function (which returns two words).
        * But — since function selectors don't include return types — we still can't assume that the return data is two
        booleans,
        * so we treat it as a uint so it will always safely decode without throwing.
        */
        if (success && returndata.length == 64) {
            // check the returndata manually
            (uint256 firstWord, uint256 secondWord) = abi.decode(
                returndata,
                (uint256, uint256)
            );
            // returndata is valid
            if (firstWord < 2 && secondWord < 2) {
                standing = (secondWord == 1) ? true : false;
                // never eligible if in bad standing
                eligible = (standing && firstWord == 1) ? true : false;
            }
            // returndata is invalid
            else {
                // false since _wearer is not explicitly eligible
                eligible = false;
            }
        } else {
            // false since _wearer is not explicitly eligible
            eligible = false;
        }
    }

    function _setHatsClaimabilityMemory(
        uint256[] memory _hatIds,
        ClaimType[] memory _claimTypes
    ) internal {
        uint256 length = _hatIds.length;
        if (_claimTypes.length != length) {
            revert MultiClaimsHatter_ArrayLengthMismatch();
        }

        uint256 hatId;
        for (uint256 i; i < length; ) {
            hatId = _hatIds[i];
            hatToClaimType[hatId] = _claimTypes[i];
            unchecked {
                ++i;
            }
        }

        emit HatsClaimabilitySet(_hatIds, _claimTypes);
    }
}
