export const ITEMS_PER_PAGE = 10;

export const getVisibleColumns = (filterBy) => {
  if (filterBy === "gender") return ["ID", "Name", "Gender"];
  if (filterBy === "department") return ["ID", "Name", "Department"];
  if (filterBy === "hair") return ["ID", "Name", "Hair Color"];
  return ["ID", "Name", "Email", "Gender", "Hair Color", "Department"];
};

export const renderBadge = (text, type, darkMode = true) => {
  const base = "px-2 py-1 rounded-full text-xs font-medium";
  switch (type) {
    case "gender":
      return text === "male" ? (
        <span className={`${base} ${darkMode ? "bg-blue-900 text-blue-300" : "bg-blue-200 text-blue-800"}`}>male</span>
      ) : (
        <span className={`${base} ${darkMode ? "bg-pink-900 text-pink-300" : "bg-pink-200 text-pink-800"}`}>female</span>
      );
    case "hair":
      return (
        <span className={`${base} flex items-center gap-2 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
          <span className="w-3 h-3 rounded-full border" style={{ backgroundColor: text.toLowerCase() }}></span>
          {text}
        </span>
      );
    case "department":
      return <span className={`${base} ${darkMode ? "bg-purple-900 text-purple-300" : "bg-purple-200 text-purple-800"}`}>{text}</span>;
    default:
      return text;
  }
};

export const renderCell = (u, col, darkMode = true) => {
  switch (col) {
    case "ID": return u.id;
    case "Name":
      return (
        <div className="flex flex-col">
          <span className="font-medium">{u.firstName} {u.lastName}</span>
          <span className="text-xs text-gray-400">@{u.username}</span>
        </div>
      );
    case "Email": return <span className="text-sm">{u.email}</span>;
    case "Gender": return renderBadge(u.gender, "gender", darkMode);
    case "Hair Color": return renderBadge(u.hair?.color || "-", "hair", darkMode);
    case "Department": return renderBadge(u.company?.department || "-", "department", darkMode);
    default: return "-";
  }
};
