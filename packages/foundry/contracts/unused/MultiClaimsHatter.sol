// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// // import { console2 } from "forge-std/Test.sol"; // remove before deploy
// import {HatsModule} from "./Hats-Modules/HatsModule.sol";
// import {HatsModuleFactory} from "./Hats-Modules/HatsModuleFactory.sol";

// /*//////////////////////////////////////////////////////////////
//                             CUSTOM ERRORS
//   //////////////////////////////////////////////////////////////*/

// /// @notice Thrown if the given array parameters are not of equal length
// error MultiClaimsHatter_ArrayLengthMismatch();
// /// @notice Thrown if the calling account is not an admin of the hat
// error MultiClaimsHatter_NotAdminOfHat(address account, uint256 hatId);
// /// @notice Thrown if the account is not explicitly eligible for the hat
// error MultiClaimsHatter_NotExplicitlyEligible(address account, uint256 hatId);
// /// @notice Thrown if the hat is not claimable
// error MultiClaimsHatter_HatNotClaimable(uint256 hatId);
// /// @notice Thrown if the hat is not claimable on behalf of accounts
// error MultiClaimsHatter_HatNotClaimableFor(uint256 hatId);

// contract MultiClaimsHatter is HatsModule {
//     /*//////////////////////////////////////////////////////////////
//                               EVENTS
//   //////////////////////////////////////////////////////////////*/

//     /// @notice Emitted when the claimability of multiple hats was edited
//     event HatsClaimabilitySet(uint256[] hatIds, ClaimType[] claimTypes);
//     /// @notice Emitted when the calimability of a hat was edited
//     event HatClaimabilitySet(uint256 hatId, ClaimType claimType);

//     /*//////////////////////////////////////////////////////////////
//                             DATA MODELS
//   //////////////////////////////////////////////////////////////*/

//     /**
//      * @notice Hats claimability types.
//      * @param NotClaimable The hat is not claimable
//      * @param Claimable The hat is only claimable by the account that will be the hat's wearer
//      * @param ClaimableFor The hat is claimable on behalf of accounts (and also by the wearer)
//      */
//     enum ClaimType {
//         NotClaimable,
//         Claimable,
//         ClaimableFor
//     }

//     /*//////////////////////////////////////////////////////////////
//                             CONSTANTS
//   //////////////////////////////////////////////////////////////*/

//     /**
//      * This contract is a clone with immutable args, which means that it is deployed with a set of
//      * immutable storage variables (ie constants). Accessing these constants is cheaper than accessing
//      * regular storage variables (such as those set on initialization of a typical EIP-1167 clone),
//      * but requires a slightly different approach since they are read from calldata instead of storage.
//      *
//      * Below is a table of constants and their location.
//      *
//      * For more, see here: https://github.com/Saw-mon-and-Natalie/clones-with-immutable-args
//      *
//      * ----------------------------------------------------------------------+
//      * CLONE IMMUTABLE "STORAGE"                                             |
//      * ----------------------------------------------------------------------|
//      * Offset  | Constant          | Type    | Length  | Source              |
//      * ----------------------------------------------------------------------|
//      * 0       | IMPLEMENTATION    | address | 20      | HatsModule          |
//      * 20      | HATS              | address | 20      | HatsModule          |
//      * 40      | hatId             | uint256 | 32      | HatsModule          |
//      * ----------------------------------------------------------------------+
//      */

//     /*//////////////////////////////////////////////////////////////
//                             MUTABLE STATE
//   //////////////////////////////////////////////////////////////*/

//     /// @notice Maps between hats and their claimability type
//     mapping(uint256 hatId => ClaimType claimType) public hatToClaimType;

//     /*//////////////////////////////////////////////////////////////
//                             CONSTRUCTOR
//   //////////////////////////////////////////////////////////////*/

//     /// @notice Deploy the implementation contract and set its version
//     /// @dev This is only used to deploy the implementation contract, and should not be used to deploy clones
//     constructor(string memory _version) HatsModule(_version) {}

//     /*//////////////////////////////////////////////////////////////
//                             INITIALIZOR
//   //////////////////////////////////////////////////////////////*/

//     /// @inheritdoc HatsModule
//     function _setUp(bytes calldata _initData) internal override {
//         if (_initData.length == 0) return;

