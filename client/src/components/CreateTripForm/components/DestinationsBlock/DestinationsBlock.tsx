import React from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import Typography from "@mui/material/Typography";

import {
  reorderDestinations,
  selectDestinations,
  toggleChooseOnMap,
} from "../../../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { DragHandle, DroppableContainer } from "../../../DragAndDrop";
import { DestinationInput } from "../DestinationInput";

export function DestinationsBlock() {
  const dispatch = useAppDispatch();
  const destinations = useAppSelector(selectDestinations);

  const onChooseOnMapClick = () => {
    dispatch(toggleChooseOnMap(true));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    dispatch(reorderDestinations({ startIndex, endIndex }));
  };

  return (
    <>
      <Typography variant="h5" component="h2" mb={2}>
        Маршрут
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <DroppableContainer droppableId="droppable">
          {destinations.map((d, idx) => (
            <Draggable key={d.id} draggableId={d.id} index={idx}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  style={provided.draggableProps.style}
                >
                  <DestinationInput
                    placeholder={d.placeholder}
                    onChooseOnMapClick={onChooseOnMapClick}
                    dragHandle={
                      <DragHandle dragHandleProps={provided.dragHandleProps} />
                    }
                  />
                </div>
              )}
            </Draggable>
          ))}
        </DroppableContainer>
      </DragDropContext>
    </>
  );
}
