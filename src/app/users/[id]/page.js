import { getUserById, getUserTodos, getUserCarts, getUserPosts } from "../../../../lib/api/users";
import UserDetailClient from "./UserDetailClient";

export default async function UserDetailPage({ params }) {
  const user = await getUserById(params.id);
  const todos = await getUserTodos(params.id);
  const carts = await getUserCarts(params.id);
  const posts = await getUserPosts(params.id);

  return (
    <UserDetailClient user={user} todos={todos} carts={carts} posts={posts} />
  );
}
