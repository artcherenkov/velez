import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { blueGrey, grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { LngLat } from "@yandex/ymaps3-types";

import { ChooseOnMapForm } from "../../components/ChooseOnMapForm";
import { BusIcon } from "../../icons/BusIcon";
import { CarIcon } from "../../icons/CarIcon";
import { LightningIcon } from "../../icons/LightningIcon";
import { RubleIcon } from "../../icons/RubleIcon";
import { WalkerIcon } from "../../icons/WalkerIcon";
import {
  selectDestinations,
  selectTrips,
  setLineString,
  togglePlacesPreview,
  TTrip,
} from "../../redux/appSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ETransportType } from "../../types/createTripFormTypes";

interface ITrip {
  trip: TTrip;
}

const getIcon = (type: ETransportType) => {
  if (type === ETransportType.ON_FOOT) {
    return <WalkerIcon size={32} fill={blueGrey["700"]} />;
  } else if (type === ETransportType.CAR) {
    return <CarIcon size={32} fill={blueGrey["700"]} />;
  } else if (type === ETransportType.PUBLIC_TRANSPORT) {
    return <BusIcon size={32} fill={blueGrey["700"]} />;
  }
};

const fetchRoute = async (coordinates: LngLat[]) => {
  const res = await fetch(
    "https://graphhopper.com/api/1/route?key=f2b4cb43-64dd-46f5-94a5-3212fdbbd65e",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        points: coordinates,
        snap_preventions: ["motorway", "ferry", "tunnel"],
        details: ["road_class", "surface"],
        profile: "car",
        locale: "ru",
        instructions: true,
        calc_points: true,
        points_encoded: false,
      }),
    },
  );

  const response = await res.json();
  return response.paths[0].points;
};

const Trip = ({ trip }: ITrip) => {
  const destinations = useAppSelector(selectDestinations);
  const dispatch = useAppDispatch();

  const filteredDestinations = destinations.filter(
    (d) => d.coordinates && d.coordinates[0] !== 0 && d.coordinates[1] !== 0,
  );

  return (
    <>
      <Box p={2} sx={{ background: "#fff", borderRadius: 3 }} boxShadow={1}>
        <Typography
          variant="h6"
          fontWeight={600}
          lineHeight="140%"
          color={grey["800"]}
        >
          {trip.title}
        </Typography>
        <Typography
          mt={1}
          variant="subtitle1"
          color={grey["400"]}
          fontWeight={500}
          lineHeight="140%"
        >
          Санкт-Петербург
        </Typography>
        <Box mt={2} display="flex" alignItems="center" gap={1.5}>
          <Box display="flex" alignItems="center">
            {getIcon(trip.transportType as ETransportType)}
          </Box>
          <Box display="flex" alignItems="center">
            <Box display="flex" alignItems="center">
              <LightningIcon
                size={30}
                fill={trip.difficulty >= 1 ? blueGrey["700"] : blueGrey["200"]}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <LightningIcon
                size={30}
                fill={trip.difficulty >= 2 ? blueGrey["700"] : blueGrey["200"]}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <LightningIcon
                size={30}
                fill={trip.difficulty >= 3 ? blueGrey["700"] : blueGrey["200"]}
              />
            </Box>
          </Box>
          <Box display="flex">
            <Box display="flex" alignItems="center" mr={-0.5}>
              <RubleIcon
                size={28}
                fill={trip.price >= 1 ? blueGrey["700"] : blueGrey["200"]}
              />
            </Box>
            <Box display="flex" alignItems="center" mr={-0.5}>
              <RubleIcon
                size={28}
                fill={trip.price >= 2 ? blueGrey["700"] : blueGrey["200"]}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <RubleIcon
                size={28}
                fill={trip.price >= 3 ? blueGrey["700"] : blueGrey["200"]}
              />
            </Box>
          </Box>
          <Box ml="auto">
            <Button
              variant="contained"
              size="small"
              onClick={async () => {
                const coordinates: LngLat[] = filteredDestinations.map(
                  (d) => d.coordinates!,
                );
                const lineString = await fetchRoute(coordinates);
                dispatch(setLineString(lineString));
                dispatch(togglePlacesPreview(true));
              }}
            >
              На карте
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export const TripsPageContainer = () => {
  const trips = useAppSelector(selectTrips);

  return (
    <>
      <Box
        p={2}
        sx={{
          background: grey["200"],
          minHeight: "100%",
          position: "relative",
        }}
        display="flex"
        flexDirection="column"
        overflow="scroll"
        gap={2}
      >
        {trips.map((trip) => (
          <Trip trip={trip} />
        ))}
        <Box width="100%" p={2} sx={{ position: "sticky", bottom: 0, left: 0 }}>
          <NavLink to="/create">
            <Button size="large" variant="contained" fullWidth>
              Создать новое путешествие
            </Button>
          </NavLink>
        </Box>
      </Box>
      <ChooseOnMapForm />
    </>
  );
};
