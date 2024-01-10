
const getDataFromGoogleSheets = (SHEET_ID,RANGE,SHEET_TITLE,tableNo) => {
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
  
  getDataFromGoogleSheets("11ZLpOSrhZISYYzGusflZZA3FcXkznRKfvaO_t9hzKJA","A75:E77","Dec 23 Agency PK Battle","1");
  getDataFromGoogleSheets("11ZLpOSrhZISYYzGusflZZA3FcXkznRKfvaO_t9hzKJA","A79:E81","Dec 23 Agency PK Battle","2");
  getDataFromGoogleSheets("11ZLpOSrhZISYYzGusflZZA3FcXkznRKfvaO_t9hzKJA","A83:E85","Dec 23 Agency PK Battle","3");
  getDataFromGoogleSheets("11ZLpOSrhZISYYzGusflZZA3FcXkznRKfvaO_t9hzKJA","A87:E89","Dec 23 Agency PK Battle","4");
  // // // round2
  // getDataFromGoogleSheets("11ZLpOSrhZISYYzGusflZZA3FcXkznRKfvaO_t9hzKJA","A16:E18","Dec 23 Agency PK Battle","4");
  // getDataFromGoogleSheets("11ZLpOSrhZISYYzGusflZZA3FcXkznRKfvaO_t9hzKJA","A22:E24","Dec 23 Agency PK Battle","5");


