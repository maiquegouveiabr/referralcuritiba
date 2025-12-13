import { OfferItemProps, PersonOffer } from "@/interfaces";
import { Card } from "./ui/card";

const offerRaw = [
  {
    id: "2b5a8aa0-d93b-11ed-afa1-0242ac120002",
    topic: "Missionary Visit—Tabernacle Choir Experience",
    isDefault: false,
    attributes: {
      thingsToConsider: [
        "Ask about their experience listening to music by the Tabernacle Choir",
        "Ask about their beliefs and religious journey",
        "Introduce your purpose and belief in Jesus Christ",
      ],
    },
  },
  {
    id: "bc4f58e2-dd16-4947-bac0-effb6bbdd4fd",
    topic: "Book of Mormon",
    isDefault: false,
    attributes: {
      thingsToConsider: [
        "Ask about their previous exposure to the Book of Mormon and reason for interest",
        "Share some Book of Mormon scriptures that can answer their needs",
      ],
    },
  },
  {
    id: "cb5d8b4b-4d9c-443d-9c15-c39df4722d43",
    topic: "Missionary Visit",
    isDefault: true,
    attributes: {
      thingsToConsider: ["Ask about their beliefs and religious journey", "Introduce your purpose and belief in Jesus Christ"],
    },
  },
  {
    id: "ede5980e-47fb-4183-ad21-cf927668ed57",
    topic: "Baptism",
    isDefault: false,
    attributes: {
      thingsToConsider: ["Ask about their religious background and what they know about baptism", "Consider sharing the story of Jesus Christ's baptism"],
    },
  },
  {
    id: "b0966ee8-a0cc-4226-b252-2271714c34d5",
    topic: "Prayer",
    isDefault: false,
    attributes: {
      thingsToConsider: ["Ask what their experience has been with prayer", "Explain how to pray and how it can help them connect with God"],
    },
  },
  {
    id: "72eb994a-5e07-48d7-9984-5428199e9f11",
    topic: "Scriptures",
    isDefault: false,
    attributes: {
      thingsToConsider: [
        "Ask them about their beliefs in the Bible and familiarity with religious texts",
        "Share some scriptures from the Bible and Book of Mormon that can answer their needs",
      ],
    },
  },
  {
    id: "2c54b042-6c2c-4ed0-927e-2919b627a551",
    topic: "Church Near Me",
    isDefault: false,
    attributes: {
      thingsToConsider: [
        "Ask about their beliefs and past experience with church",
        "Invite them to visit their local church service. Discuss what they should expect",
      ],
    },
  },
  {
    id: "a719f450-c197-450f-8e13-9657ededa40c",
    topic: "Bible",
    isDefault: false,
    attributes: {
      thingsToConsider: [
        "Ask them about their beliefs in the Bible and familiarity with religious texts",
        "Share some scriptures from the Bible that can answer their needs",
      ],
    },
  },
  {
    id: "1830e7b1-903f-453c-8086-00c399dcdeb1",
    topic: "Jesus Christ",
    isDefault: false,
    attributes: {
      thingsToConsider: ["Ask about their beliefs and how they have experienced God's love", "Share how God and Jesus Christ know them personally"],
    },
  },
  {
    id: "4f391df5-7116-4b82-ad53-969c0a63e15a",
    topic: "Family",
    isDefault: false,
    attributes: {
      thingsToConsider: [
        "Ask about their family and religious traditions",
        "Share how the family is central to God's plan and how the principles of the gospel can help bring their family closer together",
      ],
    },
  },
  {
    id: "357ef23d-9799-4008-be67-5d9cbd6f0db3",
    topic: "Forgiveness, Repentance",
    isDefault: false,
    attributes: {
      thingsToConsider: [
        "Ask about their beliefs and experience with Christianity",
        "Share how God and Jesus Christ know them personally and love them",
        "Share how Jesus Christ's sacrifice will help and heal them",
      ],
    },
  },
  {
    id: "352f3880-e231-474c-9414-2347d916c32f",
    topic: "Faith",
    isDefault: false,
    attributes: {
      thingsToConsider: ["Ask about what their faith journey has been so far", "Share how faith in Jesus Christ can improve their life"],
    },
  },
  {
    id: "4250ecf9-cbbc-41ca-b1ab-2901a79c00b2",
    topic: "Easter",
    isDefault: false,
    attributes: {
      thingsToConsider: ["Ask about their experience and traditions with Easter", "Share how Jesus Christ is at the center of Easter and why"],
    },
  },
  {
    id: "cc1d844b-f8fa-4d7f-8683-5eb719d96b11",
    topic: "Purpose of Life",
    isDefault: false,
    attributes: {
      thingsToConsider: ["Ask about their beliefs and how they find purpose in life", "Ask about their faith journey and where it's led them up to this point"],
    },
  },
  {
    id: "79b53721-89b3-4834-afe5-4651f65398b3",
    topic: "Temple Open House",
    isDefault: false,
    attributes: {},
  },
  {
    id: "c22ced95-1178-4286-9895-391e6095305b",
    topic: "Day of the Dead",
    isDefault: false,
    attributes: {
      thingsToConsider: [
        "Ask them about their family and how they remember their ancestors",
        "Ask about their family values and traditions",
        "Share that through Jesus Christ's resurrection we will all live again",
      ],
    },
  },
  {
    id: "c96c4dd3-3f85-4951-8d2a-5eae383fdc41",
    topic: "Temple",
    isDefault: false,
    attributes: {
      thingsToConsider: ["Ask about their familiarity with our temples and their importance", "Share how the temples point us to Jesus Christ"],
    },
  },
  {
    id: "784abca8-52b0-48cc-a0eb-e5764949f278",
    topic: "Prophets",
    isDefault: false,
    attributes: {
      thingsToConsider: ["Ask about their understanding of God's prophets and their role", "Share a quote from the prophet or an apostle that relates to them"],
    },
  },
  {
    id: "a913bef7-81a6-422d-bfad-ea41276c32d9",
    topic: "Christmas",
    isDefault: false,
    attributes: {
      thingsToConsider: [
        "Ask about their familiarity with the Christmas story in the Bible",
        "Share why Christmas can be more meaningful with Jesus Christ at the center",
        "Consider reading Luke 2 or watching The Christ Child with them",
      ],
    },
  },
  {
    id: "ac92a8ac-9612-4f03-b807-2a93bcf43d5e",
    topic: "Joy, Finding Happiness",
    isDefault: false,
    attributes: {
      thingsToConsider: ["Ask them about ways they have been able to find joy", "Share how the gospel of Jesus Christ can increase their joy"],
    },
  },
  {
    id: "bf062182-8967-4869-b2e6-03b12352dcff",
    topic: "God",
    isDefault: false,
    attributes: {
      thingsToConsider: ["Understand the person's concept of God and His influence in the person's life ", "Share how knowing God has helped you in your life"],
    },
  },
  {
    id: "d2cf0903-90e5-4e66-b924-8a89d318284a",
    topic: "Holy Ghost",
    isDefault: false,
    attributes: {
      thingsToConsider: ["Ask about their understanding of the Holy Ghost and His role", "Share how the Holy Ghost has helped you in your life"],
    },
  },
  {
    id: "8abe1a01-fcb8-4fcd-9eb4-4505d4835178",
    topic: "The Church of Jesus Christ of Latter-day Saints",
    isDefault: false,
    attributes: {},
  },
  {
    id: "24dbf736-270d-4529-940d-d6e6d89ac5b8",
    topic: "Review Understanding from Online Lessons",
    isDefault: false,
    attributes: {
      thingsToConsider: [
        "This person viewed online self-guided lessons and is interested in learning more from missionaries",
        "Ask about why they engaged in online lessons, what they learned, and if they have any questions",
      ],
    },
  },
  {
    id: "42800857-d770-4823-96e3-c2007ea34689",
    topic: "Fasting",
    isDefault: false,
    attributes: {
      thingsToConsider: ["Ask them about what their concept of fasting is", 'Share principles from lesson four on "Observe the Law of the Fast"'],
    },
  },
  {
    id: "f92e99d3-06d7-4fb6-896d-64b8f39e1bc1",
    topic: "Sunday School",
    isDefault: false,
    attributes: {
      thingsToConsider: [
        "The requester expressed interest in attending this year’s Sunday School class",
        "Seek to understand what prompted the request to attend Sunday School and help prepare them for the Sunday experience",
      ],
    },
  },
  {
    id: "3d4e9d40-d93c-11ed-afa1-0242ac120002",
    topic: "Church Near Me | Tabernacle Choir Experience",
    isDefault: false,
    attributes: {
      thingsToConsider: [
        "Ask about their experience listening to music by the Tabernacle Choir",
        "Ask about their beliefs and religious journey",
        "Introduce your purpose and belief in Jesus Christ",
      ],
    },
  },
];

