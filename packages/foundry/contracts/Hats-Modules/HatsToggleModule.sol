// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// import { console2 } from "forge-std/Test.sol"; // remove before deploy
import {HatsModule} from "./HatsModule.sol";
import {IHatsToggle} from "../Hats/Interfaces/IHatsToggle.sol";

abstract contract HatsToggleModule is HatsModule, IHatsToggle {
    /**
     * @dev Contracts that inherit from HatsToggleModule must call the HatsModule constructor:
     * `HatsModule(_version)`.
     */

    /*//////////////////////////////////////////////////////////////
                      HATS TOGGLE FUNCTION
  //////////////////////////////////////////////////////////////*/

    /// @inheritdoc IHatsToggle
    function getHatStatus(
        uint256 _hatId
    ) public view virtual override returns (bool) {}
}
