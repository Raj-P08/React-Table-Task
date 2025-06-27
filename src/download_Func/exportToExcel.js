import * as XLSX from "xlsx";

const exportToExcel = (data, fileName = "table_data") => {
  const workbook = XLSX.utils.book_new();

  const worksheet = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const filePath = `${fileName}.xlsx`;

  XLSX.writeFile(workbook, filePath);
};

export default exportToExcel;
