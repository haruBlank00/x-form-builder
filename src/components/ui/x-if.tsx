type Props = {
  children: React.ReactNode;
  condition: boolean;
};

export const XIf = (props: Props) => {
  const { children, condition } = props;
  if (!condition) return null;
  return <>{children}</>;
};
