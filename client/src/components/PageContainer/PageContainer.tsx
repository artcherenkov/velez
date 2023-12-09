import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { toggleChooseOnMap } from "../../redux/appSlice";
import { useAppDispatch } from "../../redux/hooks";
import { ChooseOnMapForm } from "../ChooseOnMapForm";
import { CreateTripForm } from "../CreateTripForm";

import styles from "./PageContainer.module.css";

function TestButton() {
  const dispatch = useAppDispatch();
  const onChooseOnMapOpen = () => dispatch(toggleChooseOnMap(true));

  return (
    <Box
      position="absolute"
      width="100%"
      bottom={16}
      display="flex"
      justifyContent="center"
    >
      <Button onClick={onChooseOnMapOpen} variant="contained">
        Открыть форму выбора пункта на карте
      </Button>
    </Box>
  );
}

export function PageContainer() {
  return (
    <div className={styles.root}>
      <TestButton />
      <ChooseOnMapForm />
      <CreateTripForm />
    </div>
  );
}
