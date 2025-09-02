import UsersTable from "./UsersTable";

export default async function UsersPage() {
  // Ambil data users dari API (SSR)
  const resUsers = await fetch("https://dummyjson.com/users?limit=50", {
    cache: "no-store", // agar selalu SSR
  });
  const dataUsers = await resUsers.json();

  const resAllUsers = await fetch("https://dummyjson.com/users?limit=100", {
    cache: "no-store",
  });
  const allDataUsers = await resAllUsers.json();

  // Kirim data ke client component
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      {/* Full Width UsersTable */}
      <UsersTable
        initialUsers={dataUsers.users}
        allUsers={allDataUsers.users}
      />
    </div>
  );
}
