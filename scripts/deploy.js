const hre = require("hardhat");

async function main() {
    const OnlyCoin = await hre.ethers.getContractFactory("OnlyCoin");
    const onlyCoin = await OnlyCoin.deploy();
    await onlyCoin.deployed();
    console.log("OnlyCoin deployed to:", onlyCoin.address);

    const OnlyRouter = await hre.ethers.getContractFactory("OnlyRouter");
    const onlyRouter = await OnlyRouter.deploy(onlyCoin.address);
    await onlyRouter.deployed();
    console.log("OnlyRouter deployed to:", onlyRouter.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
