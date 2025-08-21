import { useState, useEffect } from "react";
import { StopTeachingReason } from "@/interfaces";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function useStopTeachingReason(router: AppRouterInstance) {
  const [stopTeachingReasons, setStopTeachingReasons] = useState<StopTeachingReason[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingStopTeachingReasons, setLoadingStopTeachingReasons] = useState(false);

  const fetchUseStopTeachingReason = async () => {
    try {
      setLoadingStopTeachingReasons(true);
      const response = await fetch("/api/db/stopTeachingReason");
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setStopTeachingReasons(data);
      setLoadingStopTeachingReasons(false);
    } catch (error) {
      console.error(error);
      setError(String(error));
    }
  };

  useEffect(() => {
    fetchUseStopTeachingReason();
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
      router.refresh();
    }
  }, [error, router]);

  return { stopTeachingReasons, error, fetchUseStopTeachingReason, loadingStopTeachingReasons };
}
