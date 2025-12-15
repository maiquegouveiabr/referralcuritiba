import { OfferItemProps, PersonOffer } from "@/interfaces";
import { fetchChurchServer } from "@/util/api/fetchChurchServer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { refreshToken, offerId, personId, churchId } = await req.json();
    if (!refreshToken || !offerId || !personId || !churchId) {
      return NextResponse.json(null, { statusText: "Missing params", status: 400 });
    }
    const url = `https://referralmanager.churchofjesuschrist.org/services/ad-content/${offerId}`;
    const personOfferUrl = `https://referralmanager.churchofjesuschrist.org/services/offers/person-offers/${personId}`;

    const offer = await fetchChurchServer<OfferItemProps>(url, refreshToken, churchId);
    const personOffers = await fetchChurchServer<PersonOffer[]>(personOfferUrl, refreshToken, churchId);
    if (!offer && !personOffers) {
      return NextResponse.json(null, { statusText: "Church Server Error", status: 500 });
    }

    if (offer) {
      return NextResponse.json({ offer, personOffer: null }, { status: 200 });
    }

    if (personOffers && personOffers.length > 0) {
      return NextResponse.json({ offer: null, personOffer: personOffers[0] }, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(null, { statusText: "Internal Server Error", status: 500 });
  }
}
