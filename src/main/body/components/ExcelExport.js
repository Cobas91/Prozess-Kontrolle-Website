import React from "react";
import Button from "react-bootstrap/Button";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExportCSV = (props) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      variant="success"
      onClick={(e) => exportToCSV(props.csvData, props.fileName)}
    >
      {props.Name}
    </Button>
  );
};
export default ExportCSV;
