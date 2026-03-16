export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0xYourContractAddressHere";
export const contractABI = [
    "function getAvailableTickets() public view returns (uint256)",
    "function ticketPrice() public view returns (uint256)",
    "function owner() public view returns (address)",
    "function setTicketPrice(uint256 _price) public",
    "function withdrawFunds() public",
];
