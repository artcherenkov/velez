import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export function MainInfoBlock() {
  return (
    <>
      <Typography variant="h5" component="h2" mb={2}>
        Общая информация
      </Typography>
      <TextField
        size="medium"
        fullWidth
        multiline
        maxRows={3}
        label="Название"
      />
      <TextField
        size="small"
        fullWidth
        sx={{ my: 2 }}
        multiline
        minRows={4}
        maxRows={10}
        label="Расскажите о путешествии"
      />
    </>
  );
}
