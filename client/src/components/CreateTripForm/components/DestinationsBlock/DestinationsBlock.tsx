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
  setActiveInputValue,
  setMapLocation,
  setMarkerCoordinates,
  toggleChooseOnMap,
} from "../../../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { DragHandle, DroppableContainer } from "../../../DragAndDrop";
import { asyncDebounce } from "../../../Map";
import { DestinationInput } from "../DestinationInput";

export const fetchSuggestions = asyncDebounce(async (string: string) => {
  const res = await fetch(
    `https://suggest-maps.yandex.ru/v1/suggest?apikey=561f0e28-2ce9-4c47-99ae-e5d09906007f&text=${string}`,
  );

  const { response } = await res.json();
  console.log(response);
}, 1000);

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
  const onChange = async (string: string) => {
    dispatch(setActiveInputValue(string));
    // await fetchSuggestions(string);
  };

  const onFocus = (id: string) => () => {
    dispatch(setActiveInputId(id));
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
                    id={d.id}
                    placeholder={d.placeholder}
                    value={destinationsById[d.id].value}
                    onChange={onChange}
                    onFocus={onFocus(d.id)}
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
