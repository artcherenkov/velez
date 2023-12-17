import React, { useContext, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { LngLat, YMap } from "@yandex/ymaps3-types";
import { nanoid } from "nanoid";

import { YMapsContext } from "../../../../contexts/YMapsContext";
import {
  reorderDestinations,
  selectActiveInputId,
  selectDestinations,
  selectDestinationsById,
  selectSuggestions,
  setActiveInputId,
  setActiveInputValue,
  setAddress,
  setDestinationCoords,
  setMapLocation,
  setMarkerCoordinates,
  setPreviewInputValue,
  setSuggestions,
  toggleChooseOnMap,
} from "../../../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { DragHandle, DroppableContainer } from "../../../DragAndDrop";
import { asyncDebounce, getCoordinateByUri } from "../../../Map";
import { DestinationSuggest } from "../DestinationInput";

export const fetchSuggestions = asyncDebounce(async (string: string) => {
  const res = await fetch(
    `https://suggest-maps.yandex.ru/v1/suggest?apikey=561f0e28-2ce9-4c47-99ae-e5d09906007f&text=${string}&attrs=uri`,
  );

  const json = await res.json();

  return json.results ?? [];
}, 1000);

export type TPlace = {
  id: string;
  title: string;
  subtitle: string;
  uri: string;
};

export function DestinationsBlock() {
  const dispatch = useAppDispatch();
  const destinations = useAppSelector(selectDestinations);
  const destinationsById = useAppSelector(selectDestinationsById);
  const { mapRef } = useContext(YMapsContext);

  const suggestions = useAppSelector(selectSuggestions);

  const [loading, setLoading] = useState(false);
  const activeInputId = useAppSelector(selectActiveInputId);

  const onClose = () => {
    dispatch(setSuggestions([]));
    dispatch(setActiveInputId(null));
  };

  const onChooseOnMapClick = (id: string) => () => {
    const destination = destinationsById[id];
    const [lat, lon] = (mapRef as { current: YMap }).current.center;
    const mapCenterLngLat: LngLat = [lat, lon];
    const markerCoordinates = destination.coordinates || mapCenterLngLat;

    dispatch(setActiveInputId(id));
    dispatch(setMarkerCoordinates(markerCoordinates));
    dispatch(setAddress(destination.value));
    dispatch(
      setMapLocation({
        center: markerCoordinates,
        zoom: destination.coordinates ? 16 : 12,
      }),
    );
    dispatch(setPreviewInputValue(destination.value || ""));
    dispatch(toggleChooseOnMap(true));
  };
  const onInputChange = async (
    event: React.SyntheticEvent,
    value: string,
    reason: string,
  ) => {
    if (reason === "reset") {
      return;
    }
    dispatch(setActiveInputValue(value));
    dispatch(setSuggestions([]));
    setLoading(true);
    const suggestions = await fetchSuggestions(value);
    const preparedOptions: TPlace[] = suggestions.map((sug: any) => ({
      id: nanoid(),
      title: sug.title.text,
      subtitle: sug.subtitle.text,
      uri: sug.uri,
    }));

    dispatch(setSuggestions(preparedOptions));
    setLoading(false);
  };
  const onOptionChange = async (
    event: React.SyntheticEvent,
    value: TPlace | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<TPlace>,
  ) => {
    if (!value) {
      return;
    }
    dispatch(setActiveInputValue(value?.title || ""));

    const decoded: { pos: string } = await getCoordinateByUri(value?.uri);
    const lngLat: LngLat = decoded.pos
      .split(" ")
      .map((coord) => Number(coord)) as [number, number];
    dispatch(setDestinationCoords({ lngLat, id: activeInputId || "" }));
    dispatch(setSuggestions([]));
    dispatch(setActiveInputId(null));
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
                  <DestinationSuggest
                    id={d.id}
                    placeholder={d.placeholder}
                    value={destinationsById[d.id].value}
                    loading={loading}
                    onInputChange={onInputChange}
                    options={suggestions}
                    onOptionChange={onOptionChange}
                    onFocus={onFocus(d.id)}
                    onClose={onClose}
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
