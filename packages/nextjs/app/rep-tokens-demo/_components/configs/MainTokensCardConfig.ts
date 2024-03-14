import { ImageProps } from "../../../../components/rep-tokens/cards/value-cards/ImageCard";
import {
  ImageValueCardConfigProp,
  TokenCardConfigProps,
  TokenCardValuesConfigProps,
  ValueCardConfigProps,
} from "../../../../components/rep-tokens/types/Types";
import { TokenGroupCardConfigProps } from "../../../../components/rep-tokens/types/Types";

export const balanceConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg bg-slate-300",
    value: "text-4xl mx-auto text-center text-black",
  },
} as ValueCardConfigProps;

export const imageConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg bg-slate-300 p-1",
    value: "rounded-lg mx-auto",
  },
  imageProperties: new ImageProps("Token", 256, 256),
} as ImageValueCardConfigProp;

export const nameConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg bg-slate-300",
    value: "text-1xl text-center object-center mx-auto font-bold break-all text-black",
  },
} as ValueCardConfigProps;

export const descriptionConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg bg-slate-300",
    value: "text-1xl mx-auto text-center break-words text-black",
  },
} as ValueCardConfigProps;

export const addressConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg flex items-center justify-center bg-slate-300",
    value: " ml-1.5 text-base font-normal text-cyan-800",
  },
} as ValueCardConfigProps;

export const isTradeableConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg bg-slate-300 ",
    value: "text-1xl text-center object-center mx-auto font-bold break-all text-black",
  },
} as ValueCardConfigProps;

export const maxMintAmountConfigProps = {
  isRendering: true,
  classes: {
    card: "rounded-lg bg-slate-300",
    value: "text-1xl text-center object-center mx-auto font-bold text-black",
  },
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
  cardClasses: "rounded-lg bg-slate-600 p-5 m-4 w-64",
  valuesProps: tokenCardValuesProps,
} as TokenCardConfigProps;

export const tokenGroupCardConfigProps = {
  isRendering: true,
  cardClasses: {
    card: "text-white rounded-lg bg-slate-900 flex flex-col items-center p-5",
    value: "rounded-lg bg-slate-800 flex justify-center p-5",
  },
  address: {
    isRendering: true,
    classes: {
      card: "rounded-lg my-5 flex items-center justify-center bg-slate-300",
      value: "rounded-lg ml-1.5 text-base font-normal text-cyan-800",
    },
  } as ValueCardConfigProps,
  isPrettyLoading: {
    classes: "text-black text-center text-white",
    message: "Loading Tokens...",
  },
  tokenCardConfigProps,
} as TokenGroupCardConfigProps;
