import useSWR, { mutate } from 'swr';

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

export const useBranches = (url: string) => {
  const match = url.match(/https?:\/\/(?:www\.)?github.com\/(?<repo>.*)/);
  const targetUrl = match?.groups?.repo ? `https://api.github.com/repos/${match?.groups?.repo}/branches` : '';
  const { data, error } = useSWR(targetUrl);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const prefetch = (url: string) => mutate(url, fetcher(url));
