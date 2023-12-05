import fs from "fs";
import chalk from "chalk";

const graphDir = "./";

function publishContract() {
  let networkName = "31337";

  const { abi } = JSON.parse(
    fs.readFileSync("../foundry/out/RepTokensInstance.sol/RepTokensInstance.json").toString(),
  );

  const broadcastString = fs.readFileSync(`../foundry/broadcast/Deploy.s.sol/${networkName}/run-latest.json`, { encoding: 'utf8' });
  const broadcast = JSON.parse(broadcastString);

  const contracts = {} as any;

  for (let i = 0; i < broadcast.transactions.length; i++) {
    if (broadcast.transactions[i].transactionType == "CREATE") {

      contracts[broadcast.transactions[i].contractName] = {};
      contracts[broadcast.transactions[i].contractName].address = broadcast.transactions[i].contractAddress;
      contracts[broadcast.transactions[i].contractName].abi = abi;
    }
  }

  for (var key in contracts) {
    console.log(key);

    try {
      const graphConfigPath = `${graphDir}/networks.json`;
      let graphConfig = "{}";
      try {
        if (fs.existsSync(graphConfigPath)) {
          graphConfig = fs.readFileSync(graphConfigPath).toString();
        }
      } catch (e) {
        console.log(e);
      }

      let graphConfigObject = JSON.parse(graphConfig);
      if (!(networkName in graphConfigObject)) {
        graphConfigObject[networkName] = {};
      }
      if (!(key in graphConfigObject[networkName])) {
        graphConfigObject[networkName][key] = {};
      }
      graphConfigObject[networkName][key].address = contracts[key].address;

      fs.writeFileSync(graphConfigPath, JSON.stringify(graphConfigObject, null, 2));
      if (!fs.existsSync(`${graphDir}/abis`)) fs.mkdirSync(`${graphDir}/abis`);
      fs.writeFileSync(
        `${graphDir}/abis/${networkName}_${key}.json`,
        JSON.stringify(contracts[key].abi, null, 2)
      );

      return true;
    } catch (e) {
      console.log(
        "Failed to publish " + chalk.red(key) + " to the subgraph."
      );
      console.log(e);
      return false;
    }

  }

  // try {
  //   let contract = fs
  //     .readFileSync(fullPath)
  //     .toString();
  //   let contractObject = JSON.parse(contract);
  //   const graphConfigPath = `${graphDir}/networks.json`;
  //   let graphConfig = "{}";
  //   try {
  //     if (fs.existsSync(graphConfigPath)) {
  //       graphConfig = fs.readFileSync(graphConfigPath).toString();
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   let graphConfigObject = JSON.parse(graphConfig);
  //   if (!(networkName in graphConfigObject)) {
  //     graphConfigObject[networkName] = {};
  //   }
  //   if (!(contractName in graphConfigObject[networkName])) {
  //     graphConfigObject[networkName][contractName] = {};
  //   }
  //   graphConfigObject[networkName][contractName].address = contractObject.address;

  //   fs.writeFileSync(graphConfigPath, JSON.stringify(graphConfigObject, null, 2));
  //   if (!fs.existsSync(`${graphDir}/abis`)) fs.mkdirSync(`${graphDir}/abis`);
  //   fs.writeFileSync(
  //     `${graphDir}/abis/${networkName}_${contractName}.json`,
  //     JSON.stringify(contractObject.abi, null, 2)
  //   );

  //   return true;
  // } catch (e) {
  //   console.log(
  //     "Failed to publish " + chalk.red(contractName) + " to the subgraph."
  //   );
  //   console.log(e);
  //   return false;
  // }
}

async function main() {

  publishContract();

  // const directories = fs.readdirSync(deploymentsDir);
  // directories.forEach(function (directory) {
  //   const files = fs.readdirSync(`${deploymentsDir}/${directory}`);
  //   files.forEach(function (file) {
  //     if (file.indexOf(".json") >= 0) {
  //       const contractName = file.replace(".json", "");
  //       publishContract(contractName, directory);
  //     }
  //   });
  // });
  console.log("✅  Published contracts to the subgraph package.");
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
