import { useCallback, useEffect, useState } from "react";
import { useFetch } from "usehooks-ts";
// import { useFetch } from "usehooks-ts";
import { useScaffoldContract, useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const replacement = {
  ipfs: "https://ipfs.io/ipfs/",
  nftstorage: "https://nftstorage.link/ipfs/",
};

export type Token = {
  balance: bigint;
  image: string;
  name: string;
  description: string;
  id: number;
  tokenType: any;
  address: string;
};

// export interface Nft {
//   name: string;
//   description: string;
//   image: string;
// }

export const useUri = (tokenId?: number) => {
  return useScaffoldContractRead({
    contractName: "ReputationTokens",
    functionName: "uri",
    args: [BigInt(Number(tokenId))],
  });
};

export const useBalanceOf = (address?: string, tokenId?: number) => {
  return useScaffoldContractRead({
    contractName: "ReputationTokens",
    functionName: "balanceOf",
    args: [address, BigInt(Number(tokenId))],
  });
};

export function useUris(contract: any, tokenIds: bigint[]) {
  const [uris, setUris] = useState<string[]>([]);

  const refetch = useCallback(async () => {
    if (!contract) return;

    const arr = [];
    for (let i = 0; i < tokenIds.length; i++) {
      const result = await contract.read.uri([tokenIds[i]]);
      arr.push(result);
    }

    setUris([...arr]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract?.address, tokenIds.length, uris.length]);

  useEffect(() => {
    async function get() {
      await refetch();
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract?.address, tokenIds.length, uris.length, refetch]);

  return { uris, setUris, refetch };
}

export function useGetTokenProperties(repTokensInstance: any, tokenId: bigint) {
  const [tokenProperties, setTokenProperties] = useState<string[]>([]);

  useEffect(() => {
    async function get() {
      if (!repTokensInstance) return;

      const result = await repTokensInstance.read.getTokenType([tokenId]);
      setTokenProperties(result);
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repTokensInstance?.address, tokenId]);

  return { tokenProperties, setTokenProperties };
}

export function useGetTokensProperties(repTokensInstance: any, tokenIds: bigint[]) {
  const [tokensProperties, setTokensProperties] = useState<string[]>([]);

  useEffect(() => {
    async function get() {
      if (!repTokensInstance || tokenIds.length === 0) return;

      const arr = [];
      for (let i = 0; i < tokenIds.length; i++) {
        const result = await repTokensInstance.read.getTokenType([tokenIds[i]]);

        if (result !== undefined) arr.push(result);
      }

      setTokensProperties([...arr]);
    }

    if (tokensProperties.length === 0) {
      get();
    }
  }, [repTokensInstance, tokenIds, tokensProperties.length]);

  return { tokensProperties, setTokensProperties };
}

function useFetches(uris: string[]) {
  const [responses, setResponses] = useState<any[]>([]);

  const refetch = useCallback(async () => {
    const arr = [];
    for (let i = 0; i < uris.length; i++) {
      const response = await fetch(uris[i]);
      const responseJson = await response.json();
      arr.push(responseJson);
    }

    setResponses([...arr]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uris.length]);

  useEffect(() => {
    async function get() {
      await refetch();
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uris.length, refetch]);

  return { responses, refetch };
}

export const useGetRepToken = (address?: string, tokenId?: bigint, replacementType: ReplacementType = "ipfs") => {
  const { data: repTokensInstance } = useScaffoldContract({ contractName: "ReputationTokens" });

  const { data: balanceOf, refetch: refetchBalance } = useScaffoldContractRead({
    contractName: "ReputationTokens",
    functionName: "balanceOf",
    args: [address, tokenId],
  });

  const { tokenProperties } = useGetTokenProperties(repTokensInstance, tokenId || BigInt(0));

  const { data: uri } = useScaffoldContractRead({
    contractName: "ReputationTokens",
    functionName: "uri",
    args: [tokenId],
  });

  const formattedURI = uri?.replace("ipfs://", replacement[replacementType]);

  const { data: result } = useFetch<any>(formattedURI);

  const token = {
    id: Number(tokenId),
    balance: balanceOf,
    name: result?.name,
    description: result?.description,
    image: result?.image?.replace("ipfs://", replacement[replacementType]),
    tokenType: tokenProperties,
    address: repTokensInstance?.address,
  } as Token;

  return { token, refetchBalance };
};

type ReplacementType = "ipfs" | "nftstorage";

export const useRepTokens = (tokenIds: bigint[], address?: string, replacementType: ReplacementType = "ipfs") => {
  const { data: repTokensInstance } = useScaffoldContract({ contractName: "ReputationTokens" });

  // const { data: numOfTokens } = useScaffoldContractRead({
  //   contractName: "ReputationTokens",
  //   functionName: "getNumOfTokenTypes",
  // });

  const addresses: string[] = [];

  for (let i = 0; i < tokenIds.length; i++) {
    if (address) {
      addresses.push(address);
    }
  }

  console.log(addresses);

  // const { addresses } = useMemo(() => {
  //   const addresses: string[] = [];

  //   if (tokenIds.length > 0) {
  //     for (let i = 0; i < tokenIds.length; i++) {
  //       if (address) {
  //         addresses.push(address);
  //       }
  //     }
  //   }

  //   return { addresses };
  // }, [address, tokenIds.length]);

  // const { tokenIds } = useMemo(() => {
  //   const tokenIds: bigint[] = [];

  //   if (numOfTokens) {
  //     for (let i = 0; i < numOfTokens; i++) {
  //       tokenIds.push(BigInt(i));
  //     }
  //   }

  //   return { tokenIds };
  // }, [numOfTokens]);

  // console.log(addresses);
  // console.log(tokenIds);

  const { data: balanceOfBatch, refetch: refetchBalances } = useScaffoldContractRead({
    contractName: "ReputationTokens",
    functionName: "balanceOfBatch",
    args: [addresses, tokenIds],
  });

  const { tokensProperties } = useGetTokensProperties(repTokensInstance, tokenIds);

  const { uris } = useUris(repTokensInstance, tokenIds);

  for (let i = 0; i < uris.length; i++) {
    uris[i] = uris[i].replace("ipfs://", replacement[replacementType]);
  }

  const { responses } = useFetches(uris);

  const tokens: Token[] = [];
  for (let i = 0; i < responses.length; i++) {
    let balance = BigInt(0);
    if (balanceOfBatch) {
      balance = balanceOfBatch[i];
    }
    const token = {
      id: i,
      balance: balance,
      name: responses[i]?.name,
      description: responses[i]?.description,
      image: responses[i]?.image?.replace("ipfs://", replacement[replacementType]),
      tokenType: tokensProperties[i],
      address: repTokensInstance?.address,
    } as Token;
    tokens.push(token);
  }

  return { tokens: tokens, refetchBalances };
};

// export type TokenGroup = {
//   address: string;
//   tokens: Token[];
// };
