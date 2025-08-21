import { Area } from "@/interfaces";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState, useEffect } from "react";

export function useAreas(router: AppRouterInstance) {
  const [areas, setAreas] = useState<Area[] | []>([]);
  const [areasLoading, setAreasLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAreas = async () => {
    setAreasLoading(true);
    setError(null); // Reset errors before fetching
    try {
      const response = await fetch(`/api/db/areas`);

      if (!response.ok) {
        throw new Error("Failed to fetch areas from database");
      }

      const data = await response.json();
      setAreas(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setAreasLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
      router.refresh();
    }
  }, [error, router]);

  return { areas, areasLoading, error, fetchAreas };
}
