import React from "react";
import Typography from "@mui/material/Typography";

interface ITitleProps {
  children: string;
}

export function Title({ children }: ITitleProps) {
  return (
    <Typography variant="h6" textAlign="center" flexGrow={1} fontWeight={700}>
      {children}
    </Typography>
  );
}
