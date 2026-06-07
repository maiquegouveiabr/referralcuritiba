import { AreaInfo } from "@/interfaces";
import { fetchChurchServer } from "@/util/api/fetchChurchServer";
import { NextResponse } from "next/server";

type BodyProps = {
  address: string;
  refreshToken: string;
};

export async function POST(req: Request) {
  try {
    const { address, refreshToken }: BodyProps = await req.json();

    if (!address || !refreshToken) {
      throw new Error("MISSING_PARAMS");
    }

    const assignment = await fetchChurchServer<AreaInfo>(
      `https://referralmanager.churchofjesuschrist.org/services/mission/assignment?address=${address}`,
      refreshToken,
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
