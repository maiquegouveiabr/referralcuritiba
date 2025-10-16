import { Card, CardDescription } from "./ui/card";

type PhoneItemProps = {
  area_name: string;
  id: string;
  name: string;
  other: string;
  phone: string;
};

type PhoneMatchList = {
  matches: PhoneItemProps[];
};

function PhoneItem({ area_name, id, name, other, phone }: PhoneItemProps) {
  return (
    <div className="bg-yellow-800 p-2 rounded">
      <CardDescription className="text-white">
        <a href={`https://referralmanager.churchofjesuschrist.org/person/${id}`} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </CardDescription>
      <CardDescription className="text-white">{phone}</CardDescription>
      <CardDescription className="text-white">{area_name}</CardDescription>
      {other && <CardDescription className="text-white">{other}</CardDescription>}
    </div>
  );
}

function PhoneMatchList({ matches }: PhoneMatchList) {
  return (
    <Card className="w-fit p-3 bg-[var(--header)]">
      <div className="flex flex-col gap-1">
        <CardDescription className="leading-tight font-semibold text-white mb-1">Possible Matches</CardDescription>
        {matches.map(
          (item, index) =>
            index <= 2 && <PhoneItem key={item.id} area_name={item.area_name} id={item.id} name={item.name} other={item.other} phone={item.phone} />
        )}
      </div>
    </Card>
  );
}

export default PhoneMatchList;
