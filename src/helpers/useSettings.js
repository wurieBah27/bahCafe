import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../apis/settingsAPI";

const useSettings = () => {
  const {
    data: settingsData = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { settingsData, isLoading, error };
};

export default useSettings;
