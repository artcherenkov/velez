import React from "react";
import Box from "@mui/material/Box";

import { StrictModeDroppable } from "../StrictModeDroppable";

interface IDroppableContainerProps {
  children: React.ReactNode;
  droppableId: string;
}

export function DroppableContainer({
  children,
  droppableId,
}: IDroppableContainerProps) {
  return (
    <StrictModeDroppable droppableId={droppableId}>
      {(provided) => (
        <Box {...provided.droppableProps} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </Box>
      )}
    </StrictModeDroppable>
  );
}
