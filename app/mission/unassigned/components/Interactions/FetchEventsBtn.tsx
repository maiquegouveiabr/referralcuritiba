import { Button } from "@mui/material";

type Props = {
  handleClick: () => void;
};

export default function FetchEventsBtn({ handleClick }: Props) {
  return (
    <Button onClick={handleClick} variant="contained">
      Event
    </Button>
  );
}
