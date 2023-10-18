import { useSearchParams } from "react-router-dom";

export function useURLposition() {
  const [searchParams] = useSearchParams();

  // get lat, lng from URL
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