//         // decode init data
//         (uint256[] memory _hatIds, ClaimType[] memory _claimTypes) = abi.decode(
//             _initData,
//             (uint256[], ClaimType[])
//         );
//         _setHatsClaimabilityMemory(_hatIds, _claimTypes);
//     }

//     /*//////////////////////////////////////////////////////////////
//                         ADMIN FUNCTIONS
//   //////////////////////////////////////////////////////////////*/

//     /**
//      * @notice Change the claimability status of a hat. The caller should be an admin of the hat.
//      * @param _hatId The ID of the hat to set claimability for
//      * @param _claimType New claimability type for the hat
//      */
//     function setHatClaimability(uint256 _hatId, ClaimType _claimType) public {
//         if (!HATS().isAdminOfHat(msg.sender, _hatId))
//             revert MultiClaimsHatter_NotAdminOfHat(msg.sender, _hatId);

//         hatToClaimType[_hatId] = _claimType;

//         emit HatClaimabilitySet(_hatId, _claimType);
//     }

//     /**
//      * @notice Change the claimability status of multiple hats. The caller should be an admin of the hats.
//      * @param _hatIds The ID of the hat to set claimability for
//      * @param _claimTypes New claimability types for each hat
//      */
//     function setHatsClaimability(
//         uint256[] calldata _hatIds,
//         ClaimType[] calldata _claimTypes
//     ) public {
//         uint256 length = _hatIds.length;
//         if (_claimTypes.length != length) {
//             revert MultiClaimsHatter_ArrayLengthMismatch();
//         }

//         uint256 hatId;
//         for (uint256 i; i < length; ) {
//             hatId = _hatIds[i];
//             if (!HATS().isAdminOfHat(msg.sender, hatId))
//                 revert MultiClaimsHatter_NotAdminOfHat(msg.sender, hatId);
//             hatToClaimType[hatId] = _claimTypes[i];
//             unchecked {
//                 ++i;
//             }
//         }

//         emit HatsClaimabilitySet(_hatIds, _claimTypes);
//     }

//     /**
//      * @notice Wrapper around a HatsModuleFactory. Deploys a new HatsModule instance and sets a hat's claimability type.
//      * @param _factory The HatsModuleFactory instance that will deploy the module
//      * @param _implementation The address of the implementation contract of which to deploy a clone
//      * @param _moduleHatId The hat for which to deploy a HatsModule.
//      * @param _otherImmutableArgs Other immutable args to pass to the clone as immutable storage.
//      * @param _initData The encoded data to pass to the `setUp` function of the new HatsModule instance. Leave empty if no
//      * @param _hatId The ID of the hat to set claimability for
//      * @param _claimType New claimability type for the hat
//      * @return _instance The address of the deployed HatsModule instance
//      */
//     function setHatClaimabilityAndCreateModule(
//         HatsModuleFactory _factory,
//         address _implementation,
//         uint256 _moduleHatId,
//         bytes calldata _otherImmutableArgs,
//         bytes calldata _initData,
//         uint256 _hatId,
//         ClaimType _claimType
//     ) public returns (address _instance) {
//         if (!HATS().isAdminOfHat(msg.sender, _hatId))
//             revert MultiClaimsHatter_NotAdminOfHat(msg.sender, _hatId);

//         hatToClaimType[_hatId] = _claimType;

//         _instance = _factory.createHatsModule(
//             _implementation,
//             _moduleHatId,
//             _otherImmutableArgs,
//             _initData
//         );

//         emit HatClaimabilitySet(_hatId, _claimType);
//     }

//     /**
//      * @notice Wrapper around a HatsModuleFactory. Deploys new HatsModule instances and sets the claimability type of
//      * multiple hats.
//      * @param _factory The HatsModuleFactory instance that will deploy the modules
//      * @param _implementations The addresses of the implementation contracts of which to deploy a clone
//      * @param _moduleHatIds The hats for which to deploy a HatsModule.
//      * @param _otherImmutableArgsArray Other immutable args to pass to the clones as immutable storage.
//      * @param _initDataArray The encoded data to pass to the `setUp` functions of the new HatsModule instances. Leave
//      * @param _hatIds The IDs of the hats to set claimability for
//      * @param _claimTypes New claimability types for each hat
//      * @return success True if all modules were successfully created and the claimability types were set
//      */
//     function setHatsClaimabilityAndCreateModules(
//         HatsModuleFactory _factory,
//         address[] calldata _implementations,
//         uint256[] calldata _moduleHatIds,
//         bytes[] calldata _otherImmutableArgsArray,
//         bytes[] calldata _initDataArray,
//         uint256[] memory _hatIds,
//         ClaimType[] memory _claimTypes
//     ) public returns (bool success) {
//         uint256 length = _hatIds.length;
//         if (_claimTypes.length != length) {
//             revert MultiClaimsHatter_ArrayLengthMismatch();
//         }

