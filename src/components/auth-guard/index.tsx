export const AuthGuard = ({
  children,
  permission,
  isPublic,
}: {
  children: JSX.Element;
  permission: string[];
  isPublic?: boolean;
}) => {
  if (isPublic) {
    return <>{children}</>;
  }
};
