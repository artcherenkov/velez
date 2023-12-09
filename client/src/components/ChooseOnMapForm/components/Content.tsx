import React from "react";
import Box from "@mui/material/Box";

interface IContentProps {
  children: React.ReactNode;
}

export function Content({ children }: IContentProps) {
  return (
    <Box position="relative" px={3} py={2} boxShadow={5}>
      {children}
    </Box>
  );
}
