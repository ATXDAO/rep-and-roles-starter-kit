import { useEffect, useState } from "react";
import Link from "next/link";
import { StringCardProps } from "../rep-tokens/cards/property-cards/StringCard";
// import { ElementClasses } from "../rep-tokens/types/Types";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isAddress } from "viem";
import { hardhat } from "viem/chains";
import { useEnsAvatar, useEnsName } from "wagmi";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { getBlockExplorerAddressLink, getTargetNetwork } from "~~/utils/scaffold-eth";

type TAddressProps = {
  address?: string;
  disableAddressLink?: boolean;
  format?: "short" | "long";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  // classes?: ElementClasses;
  props?: StringCardProps;
};

const blockieSizeMap = {
  xs: 6,
  sm: 7,
  base: 8,
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
};

/**
 * Displays an address (or ENS) with a Blockie image and option to copy address.
 */
export const Address = ({
  // address,
  disableAddressLink,
  format,
  size = "base",
  // classes = { container: "flex items-center", value: "ml-1.5 text-${size} font-normal" },
  props,
}: TAddressProps) => {
  const [ens, setEns] = useState<string | null>();
  const [ensAvatar, setEnsAvatar] = useState<string | null>();
  const [addressCopied, setAddressCopied] = useState(false);

  const { data: fetchedEns } = useEnsName({
    address: props?.value,
    enabled: isAddress(props?.value ?? ""),
    chainId: 1,
  });
  const { data: fetchedEnsAvatar } = useEnsAvatar({
    name: fetchedEns,
    enabled: Boolean(fetchedEns),
    chainId: 1,
    cacheTime: 30_000,
  });

  // We need to apply this pattern to avoid Hydration errors.
  useEffect(() => {
    setEns(fetchedEns);
  }, [fetchedEns]);

  useEffect(() => {
    setEnsAvatar(fetchedEnsAvatar);
  }, [fetchedEnsAvatar]);

  // Skeleton UI
  if (!props?.value) {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-md bg-slate-300 h-6 w-6"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 bg-slate-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isAddress(props?.value)) {
    return <span className="text-error">Wrong address</span>;
  }

  const blockExplorerAddressLink = getBlockExplorerAddressLink(getTargetNetwork(), props?.value);
  let displayAddress = props?.value?.slice(0, 5) + "..." + props?.value?.slice(-4);

  if (ens) {
    displayAddress = ens;
  } else if (format === "long") {
    displayAddress = props?.value;
  }

  // let textClass = `ml-1.5 text-${size} font-normal text-white`;

  return (
    <div className={props?.classes?.card}>
      <div className="flex-shrink-0">
        <BlockieAvatar
          address={props?.value}
          ensImage={ensAvatar}
          size={(blockieSizeMap[size] * 24) / blockieSizeMap["base"]}
        />
      </div>
      {disableAddressLink ? (
        <span className={props?.classes?.value}>{displayAddress}</span>
      ) : getTargetNetwork().id === hardhat.id ? (
        <span className={props?.classes?.value}>
          <Link href={blockExplorerAddressLink}>{displayAddress}</Link>
        </span>
      ) : (
        <a className={props?.classes?.value} target="_blank" href={blockExplorerAddressLink} rel="noopener noreferrer">
          {displayAddress}
        </a>
      )}
      {addressCopied ? (
        <CheckCircleIcon
          className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
          aria-hidden="true"
        />
      ) : (
        <CopyToClipboard
          text={props?.value}
          onCopy={() => {
            setAddressCopied(true);
            setTimeout(() => {
              setAddressCopied(false);
            }, 800);
          }}
        >
          <DocumentDuplicateIcon
            className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
            aria-hidden="true"
          />
        </CopyToClipboard>
      )}
    </div>
  );
};
