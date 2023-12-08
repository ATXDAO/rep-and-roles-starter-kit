import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export function useGetRemainingTime(address?: string) {
  const { data: remainingTime } = useScaffoldContractRead({
    contractName: "CadentRepDistributor",
    functionName: "getRemainingTime",
    args: [address],
  });

  return remainingTime;
}

export function useClaimReputation() {
  const { writeAsync: writeClaimRep } = useScaffoldContractWrite({
    contractName: "CadentRepDistributor",
    functionName: "claim",
    blockConfirmations: 1,
  });

  return writeClaimRep;
}
