import { useCallback, useEffect, useState } from "react";

export function useTokenURIs(contract: any, tokenIds: bigint[]) {
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
