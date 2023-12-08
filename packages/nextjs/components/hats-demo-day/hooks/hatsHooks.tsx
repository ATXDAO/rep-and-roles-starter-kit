import { useEffect, useState } from "react";
import { HatsClient } from "@hatsprotocol/sdk-v1-core";
import { PublicClient, WalletClient, usePublicClient, useWalletClient } from "wagmi";

export function useHatsClient(chainId: number) {
  const [hatsClient, setHatsClient] = useState<HatsClient>();

  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  async function getHatsClient(walletClient: WalletClient, publicClient: PublicClient, chainId: number) {
    const hatsClient = new HatsClient({
      chainId,
      publicClient,
      walletClient,
    });

    setHatsClient(hatsClient);
  }

  useEffect(() => {
    if (!walletClient) return;

    getHatsClient(walletClient, publicClient, chainId);
  }, [walletClient, publicClient, chainId]);

  return { hatsClient, getHatsClient };
}

export function useHatsCanClaim(hatsClient: HatsClient | undefined, hatId: string, account: string | undefined) {
  const [canClaim, setCanClaim] = useState(false);

  async function getCanClaim(hatsClient: HatsClient | undefined, hatId: string, account: string | undefined) {
    if (!hatsClient) return;

    if (!account) return;

    const canClaim = await hatsClient.accountCanClaim({
      hatId: BigInt(hatId),
      account,
    });

    setCanClaim(canClaim);
  }

  useEffect(() => {
    getCanClaim(hatsClient, hatId, account);
  }, [hatsClient, account, hatId]);

  return { canClaim, getCanClaim };
}

export function useClaimHat(hatsClient: HatsClient | undefined, hatId: string, account: string | undefined) {
  async function claimHat() {
    if (!hatsClient) return;
    if (!account) return;

    await hatsClient.claimHat({
      account,
      hatId: BigInt(hatId),
    });
  }

  return { claimHat };
}

// export function useHatsClientWrite(hatsClient: HatsClient, functionName: string, args: object[]) {
//     async function clientWrite(hatsClient: HatsClient, functionName: string, args: object[]) {
//         await hatsClient[functionName](args);
//     }
// }