type Props = {
  offer: OfferItemProps;
  personOffer: PersonOffer;
};

function OfferComponent({ offer, personOffer }: Props) {
  const personOfferItem = (personOffer && offerRaw.find((item) => item.id === personOffer.formTopicId)) || null;
  return (
    <Card className="max-w-[500px] p-3 mt-1">
      {personOfferItem && (
        <div className="flex flex-col">
          <p className="text-[11px] m-0 text-[var(--font-color)] break-words">
            <span className="font-bold">Requested Lesson Topic:</span> {personOfferItem.topic}
          </p>
          {personOfferItem.attributes.thingsToConsider && personOfferItem.attributes.thingsToConsider.length > 0 && (
            <div className="mt-1">
              <span className="font-bold text-[11px] text-[var(--font-color)]">Things to Consider:</span>
              <ul className="list-disc list-inside">
                {personOfferItem.attributes.thingsToConsider.map((item, index) => (
                  <li key={index} className="text-[11px] text-[var(--font-color)]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {offer && (
        <div className="flex flex-col">
          {offer && offer.campaign_name && (
            <p className="text-[11px] m-0 text-[var(--font-color)] break-words">
              <span className="font-bold">Ad Campaign Name:</span> {offer.campaign_name}
            </p>
          )}
          {offer && offer.ad_group && (
            <p className="text-[11px] m-0 text-[var(--font-color)] break-words">
              <span className="font-bold">Ad Group:</span> {offer.ad_group}
            </p>
          )}
          {offer && offer.ad_text && (
            <p className="text-[11px] m-0 text-[var(--font-color)] break-words">
              <span className="font-bold">Ad Text:</span> {offer.ad_text}
            </p>
          )}
        </div>
      )}
    </Card>
  );
}

export default OfferComponent;
