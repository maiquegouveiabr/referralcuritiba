import { AreaInfo } from "@/interfaces";
import { fetchChurchServer } from "@/util/api/fetchChurchServer";
import { NextResponse } from "next/server";

type BodyProps = {
  address: string;
  refreshToken: string;
  churchId: string;
};

export async function POST(req: Request) {
  try {
    const { address, refreshToken, churchId }: BodyProps = await req.json();

    if (!address || !refreshToken || !churchId) {
      throw new Error("MISSING_PARAMS");
    }

    const assignment = await fetchChurchServer<AreaInfo>(
      `https://referralmanager.churchofjesuschrist.org/services/mission/assignment?address=${address}`,
      refreshToken,
      churchId
    );

    if (assignment) {
      return NextResponse.json(assignment, { status: 200 });
    } else {
      throw new Error("FETCH_ASSIGNMENT_ERROR");
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { statusText: "Internal Server Error", status: 500 });
  }
}
