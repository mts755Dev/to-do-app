"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  IconButton,
  Input,
} from "@mui/material";
import { DeleteForever, EditNote } from "@mui/icons-material";
import { deleteTodo, editTodo } from "@/reducers/TodoReducer";
import { useDispatch } from "react-redux";

type Props = {
  todo: Todo;
};

export const Note = ({ todo }: Props) => {
  const [edit, setedit] = useState(false);
  const [todoValue, settodoValue] = useState(todo);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/todos/1`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Unable to delete a todo");

      dispatch(deleteTodo(todo.id));
    } catch (error) {}
  };
  const handleEdit = async (e: any) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API}/todos/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todoValue, id: 1 }),
      });
      dispatch(
        editTodo({
          id: todo.id,
          todo: todoValue.todo,
        })
      );
      setedit(!edit);
    } catch (error) {}
  };
  return (
    <Card>
      {!edit ? (
        <CardContent>{todoValue.todo}</CardContent>
      ) : (
        <form onSubmit={handleEdit}>
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
                value={todoValue.todo}
                onChange={(e) =>
                  settodoValue({ ...todoValue, todo: e.target.value })
                }
                type="text"
                placeholder="Add a note..."
              />
            </FormControl>
            <Button type="submit">Save</Button>
          </Container>
        </form>
      )}
      <Container sx={{ display: "flex", alignContent: "flex-end" }}>
        <IconButton onClick={() => setedit(!edit)}>
          <EditNote />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteForever />
        </IconButton>
      </Container>
    </Card>
  );
};
