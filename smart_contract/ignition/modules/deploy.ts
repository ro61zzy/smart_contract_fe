const { ethers } = require("hardhat");

async function main() {
  const MyToken = await ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy();
  await token.waitForDeployment();

  const address = await token.getAddress();
  console.log("🚀 My Token deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//address : 0x9aEfeE1e24fa945FcD0f09bc305a7DcBDC73a854