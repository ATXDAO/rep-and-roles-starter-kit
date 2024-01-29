import { TokenCardProps } from "../cards/token-card/TokenCard";
import { TokenGroupProps } from "../cards/token-group-card/TokenGroupCard";
import { Token } from "../hooks/Hooks";
import { TokenCardConfigProps } from "../types/Types";
import { TokenGroupCardConfigProps } from "../types/Types";

export function buildTokenGroupCard(config: TokenGroupCardConfigProps, tokenCards: TokenCardProps[], address?: string) {
  const tokenGroupCard: TokenGroupProps = {
    tokenCardsProps: tokenCards,
    cardClasses: config.cardClasses,
    addressProps: config?.address?.isRendering
      ? {
          value: address,
          classes: config?.address?.classes,
          isPrettyLoading: config?.isPrettyLoading,
        }
      : undefined,
    isPrettyLoading: config?.isPrettyLoading,
  };

  return tokenGroupCard;
}

export function buildTokenCards(tokens: Token[], address?: string, tokenCardProps?: TokenCardConfigProps) {
  const arr = [];

  for (let i = 0; i < tokens.length; i++) {
    const tokenCardProp: TokenCardProps = {
      isPrettyLoading: tokenCardProps?.isPrettyLoading,
      cardClasses: tokenCardProps?.cardClasses,
      valuesProps: {
        balanceProps: tokenCardProps?.valuesProps?.balanceProps?.isRendering
          ? {
              value: tokens[i].balance,
              classes: tokenCardProps?.valuesProps?.balanceProps?.classes,
              isPrettyLoading: tokenCardProps?.valuesProps?.balanceProps?.isPrettyLoading,
            }
          : undefined,
        nameProps: tokenCardProps?.valuesProps?.nameProps?.isRendering
          ? {
              value: tokens[i].name,
              classes: tokenCardProps?.valuesProps?.nameProps?.classes,
              isPrettyLoading: tokenCardProps?.valuesProps?.nameProps?.isPrettyLoading,
            }
          : undefined,
        descriptionProps: tokenCardProps?.valuesProps?.descriptionProps?.isRendering
          ? {
              value: tokens[i].description,
              classes: tokenCardProps?.valuesProps?.descriptionProps?.classes,
              isPrettyLoading: tokenCardProps?.valuesProps?.descriptionProps?.isPrettyLoading,
            }
          : undefined,
        imageProps: tokenCardProps?.valuesProps?.imageProps?.isRendering
          ? {
              value: tokens[i].image,
              properties: tokenCardProps?.valuesProps?.imageProps?.imageProperties,
              classes: tokenCardProps?.valuesProps?.imageProps?.classes,
              isPrettyLoading: tokenCardProps?.valuesProps?.imageProps?.isPrettyLoading,
            }
          : undefined,
        addressProps: tokenCardProps?.valuesProps?.addressProps?.isRendering
          ? {
              value: address,
              classes: tokenCardProps?.valuesProps?.addressProps?.classes,
              isPrettyLoading: tokenCardProps?.valuesProps?.addressProps?.isPrettyLoading,
            }
          : undefined,
      },
    };

    arr.push(tokenCardProp);
  }

  return arr;
}
