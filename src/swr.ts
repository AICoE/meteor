import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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
