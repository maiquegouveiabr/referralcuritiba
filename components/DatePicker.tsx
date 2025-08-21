import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as Picker } from "@mui/x-date-pickers/DatePicker";
import styles from "@/components/styles/DatePicker.module.css";
import { Dayjs } from "dayjs";
import { Button } from "./ui/button";

interface DatePickerProps {
  onClear: () => void;
  onDateChange: (date: Dayjs | null) => void;

  value: Dayjs | null;
}

function DatePicker({ onClear, onDateChange, value }: DatePickerProps) {
  const handleDateChange = (newValue: Dayjs | null) => {
    onDateChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.picker_container}>
        <Picker
          value={value}
          onChange={handleDateChange}
          label="Filter by date"
          format="D/M/YYYY"
          slotProps={{
            textField: { size: "small", focused: true, color: "secondary", style: { width: "fit-content" } },
          }}
        />
        <Button
          className="cursor-pointer rounded-sm text-white bg-[var(--header-button)] hover:bg-[var(--header-button)] hover:text-[#FFFFFF] p-3 mt-3"
          onClick={onClear}
          variant="ghost"
        >
          Clear
        </Button>
      </div>
    </LocalizationProvider>
  );
}

export default DatePicker;
