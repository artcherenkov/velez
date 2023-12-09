import React from "react";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import IconButton from "@mui/material/IconButton";

interface IBackButtonProps {
  onClick(): void;
}

export function BackButton({ onClick }: IBackButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      sx={{ position: "absolute", alignSelf: "center", left: 8 }}
    >
      <ArrowBackIosNewRoundedIcon />
    </IconButton>
  );
}
