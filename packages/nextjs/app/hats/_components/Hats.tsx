"use client";

import { useFetch } from "usehooks-ts";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const claimableHatId = "26960358049567071831564234593151059434471056522609336320533481914368";

export function Hats() {
  const { address } = useAccount();

  //  26959946667150639794667015087019630673637144422540572481103610249216
  // 26960358043289970096177553829315270011263390106506980876069447401472

  // console.log(loadBurnerSK());

  // const { data: isAdminOfHat } = useScaffoldContractRead({
  //   contractName: "Hats",
  //   functionName: "isAdminOfHat",
  //   args: [address, BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  // });

  // const { data: balanceOfHat } = useScaffoldContractRead({
  //   contractName: "Hats",
  //   functionName: "balanceOf",
  //   args: [address, BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  // });

  const { data: viewHat } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "viewHat",
    args: [BigInt(claimableHatId)],
  });

  const { data: isEligible } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "isEligible",
    args: [address, BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  });

  const { data: isActive } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "isActive",
    args: [BigInt("26959946667150639794667015087019630673637144422540572481103610249216")],
  });

  console.log(isEligible);
  console.log(isActive);

  // const { writeAsync: mintHat } = useScaffoldContractWrite({
  //   contractName: "Hats",
  //   functionName: "mintHat",
  //   args: [BigInt("26959946667150639794667015087019630673637144422540572481103610249216"), address],
  // });

  // console.log(isEligible);

  // console.log(viewHat);

  const { data: balanceOfClaimableHat, refetch } = useScaffoldContractRead({
    contractName: "Hats",
    functionName: "balanceOf",
    args: [address, BigInt(claimableHatId)],
  });

  console.log(balanceOfClaimableHat);

  const { writeAsync: claimHat } = useScaffoldContractWrite({
    contractName: "SimpleClaimHatter",
    functionName: "claimHat",
    args: [BigInt(claimableHatId)],
  });

  const result: any = useFetch(viewHat ? viewHat[5].replace("ipfs://", "https://nftstorage.link/ipfs/") : "");
  console.log(result.data);

  console.log(result?.data?.json?.image.replace("ipfs://", "https://nftstorage.link/ipfs/"));
  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-primary bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        <p>{result?.data?.name}</p>
        <img
          src={result?.data?.image.replace("ipfs://", "https://nftstorage.link/ipfs/")}
          width={156}
          height={156}
        ></img>
        <p>{result?.data?.description}</p>
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

        {balanceOfClaimableHat || 0 > 0 ? <p>You are currently wearing this hat!</p> : <></>}
      </div>
    </>
  );
}
