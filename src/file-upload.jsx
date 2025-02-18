import { useState } from "react";
import { getCSVData } from "./util";
import { DataGrid } from "@mui/x-data-grid";
import { Chip, Fab, Paper, Stack } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileColumns, setFileColumns] = useState(null);
  const [fileRows, setFileRows] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const [columns, rows] = await getCSVData(selectedFile);
    setFileColumns(columns);
    setFileRows(rows);
  };

  const handleFileUploadClick = () => {
    document.getElementById("file").click();
  };
  return (
    <Stack gap="2rem">
      {/*Hidden */}
      <input
        style={{ display: "none" }}
        className="file-upload"
        type="file"
        id="file"
        onChange={handleFileChange}
      />
      <Stack gap="1rem" direction="row" alignItems="center">
        <Fab color="info" onClick={handleFileUploadClick} variant="extended">
          <UploadFile sx={{ mr: 0 }} />
          Select a file to upload
        </Fab>
        {file && (
          <Chip
            size="medium"
            sx={{ fontWeight: "bold" }}
            color="success"
            label={file.name}
            variant="outlined"
          />
        )}
      </Stack>
      {fileRows && fileColumns && (
        <Paper>
          <DataGrid rows={fileRows} columns={fileColumns} />
        </Paper>
      )}
    </Stack>
  );
}

export default FileUpload;
