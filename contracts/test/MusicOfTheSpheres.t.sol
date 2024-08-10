// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Test, console} from "forge-std/Test.sol";
import {MusicOfTheSpheres} from "../src/MusicOfTheSpheres.sol";

contract MusicOfTheSpheresTest is Test {
    MusicOfTheSpheres public nft;
    address alice = makeAddr("Alice");

    function setUp() public {
        nft = new MusicOfTheSpheres();
    }

    function testMint() public {
        nft.mintTicket(alice,MusicOfTheSpheres.TicketTier.VIP_LOUNGE);
    }
}
