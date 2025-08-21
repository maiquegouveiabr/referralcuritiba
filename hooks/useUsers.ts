import { useState, useEffect } from "react";
import { User } from "@/interfaces";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function useUsers(router: AppRouterInstance) {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/db/users`);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(String(error));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (error) {
      alert(error);
      router.refresh();
    }
  }, [error, router]);

  return { users, error, fetchUsers, loading };
}
