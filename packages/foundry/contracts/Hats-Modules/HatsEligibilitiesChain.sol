// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

//import { console2 } from "forge-std/Test.sol"; // remove before deploy
import { HatsModule } from "./HatsModule.sol";
import { HatsEligibilityModule } from "./HatsEligibilityModule.sol";

/**
 * @notice Eligibility module that chains any amount of eligibility modules with "and" & "or" logical operations.
 * Modules are chained in a format of a disjunction of conjunction clauses. For example, (module1 && module2) || module3
 * has 2 conjunction clauses: (module1 && module2), module3. These clauses are chained together with an "or" operation.
 * Eligibility is derived according to these logical operations. However, if a wearere is in a bad standing according to
 * any one of the modules, then the module will return a result of not eligble and is in bad standing.
 */
contract HatsEligibilitiesChain is HatsEligibilityModule {
  /*//////////////////////////////////////////////////////////////
                          PUBLIC  CONSTANTS
  //////////////////////////////////////////////////////////////*/

  /**
   * This contract is a clone with immutable args, which means that it is deployed with a set of
   * immutable storage variables (ie constants). Accessing these constants is cheaper than accessing
   * regular storage variables (such as those set on initialization of a typical EIP-1167 clone),
   * but requires a slightly different approach since they are read from calldata instead of storage.
   *
   * Below is a table of constants and their locations. In this module, all are inherited from HatsModule.
   *
   * For more, see here: https://github.com/Saw-mon-and-Natalie/clones-with-immutable-args
   *
   * ------------------------------------------------------------------------------------------------------------------+
   * CLONE IMMUTABLE "STORAGE"                                                                                         |
   * ------------------------------------------------------------------------------------------------------------------|
   * Offset                          | Constant                  | Type      | Length                     | Source     |
   * -----------------------------------------------------------------------------------------------------|------------|
   * 0                               | IMPLEMENTATION            | address   | 20                         | HatsModule |
   * 20                              | HATS                      | address   | 20                         | HatsModule |
   * 40                              | hatId                     | uint256   | 32                         | HatsModule |
   * 72                              | NUM_CONJUNCTION_CLAUSES    | uint256   | 32                         | this       |
   * 104                             | CONJUNCTION_CLAUSE_LENGTHS | uint256[] | NUM_CONJUNCTION_CLAUSES* 32 | this       |
   * 104+(NUM_CONJUNCTION_CLAUSES*32) | MODULES                   | address[] | NUM_MODULES * 20           | this       |
   * ------------------------------------------------------------------------------------------------------------------+
   */

  /**
   * @notice Get the number of conjunction clauses
   */
  function NUM_CONJUNCTION_CLAUSES() public pure returns (uint256) {
    return _getArgUint256(72);
  }

  /**
   * @notice Get the a list of the lengths of every conjusction clause.
   */
  function CONJUNCTION_CLAUSE_LENGTHS() public pure returns (uint256[] memory) {
    return _getArgUint256Array(104, NUM_CONJUNCTION_CLAUSES());
  }

  /**
   * @notice Get all module addresses.
   */
  function MODULES() public pure returns (address[] memory) {
    uint256[] memory lengths = CONJUNCTION_CLAUSE_LENGTHS();
    uint256 numClauses = lengths.length;
    uint256 numModules;
    for (uint256 i = 0; i < numClauses;) {
      numModules += lengths[i];

      unchecked {
        ++i;
      }
    }

    address[] memory modules = new address[](numModules);
    uint256 modulesStart = 104 + numClauses * 32;
    for (uint256 i = 0; i < numModules;) {
      modules[i] = _getArgAddress(modulesStart + 20 * i);

      unchecked {
        ++i;
      }
    }
    return modules;
  }

  /*//////////////////////////////////////////////////////////////
                            CONSTRUCTOR
  //////////////////////////////////////////////////////////////*/

  /**
   * @notice Deploy the HatsEligibilitiesChain implementation contract and set its version
   * @dev This is only used to deploy the implementation contract, and should not be used to deploy clones
   */
  constructor(string memory _version) HatsModule(_version) { }

  /*//////////////////////////////////////////////////////////////
                      HATS ELIGIBILITY FUNCTION
  //////////////////////////////////////////////////////////////*/

  /**
   * @notice Get the wearer's status.
   */
  function getWearerStatus(address _wearer, uint256 _hatId)
    public
    view
    virtual
    override
    returns (bool eligible, bool standing)
  {
    uint256 numClauses = NUM_CONJUNCTION_CLAUSES();
    uint256 moduleOffset = 104 + 32 * numClauses; // offset to current clause
    uint256 nextClauseOffset = moduleOffset; // offset to current clause

    bool eligibleInClause;
    bool eligibleInModule;
    bool standingInModule;
    uint256 clauseIndex;
    uint256 length;
    address module;

    while (clauseIndex < numClauses) {
      length = _getArgUint256(104 + clauseIndex * 32); // current clause length

      eligibleInClause = true;
      nextClauseOffset += length * 20;
      // check eligibility and standing according to current clause
      while (moduleOffset < nextClauseOffset) {
        module = _getArgAddress(moduleOffset);
        (eligibleInModule, standingInModule) = HatsEligibilityModule(module).getWearerStatus(_wearer, _hatId);

        // bad standing in module -> wearer is not eligible and is in bad standing
        if (!standingInModule) {
          return (false, false);
        }

        /* 
        not eligible in module -> not eligible in clause. Continue checking the next modules in the 
        clause in order to check the standing status.
        */
        if (eligibleInClause && !eligibleInModule) {
          eligibleInClause = false;
        }

        moduleOffset += 20; // increment to the next clause
      }

      unchecked {
        ++clauseIndex;
      }

      // if eligible, continue to check only standing
      if (eligibleInClause) {
        eligible = true;
        break;
      }
    }

    // check only standing for remaining modules, in case the wearer is eligible in a previous clause
    while (clauseIndex < numClauses) {
      length = _getArgUint256(104 + clauseIndex * 32);
      nextClauseOffset += length * 20;

      while (moduleOffset < nextClauseOffset) {
        module = _getArgAddress(moduleOffset);
        (, standingInModule) = HatsEligibilityModule(module).getWearerStatus(_wearer, _hatId);

        if (!standingInModule) {
          return (false, false);
        }

        moduleOffset += 20;
      }

      unchecked {
        ++clauseIndex;
      }
    }

    standing = true;
  }
}
