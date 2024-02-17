import { useEffect, useState } from "react";

export default function useFetchData(url: string) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const res = await fetch(url, { cache: "no-store" });
      const data = await res.json();

      if (res.ok) {
        setData(data.data);
      } else {
        setError(data.error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}
