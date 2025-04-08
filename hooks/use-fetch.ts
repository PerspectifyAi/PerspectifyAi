import { useState, useCallback } from "react";
import { toast } from "sonner";

// A generic async function type that takes any arguments and returns a Promise of T
type FetchFunction<T, Args extends unknown[]> = (...args: Args) => Promise<T>;

interface UseFetchReturn<T, Args extends unknown[]> {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
  fn: (...args: Args) => Promise<void>;
  setData: (data: T | undefined) => void;
}

function useFetch<T, Args extends unknown[]>(cb: FetchFunction<T, Args>): UseFetchReturn<T, Args> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fn = useCallback(
    async (...args: Args) => {
      setLoading(true);
      setError(null);

      try {
        const response = await cb(...args);
        setData(response);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("An unknown error occurred");
        setError(error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [cb]
  );

  return { data, loading, error, fn, setData };
}

export default useFetch;
