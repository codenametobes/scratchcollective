// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";


contract ScratchCollective is ERC1155, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter internal _tokenIdTracker;

    uint256 public constant ICHIBAN = 0;
    uint256 public artSupply = 0;
    mapping (uint256 => address) public original_creator;
    mapping (uint256 => string) public ipfs_meta;

    constructor() ERC1155("https://ipfs.io/ipfs/") { }

    // for now we'll only allow minting of NFT (x1 unique)
    function addNewArt(string memory _cid) public {
        original_creator[_tokenIdTracker.current()] = _msgSender();
        ipfs_meta[_tokenIdTracker.current()] = _cid;
        _mint(_msgSender(), _tokenIdTracker.current(), 1, "");
        artSupply = _tokenIdTracker.current() + 1;
        _tokenIdTracker.increment();
    }

    // URI function to return nft-specific IPFS uri
    function uri(uint256 _id) public view virtual override returns (string memory) {
        require(_exists(_id), "ScratchCollective: NONEXISTENT_ART");
        return strConcat(_uri, ipfs_meta[_id]);
    }

    // update baseURI (in case something changes, maybe different ipfs gateway)
    function updateBaseURI(string memory _newUri) onlyOwner external {
        _setURI(_newUri);
    }

    function strConcat(string storage _a, string memory _b) internal pure returns(string memory) {
        return string(abi.encodePacked(_a, _b));
    }

    // edit to allow transfer of only (1) as this is an NFT
    function safeTransferFrom(
    address from,
    address to,
    uint256 id,
    uint256 amount,
    bytes memory data
    ) public override {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );
        _safeTransferFrom(from, to, id, 1, data);
    }

    function _exists(
    uint256 _id
  ) internal view returns (bool) {
    return original_creator[_id] != address(0);
  }
}
