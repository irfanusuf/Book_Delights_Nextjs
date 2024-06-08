"use client";

import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

const columns = [
  { field: "_id", headerName: "ID", width: 300 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "description", headerName: "Description", width: 130 },
  { field: "author", headerName: "Author" , width: 100},
  { field: "price", headerName: "Price" , type: "number", width: 100},
  { field: "imageUrl", headerName: "Image" ,type : "file", width: 100},
  {  headerName: "Action" , width: 200},

  
 
];



export default function DataTable() {

const [rows , setRows] = React.useState([])

  const getRows = async () => {
    try {
      const res = await fetch("/api/book/getAll", {
        method: "GET",
      });
      const data = await res.json();
      const books = data.books

      console.log(books)
      setRows(books)
 

    } catch (error) {
      console.log(error);
      toast.error("server Error");
    }
  };

  React.useEffect(() => {
    getRows();
  }, []);

  return (
    <div style={{ height: 600, width: "100%", marginTop: "30px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id} 
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20 ,30]}
        checkboxSelection={false}
      />
    </div>
  );
}
