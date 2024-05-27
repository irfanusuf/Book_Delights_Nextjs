"use client";

import React from "react";
import Button from "@mui/material/Button";

const customButton = ({name}) => {
  return (
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
         {name}
    </Button>
  );
};

export default customButton;
