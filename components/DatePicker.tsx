import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as Picker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { Button } from "./ui/button";
import { X } from "lucide-react";

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
      <div className="flex items-center gap-2">
        <Picker
          value={value}
          onChange={handleDateChange}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              size: "small",
              variant: "outlined",
              style: { width: "180px" },
              sx: {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#ffffff",
                  height: "40px",
                  "& fieldset": {
                    borderColor: "#d1d5db",
                  },
                  "&:hover fieldset": {
                    borderColor: "#9ca3af",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2563eb",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "8px 12px",
                  fontSize: "14px",
                  color: "#1f2937",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#9ca3af",
                  opacity: 1,
                },
              },
            },
            popper: {
              placement: "bottom-start",
            },
          }}
        />
        <Button onClick={onClear} variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-100 px-3 flex items-center gap-1">
          <X size={16} />
          Clear
        </Button>
      </div>
    </LocalizationProvider>
  );
}

export default DatePicker;
