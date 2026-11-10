import { Box } from "@mui/material";

type SimplePopUpType = {
  description: string;
  name?: string;
  address?: string;
  note?: string;
};

const SimplePopUp = ({
  description,
  name,
  address,
  note = "",
}: SimplePopUpType) => {
  return (
    <Box>
      <Box className="description">{description}</Box>
      {note === "" ? (
        <>
          <Box className="homeName">{name}</Box>
          <Box className="address">{address}</Box>
        </>
      ) : (
        <Box className="note">{note}</Box>
      )}
    </Box>
  );
};

export default SimplePopUp;
