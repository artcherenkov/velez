import React from "react";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import {
  ETransportType,
  TransportTypeTitleMap,
} from "../../../../../../types/createTripFormTypes";

interface ITransportTypeSelectProps {
  value: ETransportType;
  onChange(evt: React.MouseEvent<HTMLElement>, value: ETransportType): void;
}

export function TransportTypeSelect({
  value,
  onChange,
}: ITransportTypeSelectProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography>Тип транспорта</Typography>
      <ToggleButtonGroup
        sx={{ mt: 1 }}
        color="primary"
        value={value}
        onChange={onChange}
        exclusive
        aria-label="Transport"
      >
        {Object.values(ETransportType).map((type) => (
          <ToggleButton
            key={`select-${type}`}
            sx={{ fontSize: 12 }}
            size="small"
            value={type}
          >
            {TransportTypeTitleMap[type]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}
