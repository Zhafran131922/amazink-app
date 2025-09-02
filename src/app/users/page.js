import UsersTable from "./UsersTable";
import { getUsers } from "../../../lib/api/users";

export default async function UsersPage() {
  // Ambil data users dari helper API
  const dataUsers = await getUsers(50);
  const allDataUsers = await getUsers(100);

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <UsersTable initialUsers={dataUsers.users} allUsers={allDataUsers.users} />
    </div>
  );
}
