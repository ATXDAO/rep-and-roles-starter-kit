import { TokenCardProps } from "../cards/token-card/TokenCard";
import { TokenGroupProps } from "../cards/token-group-card/TokenGroupCard";
import { Token } from "../hooks/Hooks";
import { TokenCardConfigProps } from "../types/Types";
import { TokenGroupCardConfigProps } from "../types/Types";

export function buildTokenGroupCard(config: TokenGroupCardConfigProps, tokenCards: TokenCardProps[], address?: string) {
  const tokenGroupCard: TokenGroupProps = {
    tokenCardsProps: tokenCards,
    classes: config.classes,
    address: {
      value: address,
      classes: config.address.classes,
      isPrettyLoading: config.isPrettyLoading,
    },
    isPrettyLoading: config.isPrettyLoading,
  };

  return tokenGroupCard;
}

export function buildTokenCards(tokens: Token[], address?: string, tokenCardProps?: TokenCardConfigProps) {
  const arr = [];

  for (let i = 0; i < tokens.length; i++) {
    const tokenCardProp: TokenCardProps = {
      isPrettyLoading: tokenCardProps?.isPrettyLoading,
      cardClasses: tokenCardProps?.cardClasses,
      elementsProps: {
        balanceProp: tokenCardProps?.elementsProps?.balanceProps?.isRendering
          ? {
              value: tokens[i].balance,
              classes: tokenCardProps?.elementsProps?.balanceProps?.classes,
              isPrettyLoading: tokenCardProps?.elementsProps?.balanceProps?.isPrettyLoading,
            }
          : undefined,
        nameProp: tokenCardProps?.elementsProps?.nameProps?.isRendering
          ? {
              value: tokens[i].name,
              classes: tokenCardProps?.elementsProps?.nameProps?.classes,
              isPrettyLoading: tokenCardProps?.elementsProps?.nameProps?.isPrettyLoading,
            }
          : undefined,
        descriptionProp: tokenCardProps?.elementsProps?.descriptionProps?.isRendering
          ? {
              value: tokens[i].description,
              classes: tokenCardProps?.elementsProps?.descriptionProps?.classes,
              isPrettyLoading: tokenCardProps?.elementsProps?.descriptionProps?.isPrettyLoading,
            }
          : undefined,
        imageProp: tokenCardProps?.elementsProps?.imageProps?.isRendering
          ? {
              value: tokens[i].image,
              properties: tokenCardProps?.elementsProps?.imageProps?.imageProperties,
              classes: tokenCardProps?.elementsProps?.imageProps?.classes,
              isPrettyLoading: tokenCardProps?.elementsProps?.imageProps?.isPrettyLoading,
            }
          : undefined,
        addressProp: tokenCardProps?.elementsProps?.addressProps?.isRendering
          ? {
              value: address,
              classes: tokenCardProps?.elementsProps?.addressProps?.classes,
              isPrettyLoading: tokenCardProps?.elementsProps?.addressProps?.isPrettyLoading,
            }
          : undefined,
      },
    };

    arr.push(tokenCardProp);
  }

  console.log(arr);
  return arr;
}
