import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import "./Table.css";
import exportToExcel from "../download_Func/exportToExcel";

const Table = () => {
  const tableData = useSelector((state) => state.table.data) || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });

  //* Global Search and Sort
  const filteredData = useMemo(() => {
    let result = tableData.filter((item) =>
      Object.values(item).some(
        (val) =>
          val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    //* Sorting

    if (sortConfig.key !== null) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
      });
    }
    return result;
  }, [searchTerm, tableData, sortConfig]);

  //* Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="table-container">
      <h2>User Table</h2>
      <div className="table-control">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search.."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button
          className="download-btn"
          onClick={() => exportToExcel(filteredData)}
        >
          ⬇️ Download Excel
        </button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                ID{" "}
                {sortConfig.key === "id"
                  ? sortConfig.direction === "asc"
                    ? "⬆️"
                    : "⬇️"
                  : ""}
              </th>
              <th onClick={() => handleSort("name")}>
                NAME{" "}
                {sortConfig.key === "name"
                  ? sortConfig.direction === "asc"
                    ? "⬆️"
                    : "⬇️"
                  : ""}
              </th>
              <th onClick={() => handleSort("age")}>
                AGE{" "}
                {sortConfig.key === "age"
                  ? sortConfig.direction === "asc"
                    ? "⬆️"
                    : "⬇️"
                  : ""}
              </th>
              <th onClick={() => handleSort("email")}>
                EMAIL{" "}
                {sortConfig.key === "email"
                  ? sortConfig.direction === "asc"
                    ? "⬆️"
                    : "⬇️"
                  : ""}
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((entry) => {
                const { id, name, age, email } = entry;
                return (
                  <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{email}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
