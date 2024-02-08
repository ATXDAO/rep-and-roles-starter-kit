import { useEffect, useMemo, useState } from "react";
// import { useFetch } from "usehooks-ts";
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
  id: number;
  properties: any;
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

export function useUris(repTokensInstance: any, tokenIds: bigint[]) {
  const [uris, setUris] = useState<string[]>([]);

  useEffect(() => {
    async function get() {
      if (!repTokensInstance || tokenIds.length === 0) return;

      const arr = [];
      for (let i = 0; i < tokenIds.length; i++) {
        const result = await repTokensInstance.read.uri([tokenIds[i]]);
        if (result !== undefined) arr.push(result);
      }

      setUris([...arr]);
    }

    if (uris.length === 0) {
      get();
    }
  }, [repTokensInstance, tokenIds, uris.length]);

  return { uris, setUris };
}

export function useGetTokensProperties(repTokensInstance: any, tokenIds: bigint[]) {
  const [tokensProperties, setTokensProperties] = useState<string[]>([]);

  useEffect(() => {
    async function get() {
      if (!repTokensInstance || tokenIds.length === 0) return;

      const arr = [];
      for (let i = 0; i < tokenIds.length; i++) {
        const result = await repTokensInstance.read.getTokenProperties([tokenIds[i]]);
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

export function useFetches(uris: string[]) {
  const [responses, setResponses] = useState<Nft[]>([]);

  useEffect(() => {
    async function getJson() {
      if (uris.length === 0) return;

      const arr = [];
      for (let i = 0; i < uris.length; i++) {
        const response = await fetch(uris[i]);
        const responseJson = await response.json();
        arr.push(responseJson);
      }

      setResponses([...arr]);
    }

    if (responses.length === 0) getJson();
  }, [uris, uris.length, responses.length]);

  return { responses };
}

export const useRepTokens = (address?: string) => {
  const { data: repTokensInstance } = useScaffoldContract({ contractName: "ReputationTokensStandalone" });

  const { data: numOfTokens } = useScaffoldContractRead({
    contractName: "ReputationTokensStandalone",
    functionName: "getNumOfTokenTypes",
  });

  const { addresses } = useMemo(() => {
    const addresses: string[] = [];

    if (numOfTokens) {
      for (let i = 0; i < numOfTokens; i++) {
        if (address) {
          addresses.push(address);
        }
      }
    }

    return { addresses };
  }, [numOfTokens, address]);

  const { tokenIds } = useMemo(() => {
    const tokenIds: bigint[] = [];

    if (numOfTokens) {
      for (let i = 0; i < numOfTokens; i++) {
        tokenIds.push(BigInt(i));
      }
    }

    return { tokenIds };
  }, [numOfTokens]);

  const { data: balanceOfBatch } = useScaffoldContractRead({
    contractName: "ReputationTokensStandalone",
    functionName: "balanceOfBatch",
    args: [addresses, tokenIds],
  });

  const { tokensProperties } = useGetTokensProperties(repTokensInstance, tokenIds);

  const { uris } = useUris(repTokensInstance, tokenIds);

  for (let i = 0; i < uris.length; i++) {
    uris[i] = uris[i].replace("ipfs://", "https://ipfs.io/ipfs/");
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
      image: responses[i]?.image,
      properties: tokensProperties[i],
    } as Token;
    tokens.push(token);
  }

  const addr = repTokensInstance?.address ?? "";

  return { tokensData: { address: addr, tokens: tokens } };
};
