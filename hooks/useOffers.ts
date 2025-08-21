import { useState, useEffect } from "react";
import { Offer } from "@/interfaces";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function useOffers(router: AppRouterInstance) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingOffers, setLoadingOffers] = useState(false);

  const fetchOffers = async () => {
    try {
      setLoadingOffers(true);
      const response = await fetch("/api/db/offers");
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setOffers(data);
      setLoadingOffers(false);
    } catch (error) {
      console.error(error);
      setError(String(error));
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
      router.refresh();
    }
  }, [error, router]);

  return { offers, error, fetchOffers, loadingOffers };
}
