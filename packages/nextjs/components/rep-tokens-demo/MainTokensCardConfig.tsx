import { ImageProperties } from "../rep-tokens/cards/property-cards/ImageCard";
import {
  IsBeautifyingTokenCardLoadingProps,
  IsRenderingTokenCardProps,
  TokenCardElementsClasses,
} from "../rep-tokens/cards/token-card/TokenCard";
import {
  IsBeautifyingTokenGroupCardLoadingProps, // IsRenderingTokenGroupCardProps,
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

export interface BaseConfigProp {
  isRendering: boolean;
  classes: {
    container: string;
    value: string;
  };
}

export interface ImageConfigProp extends BaseConfigProp {
  imageProperties: ImageProperties;
}

export interface TokenCardConfigProps {
  balanceProps?: BaseConfigProp;
  imageProps?: ImageConfigProp;
  nameProps?: BaseConfigProp;
  descriptionProps?: BaseConfigProp;
  addressProps?: BaseConfigProp;
}

export const balanceProps = {
  isRendering: true,
  classes: {
    container: "bg-slate-300",
    value: "text-4xl mx-auto text-center",
  },
} as BaseConfigProp;

export const imageProps = {
  isRendering: true,
  classes: {
    container: "bg-slate-300 p-1",
    value: "rounded mx-auto",
  },
  imageProperties: new ImageProperties("Token", 256, 256),
} as ImageConfigProp;

export const nameProps = {
  isRendering: true,
  classes: {
    container: "bg-slate-300",
    value: "text-1xl text-center object-center mx-auto font-bold break-all",
  },
} as BaseConfigProp;

export const descriptionProps = {
  isRendering: true,
  classes: {
    container: "bg-slate-300",
    value: "text-1xl mx-auto text-center break-words",
  },
} as BaseConfigProp;

export const addressProps = {
  isRendering: true,
  classes: {
    container: "flex items-center justify-center bg-slate-300",
    value: "rounded mx-auto",
  },
} as BaseConfigProp;

export const tokenCardElementsProps = {
  balanceProps,
  imageProps,
  nameProps,
  descriptionProps,
  addressProps,
} as TokenCardConfigProps;

export const tokenCardPropertiesClasses = {
  card: "bg-slate-600 p-5 m-4 w-64",
  baseTokenCardElementsClasses: {
    balance: {
      container: "bg-slate-300",
      value: "text-4xl mx-auto text-center",
    },
    image: {
      container: "bg-slate-300 p-1",
      value: "rounded mx-auto",
    },
    name: {
      container: "bg-slate-300",
      value: "text-1xl text-center object-center mx-auto font-bold break-all",
    },
    description: {
      container: "bg-slate-300",
      value: "text-1xl mx-auto text-center break-words",
    },
    address: {
      container: "flex items-center justify-center bg-slate-300",
      value: "rounded mx-auto",
    },
  },
} as TokenCardElementsClasses;

// export const tokensCardRenderProps = {
//   card: true,
//   address: true,
// } as IsRenderingTokenGroupCardProps;

export const isRenderingTokenCardProps = {
  card: true,
  isRenderingElementsProps: {
    balance: true,
    image: true,
    name: true,
    description: true,
    address: true,
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
    address: false,
  },
} as IsBeautifyingTokenCardLoadingProps;
