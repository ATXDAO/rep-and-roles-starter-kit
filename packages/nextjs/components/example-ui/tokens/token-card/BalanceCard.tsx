type TBalanceCardProps = {
  value: bigint;
  propertyClasses?: string;
  prettifyLoading?: boolean;
};

export const BalanceCard = ({ value, prettifyLoading, propertyClasses }: TBalanceCardProps) => {
  return (
    <div className={propertyClasses}>
      {prettifyLoading ? (
        value !== undefined ? (
          Number(value)
        ) : (
          <>Loading Balance...</>
        )
      ) : value !== undefined ? (
        Number(value)
      ) : (
        0
      )}
    </div>
  );
};
