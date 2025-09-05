const API_URL = "https://dummyjson.com";

export async function fetchUserDetail(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch user detail");
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
export async function getUsers(limit = 50, skip = 0) {
  const res = await fetch(`${API_URL}/users?limit=${limit}&skip=${skip}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getUserById(id) {
  const res = await fetch(`${API_URL}/users/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function getUserTodos(id) {
  const res = await fetch(`${API_URL}/todos/user/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}


export async function getUserCarts(id) {
  const res = await fetch(`${API_URL}/carts/user/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch carts");
  return res.json();
}



export async function getUserPosts(id) {
  const res = await fetch(`${API_URL}/users/${id}/posts`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}