export const fetchTodos = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/todos`
    );

    const data = await response.json();
    return data;
  } catch (error) {}
};
