const broadcast = {
  transactions: [
    {
      hash: "0x340d895da38a01ccf3328eeca27c44eca1b0772c0733df949aa47cb2cd7c5df7",
      transactionType: "CREATE",
      contractName: "RepTokensInstance",
      contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      function: null,
      arguments: ["[0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266]", "0", ""],
      transaction: {
        type: "0x02",
        from: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
        gas: "0x35d811",
        value: "0x0",
        data: "0x60806040523480156200001157600080fd5b50604051620033f7380380620033f7833981016040819",
        nonce: "0x0",
        accessList: [],
      },
      additionalContracts: [],
      isFixedGasLimit: false,
    },
  ],
  receipts: [
    {
      transactionHash:
        "0x340d895da38a01ccf3328eeca27c44eca1b0772c0733df949aa47cb2cd7c5df7",
      transactionIndex: "0x0",
      blockHash:
        "0x3ff04d2b9b636c91c27badadedf3eb59cc2f9686552c267554bea2dd4df89fe2",
      blockNumber: "0x4",
      from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      to: null,
      cumulativeGasUsed: "0x296e6d",
      gasUsed: "0x296e6d",
      contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      logs: [
        {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          topics: [
            "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            "0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266",
          ],
          data: "0x",
          blockHash:
            "0x3ff04d2b9b636c91c27badadedf3eb59cc2f9686552c267554bea2dd4df89fe2",
          blockNumber: "0x4",
          transactionHash:
            "0x340d895da38a01ccf3328eeca27c44eca1b0772c0733df949aa47cb2cd7c5df7",
          transactionIndex: "0x0",
          logIndex: "0x0",
          transactionLogIndex: "0x0",
          removed: false,
        },
        {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          topics: [
            "0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d",
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            "0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266",
            "0x000000000000000000000000f39fd6e51aad88f6f4ce6ab8827279cfffb92266",
          ],
          data: "0x",
          blockHash:
            "0x3ff04d2b9b636c91c27badadedf3eb59cc2f9686552c267554bea2dd4df89fe2",
          blockNumber: "0x4",
          transactionHash:
            "0x340d895da38a01ccf3328eeca27c44eca1b0772c0733df949aa47cb2cd7c5df7",
          transactionIndex: "0x0",
          logIndex: "0x1",
          transactionLogIndex: "0x1",
          removed: false,
        },
      ],
      status: "0x1",
      logsBloom:
        "0x00000004000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000040020000000000000100000800000000000000000000000000000000400000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000001000000000000000000040000000200000000000000000000000002000000100000000000020000000000000000000000000000000000000000000000000000000000000000000",
      type: "0x2",
      effectiveGasPrice: "0xdabe9053",
    },
  ],
  libraries: [],
  pending: [],
  returns: {
    0: {
      internal_type: "contract RepTokensInstance",
      value: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    },
  },
  timestamp: 1694443688,
  chain: 31337,
  multi: false,
  commit: "0f28d52",
};

const createTransactions = [];
for (let i = 0; i < broadcast.transactions.length; i++) {
  if (broadcast.transactions[i].transactionType == "CREATE") {
    createTransactions.push({
      contractName: broadcast.transactions[i].contractName,
      contractAddress: broadcast.transactions[i].contractAddress,
    });
  }
}
console.log(createTransactions);
