import { NextResponse } from "next/server";
import { getFirebaseDatabase } from "@/lib/firebaseClient";
import { ref, get, update } from "firebase/database";

export async function POST(req: Request) {
  try {
    const { id, userId, queueId, firebaseConnection } = await req.json();

    const db = await getFirebaseDatabase(firebaseConnection);

    // 1. Read the FULL interaction from the queue
    const queueRef = ref(db, `/new-queue-interactions/${queueId}/${id}`);
    const queueSnap = await get(queueRef);
    const queueValue = queueSnap.val();

    if (!queueValue) {
      return NextResponse.json({ error: "INTERACTION_NOT_FOUND" }, { status: 404 });
    }

    // 2. Build the update bundle
    const updates: Record<string, any> = {};

    // Remove from unassigned
    updates[`/new-queue-interactions/${queueId}/${id}`] = null;

    // Move full object to current-interactions
    updates[`/current-interactions/${userId}/${id}`] = {
      ...queueValue,
      queueId,
      claimedByUserCmisId: userId,
    };

    // Update info
    updates[`/interactions/${id}/info/claimedByUserCmisId`] = userId;
    updates[`/interactions/${id}/info/claimedTimestamp`] = { ".sv": "timestamp" };

    // 3. Write atomically
    await update(ref(db), updates);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
