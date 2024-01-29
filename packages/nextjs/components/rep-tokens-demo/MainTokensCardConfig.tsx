import { ImageProps } from "../rep-tokens/cards/value-cards/ImageCard";
import {
  ImageValueCardConfigProp,
  TokenCardConfigProps,
  TokenCardValuesConfigProps,
  ValueCardConfigProps,
} from "../rep-tokens/types/Types";
import { TokenGroupCardConfigProps } from "../rep-tokens/types/Types";

export const balanceProps = {
  isRendering: true,
  classes: {
    card: "bg-slate-300",
    value: "text-4xl mx-auto text-center",
  },
  isPrettyLoading: true,
} as ValueCardConfigProps;

export const imageProps = {
  isRendering: true,
  classes: {
    card: "bg-slate-300 p-1",
    value: "rounded mx-auto",
  },
  imageProperties: new ImageProps("Token", 256, 256),
  isPrettyLoading: true,
} as ImageValueCardConfigProp;

export const nameProps = {
  isRendering: true,
  classes: {
    card: "bg-slate-300",
    value: "text-1xl text-center object-center mx-auto font-bold break-all",
  },
  isPrettyLoading: true,
} as ValueCardConfigProps;

export const descriptionProps = {
  isRendering: true,
  classes: {
    card: "bg-slate-300",
    value: "text-1xl mx-auto text-center break-words",
  },
  isPrettyLoading: true,
} as ValueCardConfigProps;

export const addressProps = {
  isRendering: true,
  classes: {
    card: "flex items-center justify-center bg-slate-300",
    value: "rounded mx-auto",
  },
  isPrettyLoading: true,
} as ValueCardConfigProps;

export const tokenCardValuesProps = {
  balanceProps,
  imageProps,
  nameProps,
  descriptionProps,
  addressProps,
} as TokenCardValuesConfigProps;

export const tokenCardProps = {
  isRendering: true,
  cardClasses: "bg-slate-600 p-5 m-4 w-64",
  valuesProps: tokenCardValuesProps,
} as TokenCardConfigProps;

export const tokenGroupCardConfigProps = {
  isRendering: true,
  cardClasses: {
    card: "bg-slate-900 flex flex-col items-center p-5",
    value: "bg-slate-800 flex justify-center p-5",
  },
  address: {
    isRendering: true,
    classes: {
      card: "m-5 flex items-center justify-center bg-slate-300",
      value: "rounded mx-auto",
    },
    isPrettyLoading: true,
  } as ValueCardConfigProps,

  isPrettyLoading: true,
  tokenCardProps,
} as TokenGroupCardConfigProps;
