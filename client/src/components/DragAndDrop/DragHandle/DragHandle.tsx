import React from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import Box from "@mui/material/Box";

import styles from "./DragHandle.module.css";

interface IDragHandleProps {
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

export function DragHandle({ dragHandleProps }: IDragHandleProps) {
  return (
    <Box className={styles.dragHandleContainer} {...dragHandleProps}>
      <DragIndicatorRoundedIcon />
    </Box>
  );
}
