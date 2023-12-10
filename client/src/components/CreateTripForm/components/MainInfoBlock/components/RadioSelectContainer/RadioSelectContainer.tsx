import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface IRadioSelectContainerProps {
  label: string;
  children: React.ReactNode;
}

export function RadioSelectContainer(props: IRadioSelectContainerProps) {
  const { label, children } = props;
  return (
    <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center">
      <Typography component="legend" textAlign="center">
        {label}
      </Typography>
      {children}
    </Box>
  );
}
