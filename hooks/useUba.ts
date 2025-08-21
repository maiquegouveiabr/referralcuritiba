import { useState, useEffect } from "react";
import { UbaArea } from "@/interfaces";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function useUba(router: AppRouterInstance) {
  const [uba, setUba] = useState<UbaArea[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingUba, setLoadingUba] = useState(false);

  const fetchUba = async () => {
    try {
      setLoadingUba(true);
      const response = await fetch("/api/db/uba");
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setUba(data);
      setLoadingUba(false);
    } catch (error) {
      console.error(error);
      setError(String(error));
    }
  };

  useEffect(() => {
    fetchUba();
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
      router.refresh();
    }
  }, [error, router]);

  return { uba, error, fetchUba, loadingUba };
}
