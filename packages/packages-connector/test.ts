import * as fs from "fs";
import prettier from "prettier";

async function main() {

    const { abi } = JSON.parse(
        fs.readFileSync("../smart-contracts/out/RepTokensInstance.sol/RepTokensInstance.json").toString(),
    );

    const broadcastString = fs.readFileSync("../smart-contracts/broadcast/DeployRepTokensInstanceWithData.s.sol/31337/run-latest.json", { encoding: 'utf8' });
    const broadcast = JSON.parse(broadcastString);

    const contracts = {} as any;

    for (let i = 0; i < broadcast.transactions.length; i++) {
        if (broadcast.transactions[i].transactionType == "CREATE") {

            contracts[broadcast.transactions[i].contractName] = {};
            contracts[broadcast.transactions[i].contractName].address = broadcast.transactions[i].contractAddress;
            contracts[broadcast.transactions[i].contractName].abi = abi;
        }
    }

    const output = {} as Record<string, any>;

    output["31337"] = [
        {
            chainId: "31337",
            name: "localhost",
            contracts

        }
    ];

    console.log(output);


    const fileContent = Object.entries(output).reduce((content, [chainId, chainConfig]) => {
        return `${content}${parseInt(chainId).toFixed(0)}:${JSON.stringify(chainConfig, null, 2)},`;
    }, "");

    console.log(fileContent);


    const TARGET_DIR = "../nextjs/generated/";
    const TARGET_FILE_NAME = "deployedContracts.ts";

    if (!fs.existsSync(TARGET_DIR)) {
        fs.mkdirSync(TARGET_DIR);
    }

    fs.writeFileSync(
        `${TARGET_DIR + TARGET_FILE_NAME}`,
        prettier.format(`const contracts = {${fileContent}} as const; \n\n export default contracts`, {
            parser: "typescript",
        }),
    );
}

main();

