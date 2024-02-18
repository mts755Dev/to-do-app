import { Grid } from "@mui/material";
import React from "react";
import Note from "../note";
import { useSelector } from "react-redux";
import { todoSelector } from "@/reducers/TodoReducer";

export const Notes = () => {
  const todos: Todo[] = useSelector(todoSelector);

  return (
    <Grid container spacing={4} sx={{ marginTop: "3rem" }}>
      {todos?.map((todo, index) => (
        <Grid item key={index}>
          <Note todo={todo} />
        </Grid>
      ))}
    </Grid>
  );
};
