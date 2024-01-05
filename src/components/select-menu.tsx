import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type TableType } from "@/types/type";

interface SelectMenuProps {
  value: TableType;
  onChange: (newValue: TableType) => void;
}

const selectOptions = [
  { value: "sailors", label: "Sailors" },
  { value: "boats", label: "Boats" },
  { value: "reserves", label: "Reserves" },
];

export default function SelectMenu({ value, onChange }: SelectMenuProps) {
  return (
    <Select defaultValue={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Table" />
      </SelectTrigger>
      <SelectContent>
        {selectOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
