import { NextResponse } from "next/server";
import { getFirebaseDatabase } from "@/lib/firebaseClient";
import { ref, get, update } from "firebase/database";

export async function POST(req: Request) {
  try {
    const { id, userId, queueId, firebaseConnection } = await req.json();

    const db = await getFirebaseDatabase(firebaseConnection);

    // 1. Read the full object from current-interactions
    const currentRef = ref(db, `/current-interactions/${userId}/${id}`);
    const currentSnap = await get(currentRef);
    const interaction = currentSnap.val();

    if (!interaction) {
      return NextResponse.json({ error: "NOT_CURRENTLY_ASSIGNED" }, { status: 400 });
    }

    const updates: Record<string, any> = {};

    // 2. Remove from assigned list
    updates[`/current-interactions/${userId}/${id}`] = null;

    // 3. Re-insert into unassigned queue
    updates[`/new-queue-interactions/${queueId}/${id}`] = {
      ...interaction,
      queueId,
    };

    // 4. Reset claim & accept metadata
    updates[`/interactions/${id}/info/claimedByUserCmisId`] = null;
    updates[`/interactions/${id}/info/claimedTimestamp`] = null;
    updates[`/interactions/${id}/info/acceptedByUserCmisId`] = null;
    updates[`/interactions/${id}/info/acceptedTimestamp`] = null;
    updates[`/interactions/${id}/info/users`] = null;

    // Write atomically
    await update(ref(db), updates);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DISCARD ERROR:", err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
