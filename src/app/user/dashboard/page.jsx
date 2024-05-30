import RecipeReviewCard from "@/components/clientComponents/Card";
import SearchForm from "@/components/clientComponents/SearchForm";
import { Container, Typography } from "@mui/material";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <Container style={{ marginTop: "20px" }}>
        <SearchForm />

        <Typography variant="h3" style={{ textAlign: "center" , marginTop : "20px"}}>
          User Dashboard
        </Typography>

        <RecipeReviewCard  style={{ marginTop: "20px" }} />
      </Container>
    </div>
  );
};

export default Dashboard;
