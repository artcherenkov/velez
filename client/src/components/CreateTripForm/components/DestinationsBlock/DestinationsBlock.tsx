import React, { useContext } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import Typography from "@mui/material/Typography";
import { LngLat, YMap } from "@yandex/ymaps3-types";

import { YMapsContext } from "../../../../contexts/YMapsContext";
import {
  reorderDestinations,
  selectDestinations,
  selectDestinationsById,
  setActiveInputId,
  setMapLocation,
  setMarkerCoordinates,
  toggleChooseOnMap,
} from "../../../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { DragHandle, DroppableContainer } from "../../../DragAndDrop";
import { DestinationInput } from "../DestinationInput";

export function DestinationsBlock() {
  const dispatch = useAppDispatch();
  const destinations = useAppSelector(selectDestinations);
  const destinationsById = useAppSelector(selectDestinationsById);
  const { mapRef } = useContext(YMapsContext);

  const onChooseOnMapClick = (id: string) => () => {
    const destination = destinationsById[id];
    const [lat, lon] = (mapRef as { current: YMap }).current.center;
    const mapCenterLngLat: LngLat = [lat, lon];
    const markerCoordinates = destination.coordinates || mapCenterLngLat;

    dispatch(setActiveInputId(id));
    dispatch(setMarkerCoordinates(markerCoordinates));
    dispatch(setMapLocation(markerCoordinates));
    dispatch(toggleChooseOnMap(true));
  };
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {};

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
                    id={d.id}
                    placeholder={d.placeholder}
                    value={destinationsById[d.id].coordinates?.toString() || ""}
                    onChange={onChange}
                    onChooseOnMapClick={onChooseOnMapClick(d.id)}
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
