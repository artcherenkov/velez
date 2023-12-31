import React from "react";
import Box from "@mui/material/Box";
import { deepPurple } from "@mui/material/colors";
import Rating, { IconContainerProps } from "@mui/material/Rating";

import { LightningIcon } from "../../../../../../icons/LightningIcon";
import { RadioSelectContainer } from "../RadioSelectContainer";

function LightningIconContainer(props: IconContainerProps) {
  return <Box {...props} />;
}

interface IDifficultySelectProps {
  value: number;
  onChange(evt: React.SyntheticEvent, value?: number | null): void;
}

export function DifficultySelect({ value, onChange }: IDifficultySelectProps) {
  return (
    <RadioSelectContainer label="Сложность">
      <Rating
        sx={{ mt: 1, display: "flex", gap: 1 }}
        max={3}
        icon={<LightningIcon size={36} fill={deepPurple.A400} />}
        emptyIcon={<LightningIcon size={36} fill={deepPurple["50"]} />}
        IconContainerComponent={LightningIconContainer}
        value={value}
        onChange={onChange}
      />
    </RadioSelectContainer>
  );
}
