import { ImageProps } from "../../../../components/rep-tokens/cards/value-cards/ImageCard";
import {
  ImageValueCardConfigProp,
  TokenCardConfigProps,
  TokenCardValuesConfigProps,
  ValueCardConfigProps,
} from "../../../../components/rep-tokens/types/Types";

export const balanceConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg bg-red-300",
    value: "text-4xl mx-auto text-center text-black",
  },
  isPrettyLoading: true,
} as ValueCardConfigProps;

export const imageConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg bg-cyan-300  p-1",
    value: "rounded-lg mx-auto",
  },
  imageProperties: new ImageProps("Token", 256, 256),
  isPrettyLoading: true,
} as ImageValueCardConfigProp;

export const nameConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg bg-lime-300 ",
    value: "text-1xl text-center object-center mx-auto font-bold break-all text-black",
  },
  isPrettyLoading: true,
} as ValueCardConfigProps;

export const descriptionConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg bg-violet-300",
    value: "text-1xl mx-auto text-center break-words text-black",
  },
  isPrettyLoading: true,
} as ValueCardConfigProps;

export const addressConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg flex items-center justify-center bg-pink-300",
    value: " ml-1.5 text-base font-normal text-cyan-800",
  },
  isPrettyLoading: true,
} as ValueCardConfigProps;

export const isTradeableConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg bg-indigo-300 ",
    value: "text-1xl text-center object-center mx-auto font-bold break-all text-black",
  },
  isPrettyLoading: true,
} as ValueCardConfigProps;

export const maxMintAmountConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg bg-teal-300",
    value: "text-1xl text-center object-center mx-auto font-bold text-black",
  },
  isPrettyLoading: true,
} as ValueCardConfigProps;

export const tokenCardValuesProps = {
  balanceConfigProps,
  imageConfigProps,
  nameConfigProps,
  descriptionConfigProps,
  addressConfigProps,
  isTradeableConfigProps,
  maxMintAmountConfigProps,
} as TokenCardValuesConfigProps;

export const tokenCardConfigProps = {
  isRendering: true,
  cardClasses: "bg-slate-600 rounded-lg p-5 m-4 w-64",
  valuesProps: tokenCardValuesProps,
} as TokenCardConfigProps;
