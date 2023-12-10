import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";

import { ChooseOnMapForm } from "../../components/ChooseOnMapForm";
import { CreateTripForm } from "../../components/CreateTripForm";

export function CreateTripPageContainer() {
  return (
    <Box height="100%">
      <Typography sx={visuallyHidden} component="h1">
        Создайте новое путешествие
      </Typography>
      <CreateTripForm />
      <ChooseOnMapForm />
    </Box>
  );
}
