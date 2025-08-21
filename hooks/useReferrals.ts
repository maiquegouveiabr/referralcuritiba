import { Referral } from "@/interfaces";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState, useEffect, useCallback } from "react";

export default function useReferrals(refreshToken: string, router: AppRouterInstance) {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [filteredReferrals, setFilteredReferrals] = useState<Referral[]>([]);
  const [loadingReferrals, setLoadingReferrals] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReferrals = useCallback(async () => {
    setLoadingReferrals(true);
    setError(null); // Reset errors before fetching
    try {
      const response = await fetch(`/api/referrals/unassigned?refreshToken=${refreshToken}`);

      if (!response.ok) {
        throw new Error("Failed to fetch referrals");
      }

      const data: Referral[] = await response.json();
      setReferrals(
        data.map((ref) => {
          return {
            ...ref,
            sentStatus: false,
          };
        })
      );
      setFilteredReferrals(
        data.map((ref) => {
          return {
            ...ref,
            sentStatus: false,
          };
        })
      );
      setLoadingReferrals(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }, [refreshToken]);

  useEffect(() => {
    fetchReferrals();
  }, [fetchReferrals]);

  useEffect(() => {
    if (error) {
      alert(error);
      router.replace("/");
    }
  }, [error, router]);

  return { referrals, setReferrals, filteredReferrals, setFilteredReferrals, loadingReferrals, error, fetchReferrals };
}
