"use client";

import { useFetch } from "usehooks-ts";
import { useAccount, useChainId } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

// const claimableHatId = "26960358049567071831564234593151059434471056522609336320533481914368";

function getHatConfig(chainId: number) {
  let claimableHatId = "";

  if (chainId === 31337) {
    claimableHatId = "26960358049567071831564234593151059434471056522609336320533481914368";
  } else if (chainId === 11155111) {
    claimableHatId = "";
    // claimHatterName = "MultiClaimsHatter";
  }

  return { claimableHatId };
}

export function Hats() {
  const { address } = useAccount();
  const chainId = useChainId();

  const { claimableHatId } = getHatConfig(chainId);

  // const { data: isAdminOfHat } = useScaffoldContractRead({
  //   contractName: "Hats",
  //   functionName: "isAdminOfHat",
  //   args: [address, BigInt(claimableHatId)],
  // });

  const { data: viewHat } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "viewHat",
    args: [BigInt(claimableHatId)],
  });

  //   const { data: isEligible } = useScaffoldContractRead({
  //     contractName: "Hats",
  //     functionName: "isEligible",
  //     args: [address, BigInt(claimableHatId)],
  //   });

  //   const { data: isActive } = useScaffoldContractRead({
  //     contractName: "Hats",
  //     functionName: "isActive",
  //     args: [BigInt(claimableHatId)],
  //   });

  const { data: balanceOfClaimableHat, refetch } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "balanceOf",
    args: [address, BigInt(claimableHatId)],
  });

  console.log(balanceOfClaimableHat);

  const { writeAsync: claimHat } = useScaffoldContractWrite({
    contractName: "MultiClaimsHatter",
    functionName: "claimHat",
    args: [BigInt(claimableHatId)],
  });

  const result: any = useFetch(viewHat ? viewHat[5].replace("ipfs://", "https://nftstorage.link/ipfs/") : "");

  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <p>{result?.data?.name}</p>
        {balanceOfClaimableHat || 0 > 0 ? <p className="text-green-700">Equipped</p> : <></>}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={result?.data?.image.replace("ipfs://", "https://nftstorage.link/ipfs/")}
          width={156}
          height={156}
          alt={"Hat 1"}
        ></img>
        <p className="w-96 text-center">{result?.data?.description}</p>
        <button
          disabled={(balanceOfClaimableHat || 0) > 0}
          className="btn btn-secondary btn-sm font-normal gap-1"
          onClick={async () => {
            await claimHat();
            await refetch();
          }}
        >
          {"Claim (100 Lifetime Tokens)"}
        </button>
      </div>
    </>
  );
}
