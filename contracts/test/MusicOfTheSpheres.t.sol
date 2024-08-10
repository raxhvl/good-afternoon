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

    function testAliceCanMintOneOfEach() public {
        nft.mintTicket(alice,MusicOfTheSpheres.TicketTier.VIP_LOUNGE);
        nft.mintTicket(alice,MusicOfTheSpheres.TicketTier.PLATINUM_PREMIER_SEATING);
        nft.mintTicket(alice,MusicOfTheSpheres.TicketTier.STANDARD_ACCESS);
    }

    function testAliceCANNOTMintMoreThanOneOfEach() public {
        nft.mintTicket(alice,MusicOfTheSpheres.TicketTier.VIP_LOUNGE);
        vm.expectRevert();
        nft.mintTicket(alice,MusicOfTheSpheres.TicketTier.VIP_LOUNGE);
    }

    function testTokenURI() public {
        nft.mintTicket(alice,MusicOfTheSpheres.TicketTier.VIP_LOUNGE);
        nft.tokenURI(0);
    }


}
