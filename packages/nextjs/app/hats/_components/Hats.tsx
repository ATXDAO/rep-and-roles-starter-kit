"use client";

import { useFetch } from "usehooks-ts";
import { useAccount, useChainId } from "wagmi";
import { useRepTokens } from "~~/components/rep-tokens/hooks/Hooks";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

// const claimableHatId = "26960358049567071831564234593151059434471056522609336320533481914368";

function getHatConfig(chainId: number) {
  let claimableHatId1 = "";
  let claimableHatId2 = "";
  let claimableHatId3 = "";

  if (chainId === 31337) {
    claimableHatId1 = "26960358049567071831564234593151059434471056522609336320533481914368";
    claimableHatId2 = "26960358055844173566950915356986848857678722938711691764997516427264";
    claimableHatId3 = "26960358062121275302337596120822638280886389354814047209461550940160";
  } else if (chainId === 11155111) {
    claimableHatId1 = "";
    // claimHatterName = "MultiClaimsHatter";
  }

  return { claimableHatId1, claimableHatId2, claimableHatId3 };
}

export function Hats() {
  const { address } = useAccount();
  const chainId = useChainId();

  const { claimableHatId1, claimableHatId2, claimableHatId3 } = getHatConfig(chainId);

  // const { data: isAdminOfHat } = useScaffoldContractRead({
  //   contractName: "Hats",
  //   functionName: "isAdminOfHat",
  //   args: [address, BigInt(claimableHatId)],
  // });

  const { data: viewHat1 } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "viewHat",
    args: [BigInt(claimableHatId1)],
  });

  const { data: viewHat2 } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "viewHat",
    args: [BigInt(claimableHatId2)],
  });

  const { data: viewHat3 } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "viewHat",
    args: [BigInt(claimableHatId3)],
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

  const { data: balanceOfClaimableHat1, refetch: refetchBalance1 } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "balanceOf",
    args: [address, BigInt(claimableHatId1)],
  });

  const { data: balanceOfClaimableHat2, refetch: refetchBalance2 } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "balanceOf",
    args: [address, BigInt(claimableHatId2)],
  });

  const { data: balanceOfClaimableHat3, refetch: refetchBalance3 } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "balanceOf",
    args: [address, BigInt(claimableHatId3)],
  });

  const { tokens: userTokens } = useRepTokens([BigInt(0), BigInt(1), BigInt(2)], address, "nftstorage");

  const { writeAsync: claimHat1 } = useScaffoldContractWrite({
    contractName: "MultiClaimsHatter",
    functionName: "claimHat",
    args: [BigInt(claimableHatId1)],
  });

  const { writeAsync: claimHat2 } = useScaffoldContractWrite({
    contractName: "MultiClaimsHatter",
    functionName: "claimHat",
    args: [BigInt(claimableHatId2)],
  });

  const { writeAsync: claimHat3 } = useScaffoldContractWrite({
    contractName: "MultiClaimsHatter",
    functionName: "claimHat",
    args: [BigInt(claimableHatId3)],
  });

  const result1: any = useFetch(viewHat1 ? viewHat1[5].replace("ipfs://", "https://nftstorage.link/ipfs/") : "");
  const result2: any = useFetch(viewHat2 ? viewHat2[5].replace("ipfs://", "https://nftstorage.link/ipfs/") : "");
  const result3: any = useFetch(viewHat3 ? viewHat3[5].replace("ipfs://", "https://nftstorage.link/ipfs/") : "");

  const doesUserMeetRepRequirements1 = userTokens[0]?.balance >= 100;
  const doesUserMeetRepRequirements2 = userTokens[0]?.balance >= 500;
  const doesUserMeetRepRequirements3 = userTokens[0]?.balance >= 1500;

  const doesUserOwnHat1 = balanceOfClaimableHat1 || 0 > 0;
  const doesUserOwnHat2 = balanceOfClaimableHat2 || 0 > 0;
  const doesUserOwnHat3 = balanceOfClaimableHat3 || 0 > 0;

  const canClaimHat1 = doesUserMeetRepRequirements1 && !doesUserOwnHat1;
  const canClaimHat2 = doesUserMeetRepRequirements2 && !doesUserOwnHat2;
  const canClaimHat3 = doesUserMeetRepRequirements3 && !doesUserOwnHat3;

  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <p>{result1?.data?.name}</p>
            {balanceOfClaimableHat1 || 0 > 0 ? <p className="text-green-700">Equipped</p> : <></>}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result1?.data?.image.replace("ipfs://", "https://nftstorage.link/ipfs/")}
              width={156}
              height={156}
              alt={"Hat 1"}
            ></img>
            <p className="w-96 text-center">{result1?.data?.description}</p>
            <button
              disabled={!canClaimHat1}
              className="btn btn-secondary btn-sm font-normal gap-1"
              onClick={async () => {
                await claimHat1();
                await refetchBalance1();
              }}
            >
              {"Claim (100 Lifetime Tokens)"}
            </button>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>{result2?.data?.name}</p>
            {balanceOfClaimableHat2 || 0 > 0 ? <p className="text-green-700">Equipped</p> : <></>}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result2?.data?.image.replace("ipfs://", "https://nftstorage.link/ipfs/")}
              width={156}
              height={156}
              alt={"Hat 1"}
            ></img>
            <p className="w-96 text-center">{result2?.data?.description}</p>
            <button
              disabled={!canClaimHat2}
              className="btn btn-secondary btn-sm font-normal gap-1"
              onClick={async () => {
                await claimHat2();
                await refetchBalance2();
              }}
            >
              {"Claim (500 Lifetime Tokens)"}
            </button>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p>{result3?.data?.name}</p>
            {balanceOfClaimableHat3 || 0 > 0 ? <p className="text-green-700">Equipped</p> : <></>}

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={result3?.data?.image.replace("ipfs://", "https://nftstorage.link/ipfs/")}
              width={156}
              height={156}
              alt={"Hat 1"}
            ></img>
            <p className="w-96 text-center">{result3?.data?.description}</p>
            <button
              disabled={!canClaimHat3}
              className="btn btn-secondary btn-sm font-normal gap-1"
              onClick={async () => {
                await claimHat3();
                await refetchBalance3();
              }}
            >
              {"Claim (1500 Lifetime Tokens)"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
