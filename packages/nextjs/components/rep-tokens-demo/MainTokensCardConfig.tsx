import { ImageProps } from "../rep-tokens/cards/property-cards/ImageCard";
import {
  BaseElementConfigProp,
  ImageElementConfigProp,
  TokenCardConfigProps,
  TokenElementsConfigProps,
} from "../rep-tokens/types/Types";

export const balanceProps = {
  isRendering: true,
  classes: {
    container: "bg-slate-300",
    value: "text-4xl mx-auto text-center",
  },
  isPrettyLoading: true,
} as BaseElementConfigProp;

export const imageProps = {
  isRendering: true,
  classes: {
    container: "bg-slate-300 p-1",
    value: "rounded mx-auto",
  },
  imageProperties: new ImageProps("Token", 256, 256),
  isPrettyLoading: true,
} as ImageElementConfigProp;

export const nameProps = {
  isRendering: true,
  classes: {
    container: "bg-slate-300",
    value: "text-1xl text-center object-center mx-auto font-bold break-all",
  },
  isPrettyLoading: true,
} as BaseElementConfigProp;

export const descriptionProps = {
  isRendering: true,
  classes: {
    container: "bg-slate-300",
    value: "text-1xl mx-auto text-center break-words",
  },
  isPrettyLoading: true,
} as BaseElementConfigProp;

export const addressProps = {
  isRendering: true,
  classes: {
    container: "flex items-center justify-center bg-slate-300",
    value: "rounded mx-auto",
  },
  isPrettyLoading: true,
} as BaseElementConfigProp;

export const elementsProps = {
  balanceProps,
  imageProps,
  nameProps,
  descriptionProps,
  addressProps,
} as TokenElementsConfigProps;

export const tokenCardProps = {
  isRendering: true,
  classes: {
    card: "bg-slate-600 p-5 m-4 w-64",
  },
  elementsProps,
} as TokenCardConfigProps;

export const tokenGroupCardProps = {
  isRendering: true,
  classes: {
    container: "flex justify-center bg bg-slate-1000 p-3",
    card: "bg-slate-800 flex flex-col items-center",
    address: {
      container: "flex items-center justify-center bg-slate-600",
      value: "ml-1.5 text-${size} font-normal text-white",
    },
  },

  isPrettyLoading: true,
  tokenCardProps,
};
