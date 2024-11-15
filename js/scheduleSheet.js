
const getDataFromGoogleSheets = (SHEET_ID,RANGE,SHEET_TITLE,tableNo,round) => {
    const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${RANGE}`;
   
    fetch(GOOGLE_SHEET_URL)
      .then((response) => response.text())
      .then((data) => {
        const jsonStart = data.indexOf("google.visualization.Query.setResponse(");
   
        if (jsonStart !== -1) {
          const jsonString = data.substring(
            jsonStart + "google.visualization.Query.setResponse(".length,
            data.length - 2
          );
   
          const jsonData = JSON.parse(jsonString);
          const dataTable = jsonData.table;
          const rows = dataTable.rows;
              
          const tableBody = tableNo === "1" ? document.getElementById("tableBody") : document.getElementById("tableBody"+tableNo);
          let spanFlag = true;
          
          console.log(jsonData)
      
          rows.forEach((rowData) => {
            console.log('rowData...???',rowData);
            const row = document.createElement("tr");
            rowData.c.forEach((cellData, index) => {
              const cell = document.createElement("td");
              const link = document.createElement("a");
              if (index === 2 && spanFlag) {
                cell.textContent = cellData?.v;
                // cell.setAttribute("rowspan", 6);
                row.appendChild(cell);
                spanFlag = false;
              } else if(index === 1 || index === 3){
                link.textContent = cellData?.v;
                // link.setAttribute("href","https://abdulkadirkhan786.netlify.app/");
                let id = cellData?.v;
                link.setAttribute("href",`http://www.kktv1.com/m/?roomid=${id}`);   // here i am updating the user id dynamically...
                // cell.textContent = cellData.v;
                cell.appendChild(link);
                row.appendChild(cell);
              }else if (index === 4) {
                cell.textContent = cellData?.v;
                row.appendChild(cell);
              }else if (round === "round1" && index === 0) {
                cell.textContent = cellData?.f;
                row.appendChild(cell);
              }else if (round === "round2" && index === 0) {
                cell.textContent = cellData?.v;
                row.appendChild(cell);
              }else{
                cell.textContent = cellData?.f;
                row.appendChild(cell);
              }
            });
   
            tableBody.appendChild(row);
          });
          const tableContainer = tableNo==='1'?  document.getElementById("myTable") : document.getElementById("myTable"+tableNo);
          tableContainer.appendChild(tableBody);
        } else {
          console.error("Data not found in the response.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  
  getDataFromGoogleSheets("1yUYOtDqWOyXQFa96fpPh1U8ZIUIRwPBQeCSteNLTKPM","A46:E48","Sep 23 Agency PK Battle","1","round1");
  getDataFromGoogleSheets("1yUYOtDqWOyXQFa96fpPh1U8ZIUIRwPBQeCSteNLTKPM","A50:E52","Sep 23 Agency PK Battle","2","round1");
  getDataFromGoogleSheets("1yUYOtDqWOyXQFa96fpPh1U8ZIUIRwPBQeCSteNLTKPM","A54:E56","Sep 23 Agency PK Battle","3","round1");
  // getDataFromGoogleSheets("1yUYOtDqWOyXQFa96fpPh1U8ZIUIRwPBQeCSteNLTKPM","A210:E212","Sep 23 Agency PK Battle","4","round1");
  // // // round2
  // getDataFromGoogleSheets("1yUYOtDqWOyXQFa96fpPh1U8ZIUIRwPBQeCSteNLTKPM","A58:E60","Sep 23 Agency PK Battle","6","round2");
  // getDataFromGoogleSheets("1yUYOtDqWOyXQFa96fpPh1U8ZIUIRwPBQeCSteNLTKPM","A62:E64","Sep 23 Agency PK Battle","7","round2");


