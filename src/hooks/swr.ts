import useSWR, { mutate } from 'swr';
import useDebounce from './useDebounce';

interface CustomError extends Error {
  status: number;
  info: any;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as CustomError;
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const useMeteors = () => {
  const { data, error } = useSWR('/api/meteors', fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
export const useConsole = () => {
  const { data, error } = useSWR('/api/console', fetcher);

  return {
    consoleUrl: data?.consoleUrl || '',
    isLoading: !error && !data,
    isError: error,
  };
};

export const useOrder = (uid: string) => {
  const { data, error } = useSWR(`/api/meteor/${uid}`, fetcher, { refreshInterval: 5000 });

  return {
    order: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useBranches = (url: string) => {
  const match = url.match(/https?:\/\/(?:www\.)?github.com\/(?<repo>.*)/);
  const targetUrl = match?.groups?.repo ? `https://api.github.com/repos/${match?.groups?.repo}/branches` : '';
  const debounced = useDebounce(targetUrl, 1000);
  const { data, error } = useSWR(() => (debounced ? debounced : null), fetcher, {
    onErrorRetry: (error) => {
      // Never retry on 404 (not found) or 403 (rate limit)
      if (error.status === 404 || error.status === 403) return;
    },
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const prefetch = (url: string) => mutate(url, fetcher(url));
