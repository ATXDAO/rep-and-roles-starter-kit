// import { TokenCardClasses } from "../rep-tokens/cards/token-card/TokenCard";
// import { TokenGroupCardElementsClasses } from "../rep-tokens/cards/token-group-card/TokenGroupCard";
// export const tokensCardPropertiesClasses = {
//   container: "flex justify-center",
//   card: "bg-slate-800 flex flex-col items-center",
//   address: {
//     container: "flex items-center justify-center bg-slate-600",
//     value: "ml-1.5 text-${size} font-normal text-white",
//   },
// } as TokenGroupCardElementsClasses;
// export const tokenCardPropertiesClasses = {
//   card: "px-1 py-1 relative w-20 ",
//   baseTokenCardElementsClasses: {
//     balance: {
//       container: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
//       value: "text-4xl text-center justify-center",
//     },
//     image: {
//       value: "rounded mx-auto",
//     },
//   },
// } as TokenCardClasses;
import { ImageProps } from "../../../components/rep-tokens/cards/value-cards/ImageCard";
import {
  ImageValueCardConfigProp,
  TokenCardConfigProps,
  TokenCardValuesConfigProps,
  ValueCardConfigProps,
} from "../../../components/rep-tokens/types/Types";
import { TokenGroupCardConfigProps } from "../../../components/rep-tokens/types/Types";

export const balanceProps = {
  isRendering: true,
  classes: {
    card: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    value: "text-4xl mx-auto text-center text-black",
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

export const tokenCardValuesProps = {
  balanceProps,
  imageProps,
} as TokenCardValuesConfigProps;

export const tokenCardProps = {
  isRendering: true,
  cardClasses: "bg-slate-600 px-1 py-1 relative w-20 ",
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
      card: "my-5 flex items-center justify-center bg-slate-300",
      value: "ml-1.5 text-base font-normal text-cyan-800",
    },
    isPrettyLoading: true,
  } as ValueCardConfigProps,

  isPrettyLoading: true,
  tokenCardProps,
} as TokenGroupCardConfigProps;