//         uint256 hatId;
//         for (uint256 i; i < length; ) {
//             hatId = _hatIds[i];
//             if (!HATS().isAdminOfHat(msg.sender, hatId))
//                 revert MultiClaimsHatter_NotAdminOfHat(msg.sender, hatId);
//             hatToClaimType[hatId] = _claimTypes[i];
//             unchecked {
//                 ++i;
//             }
//         }

//         success = _factory.batchCreateHatsModule(
//             _implementations,
//             _moduleHatIds,
//             _otherImmutableArgsArray,
//             _initDataArray
//         );

//         emit HatsClaimabilitySet(_hatIds, _claimTypes);
//     }

//     /*//////////////////////////////////////////////////////////////
//                         CLAIMING FUNCTIONS
//   //////////////////////////////////////////////////////////////*/

//     /**
//      * @notice Claim a hat.
//      * @dev This contract must be wearing an admin hat of the hat to claim or else it will revert
//      * @param _hatId The ID of the hat to claim
//      */
//     function claimHat(uint256 _hatId) public {
//         if (hatToClaimType[_hatId] == ClaimType.NotClaimable) {
//             revert MultiClaimsHatter_HatNotClaimable(_hatId);
//         }

//         _mint(_hatId, msg.sender);
//     }

//     /**
//      * @notice Claim multiple hats.
//      * @dev This contract must be wearing an admin hat of the hats to claim or else it will revert
//      * @param _hatIds The IDs of the hats to claim
//      */
//     function claimHats(uint256[] calldata _hatIds) public {
//         uint256 hatId;
//         for (uint256 i; i < _hatIds.length; ) {
//             hatId = _hatIds[i];
//             if (hatToClaimType[hatId] == ClaimType.NotClaimable) {
//                 revert MultiClaimsHatter_HatNotClaimable(hatId);
//             }

//             _mint(hatId, msg.sender);

//             unchecked {
//                 ++i;
//             }
//         }
//     }

//     /**
//      * @notice Claim a hat on behalf of an account
//      * @dev This contract must be wearing an admin hat of the hat to claim or else it will revert
//      * @param _hatId The ID of the hat to claim for
//      * @param _account The account for which to claim
//      */
//     function claimHatFor(uint256 _hatId, address _account) public {
//         if (hatToClaimType[_hatId] != ClaimType.ClaimableFor) {
//             revert MultiClaimsHatter_HatNotClaimableFor(_hatId);
//         }

//         _mint(_hatId, _account);
//     }

//     /**
//      * @notice Claim multiple hats on behalf of accounts
//      * @dev This contract must be wearing an admin hat of the hats to claim or else it will revert
//      * @param _hatIds The IDs of the hats to claim for
//      * @param _accounts The accounts for which to claim
//      */
//     function claimHatsFor(
//         uint256[] calldata _hatIds,
//         address[] calldata _accounts
//     ) public {
//         if (_hatIds.length != _accounts.length) {
//             revert MultiClaimsHatter_ArrayLengthMismatch();
//         }

//         uint256 hatId;
//         for (uint256 i; i < _hatIds.length; ) {
//             hatId = _hatIds[i];
//             if (hatToClaimType[hatId] != ClaimType.ClaimableFor) {
//                 revert MultiClaimsHatter_HatNotClaimableFor(hatId);
//             }

//             _mint(hatId, _accounts[i]);

//             unchecked {
//                 ++i;
//             }
//         }
//     }

//     /*//////////////////////////////////////////////////////////////
//                           VIEW FUNCTIONS
//   //////////////////////////////////////////////////////////////*/

//     /**
//      * @notice Checks if a hat is claimable on behalf of an account
//      * @param _account The account to claim for
//      * @param _hatId The hat to claim
//      */
//     function canClaimForAccount(
//         address _account,
//         uint256 _hatId
//     ) public view returns (bool) {
//         return (isClaimableFor(_hatId) &&
//             _isExplicitlyEligible(_hatId, _account));
//     }

