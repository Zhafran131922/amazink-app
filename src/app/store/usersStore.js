import { create } from "zustand";

export const useUsersStore = create((set, get) => ({
  users: [],
  allUsers: [],
  currentPage: 1,
  query: "",
  filterBy: "",
  filterValue: "",
  darkMode: true,

  setUsers: (users, allUsers) => set({ users, allUsers }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setQuery: (q) => set({ query: q, currentPage: 1 }),
  setFilterBy: (by) => set({ filterBy: by, filterValue: "", currentPage: 1 }),
  setFilterValue: (val) => set({ filterValue: val, currentPage: 1 }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  getFilteredUsers: () => {
    const { users, query, filterBy, filterValue } = get();
    let filtered = [...users];

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.firstName.toLowerCase().includes(q) ||
          u.lastName.toLowerCase().includes(q) ||
          u.username.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }

    if (filterBy && filterValue) {
      filtered = filtered.filter((u) => {
        if (filterBy === "gender") return u.gender?.toLowerCase() === filterValue.toLowerCase();
        if (filterBy === "department") return u.company?.department?.toLowerCase() === filterValue.toLowerCase();
        if (filterBy === "hair") return u.hair?.color?.toLowerCase() === filterValue.toLowerCase();
        return true;
      });
    }

    return filtered;
  },

  getFilterValues: () => {
    const { allUsers, filterBy } = get();
    if (!filterBy) return [];
    const vals = allUsers.map((u) => {
      if (filterBy === "gender") return u.gender;
      if (filterBy === "department") return u.company?.department;
      if (filterBy === "hair") return u.hair?.color;
      return null;
    });
    return Array.from(new Set(vals.filter(Boolean)));
  },
}));
