// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin/token/ERC721/ERC721.sol";
import "openzeppelin/access/Ownable.sol";
import "openzeppelin/utils/Counters.sol";

contract MusicOfTheSpheres is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _ticketIdCounter;

    // Ticket tier enumeration
    enum TicketTier { VIP_LOUNGE, PLATINUM_PREMIER_SEATING, STANDARD_ACCESS }

    // Struct to store ticket details
    struct Ticket {
        TicketTier tier;
        uint256 eventDate; // Unix timestamp for the event date
    }

    // Mapping from ticket ID to ticket details
    mapping(uint256 => Ticket) public tickets;

    // Mapping from tier to owner
    mapping(TicketTier => address) public tierOwners;

    // Event emitted when a new ticket is minted
    event TicketMinted(uint256 ticketId, TicketTier tier, uint256 eventDate);

    constructor() ERC721("MusicOfTheSpheres", "MTS") {}

    /**
     * @dev Mint a new ticket.
     * @param to Address to receive the ticket
     * @param tier Ticket tier
     */
    function mintTicket(address to, TicketTier tier) external onlyOwner {
        require(tierOwners[tier] == address(0), "Ticket of this tier already owned");
        
        uint256 ticketId = _ticketIdCounter.current();
        _ticketIdCounter.increment();
        _safeMint(to, ticketId);
        
        // Store ticket details
        tickets[ticketId] = Ticket({
            tier: tier,
            eventDate: 1723917600
        });

        // Set the owner of the ticket tier
        tierOwners[tier] = to;

        emit TicketMinted(ticketId, tier, 1723917600);
    }

    /**
     * @dev Get ticket details.
     * @param ticketId The ID of the ticket
     * @return tier The tier of the ticket
     * @return eventDate The event date as a Unix timestamp
     */
    function getTicketDetails(uint256 ticketId) external view returns (TicketTier tier, uint256 eventDate) {
        Ticket memory ticket = tickets[ticketId];
        return (ticket.tier, ticket.eventDate);
    }


    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`.
     */
    function _baseURI() internal pure override returns (string memory) {
        return "https://localhost:3000/";
    }

    /**
     * @dev Get the owner of a specific tier.
     * @param tier The ticket tier
     * @return The address of the owner
     */
    function getTierOwner(TicketTier tier) external view returns (address) {
        return tierOwners[tier];
    }
}