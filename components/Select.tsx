import { memo, useMemo } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  onChange: (id: number) => void;
  defaultValue?: string;
  placeholder?: string;
  selectLabel?: string;
  data: {
    id: string | number;
    name: string;
  }[];
};

const Item = ({ data, placeholder, selectLabel, defaultValue, onChange }: Props) => {
  // Memoize the items to avoid remapping on every render
  const selectItems = useMemo(() => {
    return data.map((item) => (
      <SelectItem key={item.id} value={String(item.id)}>
        {item.name}
      </SelectItem>
    ));
  }, [data]);

  return (
    <Select defaultValue={defaultValue} onValueChange={(value) => onChange(Number(value))}>
      <SelectTrigger className="max-w-[200px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectGroup>
          {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
          {selectItems}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default memo(Item);
