const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  
  const gameContract = await gameContractFactory.deploy(                        
    ["Leo", "Aang", "Pikachu"],       
    ["https://ipfs.infura.io/ipfs/QmTbPVfXQg5mvcHugyhGkPjLc6x6mz8KCdiZ4rpL7Epop7", 
    "https://ipfs.infura.io/ipfs/QmVHUeX2hDBHVSDRGyxvz7hnheh9SPHiZuFea3hpC3JX72", 
    "https://ipfs.infura.io/ipfs/QmPf6By6xNs42n3G4fHM9CmrUThxDuNJUMvCKD7kYw4KYA"],  
    [100, 200, 300],                    
    [100, 50, 25],
    "Elon Musk",
    "https://ipfs.infura.io/ipfs/QmadPQRMNt6w6qVzbpVn375BRTTfbPWWF9rZttLrqfYehG",
    10000,
    50
  );

  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();