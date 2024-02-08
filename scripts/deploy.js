const hre = require("hardhat");

const tokens = (nToken) => {
  return ethers.utils.parseUnits(nToken.toString(), "ether");
};

async function main() {
  //TheDrChain
  const _initialSupply = tokens(5000000);

  const TheDrChain = await hre.ethers.getContractFactory(
    "TheDrChain"
  );
  const theDrChain = await TheDrChain.deploy(_initialSupply);

  await theDrChain.deployed();
  console.log(` TheDrChain: ${theDrChain.address}`);

  //TOTEN SALE

  const _tokenPrice = tokens(1);

  const TokenSale = await hre.ethers.getContractFactory("TokenSale");
  const tokenSale = await TokenSale.deploy(
    theDrChain.address,
    _tokenPrice
  );

  await tokenSale.deployed();
  console.log(` TokenSale: ${tokenSale.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
