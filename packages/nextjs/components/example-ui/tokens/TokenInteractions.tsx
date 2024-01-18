import { useEffect, useState } from "react";
import { useFetch } from "usehooks-ts";
import { useScaffoldContract, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export type TokenGroup = {
  token0: Token;
  token1: Token;
};

export type Token = {
  balance: bigint;
  image: string;
  name: string;
  description: string;
};

export interface Nft {
  name: string;
  description: string;
  image: string;
}

export const useUri = (tokenId?: number) => {
  return useScaffoldContractRead({
    contractName: "ReputationTokensStandalone",
    functionName: "uri",
    args: [BigInt(Number(tokenId))],
  });
};

export const useBalanceOf = (address?: string, tokenId?: number) => {
  return useScaffoldContractRead({
    contractName: "ReputationTokensStandalone",
    functionName: "balanceOf",
    args: [address, BigInt(Number(tokenId))],
  });
};

export const useERC1155Information = (address?: string) => {
  const { data: uri0 } = useUri(0);
  const { data: uri1 } = useUri(1);

  const { data: balanceOf0 } = useBalanceOf(address, 0);
  const { data: balanceOf1 } = useBalanceOf(address, 1);

  const { data: repTokensInstance } = useScaffoldContract({ contractName: "ReputationTokensStandalone" });

  const { data: numOfTokens } = useScaffoldContractRead({
    contractName: "ReputationTokensStandalone",
    functionName: "getNumOfTokenTypes",
  });

  const addressArr = [];
  const tokenIdsArr: bigint[] = [];

  for (let i = 0; i < numOfTokens!; i++) {
    addressArr.push(address!);
    tokenIdsArr.push(BigInt(i));
  }

  const { data: balanceOfBatch } = useScaffoldContractRead({
    contractName: "ReputationTokensStandalone",
    functionName: "balanceOfBatch",
    args: [addressArr, tokenIdsArr],
  });
  console.log(balanceOfBatch);

  const [uris, setUris] = useState<string[]>([]);

  useEffect(() => {
    async function getUris() {
      if (!address) return;
      if (!repTokensInstance) return;

      const arr = [];
      for (let i = 0; i < tokenIdsArr.length; i++) {
        const result = await repTokensInstance.read.uri([tokenIdsArr[i]]);
        if (result != undefined) arr.push(result);
      }

      console.log(arr);
      setUris([...arr]);
    }

    getUris();
  }, [address, repTokensInstance]);

  console.log(uris);

  // useEffect(()=> {
  //   async function getJson() {
  //     const response = await fetch("http://example.com/movies.json");
  //     const movies = await response.json();
  //   }

  //   getJson();

  // }, [])

  const { data: json0 /* error: error0 */ } = useFetch<Nft>(uri0?.replace("ipfs://", "https://ipfs.io/ipfs/"));
  const { data: json1 /* error: error1 */ } = useFetch<Nft>(uri1?.replace("ipfs://", "https://ipfs.io/ipfs/"));

  return {
    token0: {
      balance: balanceOf0,
      name: json0?.name,
      description: json0?.description,
      image: json0?.image,
    },
    token1: {
      balance: balanceOf1,
      name: json1?.name,
      description: json1?.description,
      image: json1?.image,
    },
  } as TokenGroup;
};
