"use client";

export default function Pagination({ totalPages, currentPage, setCurrentPage, darkMode = false }) {
  if (!totalPages || totalPages <= 1) return null;

  const maxButtons = 9;
  let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let end = start + maxButtons - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxButtons + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);

  const baseButton = `w-9 h-9 rounded-md flex items-center justify-center transition`;
  const activeButton = darkMode
    ? "bg-indigo-600 text-white"
    : "bg-indigo-600 text-white";
  const inactiveButton = darkMode
    ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
    : "bg-gray-200 text-gray-800 hover:bg-gray-300";

  const arrowButton = darkMode
    ? "px-3 py-1 rounded-md bg-gray-800 text-gray-400 disabled:opacity-40"
    : "px-3 py-1 rounded-md bg-gray-200 text-gray-600 disabled:opacity-40";

  const ellipsisClass = darkMode ? "px-2 text-gray-500" : "px-2 text-gray-600";

  return (
    <div className="flex items-center gap-2 mt-6 flex-wrap justify-center">
      <button
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className={arrowButton}
      >
        ← Prev
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => setCurrentPage(1)}
            className={`${baseButton} ${inactiveButton}`}
          >
            1
          </button>
          {start > 2 && <div className={ellipsisClass}>…</div>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setCurrentPage(p)}
          className={`${baseButton} ${p === currentPage ? activeButton : inactiveButton}`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <div className={ellipsisClass}>…</div>}
          <button
            onClick={() => setCurrentPage(totalPages)}
            className={`${baseButton} ${inactiveButton}`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className={arrowButton}
      >
        Next →
      </button>
    </div>
  );
}
