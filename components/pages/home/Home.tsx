"use client";
import { Container, Typography } from "@mui/material";
import AddTodo from "./components/addTodo";
import Notes from "@/components/shared/notes";
import { useEffect } from "react";
import { setTodos } from "@/reducers/TodoReducer";
import { useDispatch } from "react-redux";

type Props = {
  todos: Todo[];
};

export const Home = ({ todos }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTodos(todos));
  }, [todos, dispatch]);

  return (
    <Container
      sx={{
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h1">To-do App</Typography>
      <Typography variant="h4" sx={{ marginTop: "1rem" }}>
        Start adding your notes ....
      </Typography>

      <AddTodo />

      <Notes />
    </Container>
  );
};
