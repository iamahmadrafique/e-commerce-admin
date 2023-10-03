import React, { useState, useEffect } from "react";
import { DataGrid, GridEventListener, GridColumns } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationAlert from "../../../../../components/ConfirmationAlert/ConfirmationAlert.tsx";

type Props = {
  searchInput: string;
  data: any;
};

export default function RevenueGrid(props: Props) {
  const {
    searchInput,
    data,
  } = props;
  const [gridData, setGridData] = useState(data);
  const columns: GridColumns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "category",
      headerName: "Product Category",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 250,
    },
    {
      field: "date",
      headerName: "Date",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "orders",
      headerName: "Orders",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "sales",
      headerName: "Sales",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 150,
    },
  ];

  useEffect(() => {
    console.log("search in show user is ", data);
    handleSearch();
  }, [searchInput]);

  useEffect(() => {
    setGridData(data);
  }, [data]);

//   const handleEvent: GridEventListener<"rowClick"> = (
//     params: any // GridRowParams
//   ) => {
//     if (!deletedClick) {
//       console.log("id is : ", params.row.id);
//       for (let i = 0; i < data.length; i++) {
//         if (data[i].id === params.row.id) {
//           setSelectedRow(i);
//           setActiveAction("details");
//         }
//       }
//     }
//   };
  
  const handleSearch = () => {
    if (searchInput !== "All") {
      const searchedData = data.filter(
        (d) =>
          d.category.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log("searchedData is ", searchedData);
      setGridData(searchedData);
    } else {
      setGridData(data);
    }
  };

  return (
    <Box
      className="mt-5 sm:mt-7 h-96 w-full"
      sx={{
        "& .super-app-theme--header": {
          backgroundColor: "#EDEDF6",
        },
      }}
    >
      <DataGrid
        sortingOrder={["asc", "desc"]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        rowHeight={40}
        columns={columns.map((column) => ({
          ...column,
        }))}
        rows={gridData}
        className="cursor-pointer"
        disableColumnMenu
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator":
            {
              // display: "none",
              background: "#ededf6",
            },
          ".css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
            fontWeight: "600",
            color: "#494E67",
          },
          ".css-yrdy0g-MuiDataGrid-columnHeaderRow": {
            background: "#ededf6",
          },
        }}
      />
    </Box>
  );
}
