import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { getFirebaseDatabase } from "@/lib/firebaseClient";
import { FastifyFirebaseConnection } from "@/app/interactions/api/interfaces";
import { Interaction } from "./interfaces";

export function useFirebaseData(firebaseConnection: FastifyFirebaseConnection | null, basePath: string, infoPathBuilder: (id: string) => string) {
  const [data, setData] = useState<Interaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let baseUnsub: any = null;
    const infoUnsubs: Record<string, () => void> = {};
    let db: any = null;

    async function init() {
      if (!firebaseConnection) return;
      db = await getFirebaseDatabase(firebaseConnection);

      const baseRef = ref(db, basePath);

      baseUnsub = onValue(baseRef, (snapshot) => {
        const baseVal = snapshot.val();

        if (!baseVal || typeof baseVal !== "object") {
          setData([]);
          return;
        }

        // Get list of item IDs from base path
        const ids = Object.values(baseVal).map((i: any) => i.id);

        // Remove obsolete listeners
        for (const id in infoUnsubs) {
          if (!ids.includes(id)) {
            infoUnsubs[id]();
            delete infoUnsubs[id];
          }
        }

        // Add listeners for new IDs
        ids.forEach((id: string) => {
          if (!infoUnsubs[id]) {
            const infoRef = ref(db, infoPathBuilder(id));

            infoUnsubs[id] = onValue(infoRef, (snap) => {
              const info = snap.val();

              setData((prev) => {
                const map = new Map(prev.map((i) => [i.id, i]));
                if (info) map.set(info.id, info); // insert/update
                return Array.from(map.values());
              });
            });
          }
        });

        // Ensure removed items disappear from final array
        setData((prev) => prev.filter((i) => ids.includes(i.id)));

        setLoading(false);
      });
    }

    init().catch(setError);

    return () => {
      if (baseUnsub) baseUnsub();
      Object.values(infoUnsubs).forEach((unsub) => unsub());
    };
  }, [firebaseConnection, basePath]);

  return { data, loading, error, setData };
}
