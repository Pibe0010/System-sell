import { SettingsTemplate, useModulesStore } from "../index.js";
import { useQuery } from "@tanstack/react-query";

export const SettignsPage = () => {
  const { addModules } = useModulesStore();
  const { isLoading, error } = useQuery({
    queryKey: ["add modules"],
    queryFn: addModules,
  });

  if (isLoading) return <span>Loading....</span>;
  if (error) return <span>Error....</span>;
  return <SettingsTemplate />;
};
