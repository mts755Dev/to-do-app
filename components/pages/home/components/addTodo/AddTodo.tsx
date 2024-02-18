"use client";

import { addTodo } from "@/reducers/TodoReducer";
import { Send } from "@mui/icons-material";
import { Container, FormControl, IconButton, Input } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const AddTodo = () => {
  const [todo, settodo] = useState({
    completed: false,
    userId: 5,
    todo: "",
  });

  const dispatch = useDispatch();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    settodo({ ...todo, todo: e.target.value });
  };

  const addNotesHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/todos/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(todo),
        }
      );

      if (!response.ok) throw new Error("Unable to add todo");

      const data = await response.json();

      dispatch(addTodo(data));

      settodo({ ...todo, todo: "" });
    } catch (error) {}
  };

  return (
    <form onSubmit={addNotesHandler}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormControl
          sx={{
            marginTop: "1rem",
            width: "70%",
            fontSize: "2rem",
          }}
        >
          <Input
            onChange={changeHandler}
            value={todo.todo}
            type="text"
            placeholder="Add a note..."
          />
        </FormControl>
        <IconButton type="submit">
          <Send color="primary" fontSize="large" />
        </IconButton>
      </Container>
    </form>
  );
};
