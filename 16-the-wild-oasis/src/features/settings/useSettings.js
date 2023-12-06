import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

// Get the settings saved in the databse
export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({ queryKey: ["settings"], queryFn: getSettings });

  return { isLoading, error, settings };
}
