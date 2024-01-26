import { IsBeautifyingTokenCardLoadingProps } from "../cards/token-card/TokenCard";
import { TokenCardElementsClasses } from "../cards/token-card/TokenCard";
import { TokenCardProps } from "../cards/token-card/TokenCard";
import { Token } from "../hooks/Hooks";
import { ElementClasses } from "../types/Types";
import { TokenCardConfigProps } from "~~/components/rep-tokens-demo/MainTokensCardConfig";

export interface TokenProps {
  renderProps?: RenderProps;
  elementsClasses?: TokenElementsClasses;
}

export interface RenderProps {
  renderBalance?: boolean;
  renderImage?: boolean;
  renderName?: boolean;
  renderDescription?: boolean;
  renderAddress?: boolean;
}

export interface TokenElementsClasses {
  balanceClasses?: ElementClasses;
  imageClasses?: ElementClasses;
  nameClasses?: ElementClasses;
  descriptionClasses?: ElementClasses;
  addressClasses?: ElementClasses;
}

export function buildTokenGroupCard(
  tokens: Token[],
  address?: string,
  tokenCardProps?: TokenCardConfigProps,
  elementsClasses?: TokenCardElementsClasses,
  isBeautifyingTokenCardLoadingProps?: IsBeautifyingTokenCardLoadingProps,
) {
  const arr = [];

  for (let i = 0; i < tokens.length; i++) {
    const tokenCardProp: TokenCardProps = {
      token: tokens[i],
      isBeautifyingTokenCardLoadingProps,
      elementsClasses,
      balanceProp: tokenCardProps?.balanceProps?.isRendering
        ? {
            value: tokens[i].balance,
            classes: tokenCardProps?.balanceProps?.classes,
            // isBeautifyLoading: isBeautifyingTokenCardLoadingProps?.isBeautifyLoadingElementsProps.balance,
          }
        : undefined,
      nameProp: tokenCardProps?.nameProps?.isRendering
        ? {
            value: tokens[i].name,
            classes: tokenCardProps?.nameProps?.classes,
            // isBeautifyLoading: isBeautifyingTokenCardLoadingProps?.isBeautifyLoadingElementsProps.name,
          }
        : undefined,
      descriptionProp: tokenCardProps?.descriptionProps?.isRendering
        ? {
            value: tokens[i].description,
            classes: tokenCardProps?.descriptionProps?.classes,
            // isBeautifyLoading: isBeautifyingTokenCardLoadingProps?.isBeautifyLoadingElementsProps.description,
          }
        : undefined,
      imageProp: tokenCardProps?.imageProps?.isRendering
        ? {
            value: tokens[i].image,
            properties: tokenCardProps?.imageProps?.imageProperties,
            classes: tokenCardProps?.imageProps?.classes,
            // isBeautifyLoading: isBeautifyingTokenCardLoadingProps?.isBeautifyLoadingElementsProps.image,
          }
        : undefined,
      addressProp: tokenCardProps?.addressProps?.isRendering
        ? {
            value: address,
            classes: tokenCardProps?.addressProps?.classes,
            // isBeautifyLoading: isBeautifyingTokenCardLoadingProps?.isBeautifyLoadingElementsProps.address,
          }
        : undefined,
    };

    arr.push(tokenCardProp);
  }

  return arr;
}
