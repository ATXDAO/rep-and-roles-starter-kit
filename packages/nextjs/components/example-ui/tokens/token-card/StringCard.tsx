type TStringCardProps = {
  value: string;
  propertyClasses?: string;
  prettifyLoading?: boolean;
};

export const StringCard = ({ value, prettifyLoading, propertyClasses }: TStringCardProps) => {
  return (
    <div className={propertyClasses}>{prettifyLoading ? (value !== undefined ? value : "Loading...") : value}</div>
  );
};