//     /**
//      * @notice Checks if an account can claim a hat.
//      * @param _account The claiming account
//      * @param _hatId The hat to claim
//      */
//     function accountCanClaim(
//         address _account,
//         uint256 _hatId
//     ) public view returns (bool) {
//         return (isClaimableBy(_hatId) &&
//             _isExplicitlyEligible(_hatId, _account));
//     }

//     /**
//      * @notice Checks if a hat is claimable
//      * @param _hatId The ID of the hat
//      */
//     function isClaimableBy(uint256 _hatId) public view returns (bool) {
//         return (hatExists(_hatId) &&
//             wearsAdmin(_hatId) &&
//             hatToClaimType[_hatId] > ClaimType.NotClaimable);
//     }

//     /**
//      * @notice Checks if a hat is claimable on behalf of accounts
//      * @param _hatId The ID of the hat
//      */
//     function isClaimableFor(uint256 _hatId) public view returns (bool) {
//         return (hatExists(_hatId) &&
//             wearsAdmin(_hatId) &&
//             hatToClaimType[_hatId] == ClaimType.ClaimableFor);
//     }

//     /**
//      * @notice Check if this contract is an admin of a hat.
//      *   @param _hatId The ID of the hat
//      */
//     function wearsAdmin(uint256 _hatId) public view returns (bool) {
//         return HATS().isAdminOfHat(address(this), _hatId);
//     }

//     /// @notice Checks if a hat exists
//     function hatExists(uint256 _hatId) public view returns (bool) {
//         return HATS().getHatMaxSupply(_hatId) > 0;
//     }

//     /*//////////////////////////////////////////////////////////////
//                         INTERNAL FUNCTIONS
//   //////////////////////////////////////////////////////////////*/

//     function _mint(uint256 _hatId, address _account) internal {
//         // revert if _wearer is not explicitly eligible
//         if (!_isExplicitlyEligible(_hatId, _account))
//             revert MultiClaimsHatter_NotExplicitlyEligible(_account, _hatId);
//         // mint the hat to _wearer if eligible. This contract can mint as long as its the hat's admin.
//         HATS().mintHat(_hatId, _account);
//     }

//     function _isExplicitlyEligible(
//         uint256 _hatId,
//         address _account
//     ) internal view returns (bool eligible) {
//         // get the hat's eligibility module address
//         address eligibility = HATS().getHatEligibilityModule(_hatId);
//         // get _wearer's eligibility status from the eligibility module
//         bool standing;
//         (bool success, bytes memory returndata) = eligibility.staticcall(
//             abi.encodeWithSignature(
//                 "getWearerStatus(address,uint256)",
//                 _account,
//                 _hatId
//             )
//         );

//         /*
//     * if function call succeeds with data of length == 64, then we know the contract exists
//     * and has the getWearerStatus function (which returns two words).
//     * But — since function selectors don't include return types — we still can't assume that the return data is two
//     booleans,
//     * so we treat it as a uint so it will always safely decode without throwing.
//     */
//         if (success && returndata.length == 64) {
//             // check the returndata manually
//             (uint256 firstWord, uint256 secondWord) = abi.decode(
//                 returndata,
//                 (uint256, uint256)
//             );
//             // returndata is valid
//             if (firstWord < 2 && secondWord < 2) {
//                 standing = (secondWord == 1) ? true : false;
//                 // never eligible if in bad standing
//                 eligible = (standing && firstWord == 1) ? true : false;
//             }
//             // returndata is invalid
//             else {
//                 // false since _wearer is not explicitly eligible
//                 eligible = false;
//             }
//         } else {
//             // false since _wearer is not explicitly eligible
//             eligible = false;
//         }
//     }

//     function _setHatsClaimabilityMemory(
//         uint256[] memory _hatIds,
//         ClaimType[] memory _claimTypes
//     ) internal {
//         uint256 length = _hatIds.length;
//         if (_claimTypes.length != length) {
//             revert MultiClaimsHatter_ArrayLengthMismatch();
//         }

//         uint256 hatId;
//         for (uint256 i; i < length; ) {
//             hatId = _hatIds[i];
//             hatToClaimType[hatId] = _claimTypes[i];
//             unchecked {
//                 ++i;
//             }
//         }

//         emit HatsClaimabilitySet(_hatIds, _claimTypes);
//     }
// }
