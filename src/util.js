// async function to read a file using FileReader
function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);

    reader.readAsText(file);
  });
}

/*
Reads a csv file and returns [formatted column headers, formatted rows] needed for datagrid
*/
async function getCSVData(fileBlob) {
  const fileText = await readFileAsync(fileBlob);

  const lines = fileText.split("\n");
  const columnHeaders = lines[0].split(", ");

  const columnOrder = {};

  const dataGridColumns = columnHeaders.map((header, i) => {
    columnOrder[i] = header.trim();
    return {
      field: header.trim(),
      headerName: header,
      width: 100,
    };
  });

  const dataGridRows = lines.slice(1, lines.length).map((line, i) => {
    const attributes = line.split(", ");

    const formattedAttributes = {};

    attributes.forEach((attribute, j) => {
      formattedAttributes[columnOrder[j]] = attribute;
    });

    formattedAttributes.id = i;

    return formattedAttributes;
  });

  return [dataGridColumns, dataGridRows];
}

export { getCSVData };
