import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const useUri = (tokenId?: number) => {
  return useScaffoldContractRead({
    contractName: "RepTokensInstance",
    functionName: "uri",
    args: [BigInt(Number(tokenId))],
  });
};

export const useBalanceOf = (address?: string, tokenId?: number) => {
  return useScaffoldContractRead({
    contractName: "RepTokensInstance",
    functionName: "balanceOf",
    args: [address, BigInt(Number(tokenId))],
  });
};
