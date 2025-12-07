// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract StreamChain {
    address public owner;
    uint256 public platformFee = 10; // 10%
    
    struct Video {
        address creator;
        string ipfsCID;
        uint256 totalTips;
        uint256 createdAt;
    }
    
    mapping(string => Video) public videos;
    mapping(address => uint256) public creatorEarnings;
    
    event VideoUploaded(string indexed cid, address creator, uint256 timestamp);
    event Tipped(string indexed cid, address tipper, uint256 amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    function uploadVideo(string memory cid) external {
        require(videos[cid].creator == address(0), "Video already exists");
        
        videos[cid] = Video({
            creator: msg.sender,
            ipfsCID: cid,
            totalTips: 0,
            createdAt: block.timestamp
        });
        
        emit VideoUploaded(cid, msg.sender, block.timestamp);
    }
    
    function tipVideo(string memory cid) external payable {
        Video storage video = videos[cid];
        require(video.creator != address(0), "Video not found");
        require(msg.value > 0, "Tip must be > 0");
        
        uint256 platformCut = (msg.value * platformFee) / 100;
        uint256 creatorCut = msg.value - platformCut;
        
        video.totalTips += msg.value;
        creatorEarnings[video.creator] += creatorCut;
        
        payable(owner).transfer(platformCut);
        emit Tipped(cid, msg.sender, msg.value);
    }
    
    function withdrawEarnings() external {
        uint256 earnings = creatorEarnings[msg.sender];
        require(earnings > 0, "No earnings to withdraw");
        
        creatorEarnings[msg.sender] = 0;
        payable(msg.sender).transfer(earnings);
    }
    
    function getVideoTips(string memory cid) public view returns (uint256) {
        return videos[cid].totalTips;
    }
}
