import React from "react";
import { deepOrange } from "@mui/material/colors";
import Rating from "@mui/material/Rating";

import { RubleIcon } from "../../../../../../icons/RubleIcon";
import { RadioSelectContainer } from "../RadioSelectContainer";

interface IPriceSelectProps {
  value: number;
  onChange(evt: React.SyntheticEvent, value?: number | null): void;
}

export function PriceSelect({ value, onChange }: IPriceSelectProps) {
  return (
    <RadioSelectContainer label="Стоимость">
      <Rating
        sx={{ mt: 1 }}
        max={3}
        icon={<RubleIcon size={36} fill={deepOrange["800"]} />}
        emptyIcon={<RubleIcon size={36} fill={deepOrange["50"]} />}
        value={value}
        onChange={onChange}
      />
    </RadioSelectContainer>
  );
}
