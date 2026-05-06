import useSWR, { mutate } from "swr";

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

export function useCart() {
  const { data, isLoading, error } = useSWR("/api/cart", fetcher, {
    fallbackData: {
      itemCount: 0,
    },
  });

  const revlidateCart = async () => {
    const res = await fetch("/api/cart");
    const data = await res.json();
    mutate("/api/cart", data);
  };

  return {
    itemCount: data?.itemCount ?? 0,
    isLoading,
    error,
    revlidateCart,
  };
}
