"use client";

import { Button,  TextField } from "@mui/material";
import React from "react";

const SearchForm = () => {
  const handleSubmit = () => {};

  return (
    <div style={{display : "flex" , justifyContent : "center"}}>
      <TextField id="outlined-basic" label="Search" variant="outlined" style={{marginRight : "10px"}} />
      <Button onSubmit={handleSubmit} variant="contained">
        Search{" "}
      </Button>
    </div>
  );
};

export default SearchForm;
