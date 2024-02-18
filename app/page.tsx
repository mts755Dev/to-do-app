import Home from "@/components/pages/home";
import { fetchTodos } from "@/utils";

export default async function Page() {
  const { todos } = await fetchTodos();
  return <Home todos={todos} />;
}
