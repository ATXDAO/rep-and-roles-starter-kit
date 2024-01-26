import {
  IsBeautifyingTokenCardLoadingProps,
  IsRenderingTokenCardProps,
  TokenCardElementsClasses,
} from "../rep-tokens/cards/token-card/TokenCard";
import {
  IsBeautifyingTokenGroupCardLoadingProps,
  IsRenderingTokenGroupCardProps,
} from "../rep-tokens/cards/token-group-card/TokenGroupCard";
import { TokenGroupCardElementsClasses } from "../rep-tokens/cards/token-group-card/TokenGroupCard";

export const tokensCardPropertiesClasses = {
  container: "flex justify-center",
  card: "bg-slate-800 flex flex-col items-center",
  address: {
    container: "flex items-center justify-center bg-slate-600",
    value: "ml-1.5 text-${size} font-normal text-white",
  },
} as TokenGroupCardElementsClasses;

export const tokenCardPropertiesClasses = {
  card: "px-1 py-1 relative w-20 ",
  baseTokenCardElementsClasses: {
    balance: {
      container: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      value: "text-4xl text-center justify-center",
    },
    image: {
      value: "rounded mx-auto",
    },
  },
} as TokenCardElementsClasses;

export const tokensCardRenderProps = {
  card: true,
  address: true,
} as IsRenderingTokenGroupCardProps;

export const isRenderingTokenCardProps = {
  card: true,
  isRenderingElementsProps: {
    balance: true,
    image: true,
    name: false,
    description: false,
    address: false,
  },
} as IsRenderingTokenCardProps;

export const tokensCardPrettifyLoadingProps = {
  card: true,
} as IsBeautifyingTokenGroupCardLoadingProps;

export const tokenCardPrettifyLoadingProps = {
  card: false,
  isBeautifyLoadingElementsProps: {
    balance: false,
    image: false,
    name: false,
    description: false,
  },
} as IsBeautifyingTokenCardLoadingProps;
