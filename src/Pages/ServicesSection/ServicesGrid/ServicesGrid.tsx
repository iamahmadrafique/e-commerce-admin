import React, { useState, useEffect } from "react";
import { DataGrid, GridEventListener, GridColumns } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

type Props = {
  searchInput: string;
  data: any;
  setSelectedRow: any;
  setActiveAction: any;
  selectedView: any;
  openDeletePopUp: boolean;
  setOpenDeletePopUp: any;
  handleClosePopUp: any;
};

export default function ServicesGrid(props: Props) {
  const {
    searchInput,
    data,
    setSelectedRow,
    setActiveAction,
    selectedView,
    setOpenDeletePopUp,
  } = props;
  const [deletingID, setDeletingID] = useState<number>();
  const [gridData, setGridData] = useState(data);
  const columns: GridColumns = [
    {
      field: "id",
      headerName: "Alert",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 110,
      sortable: false,
      renderCell: (params) => {
        let inventoryLevel = params.row.inventoryLevel;
        let stockLevel = params.row.stockLevel;
        let inventoryStatus = params.row.inventoryStatus;
        return (
          <span>
            {(inventoryStatus === "Current" && (inventoryLevel > stockLevel)) ? (
              <span
                className="text-xs text-red-600"
              >
               <div className='w-3 h-3 rounded-full bg-red-600'></div> Stock is limited
              </span>
            ) : <span
            className="text-xs text-green-600"
          >
           <div className='w-3 h-3 rounded-full bg-green-600'></div> In Stock
          </span>}
          </span>
        );
      },
    },
    {
      field: "image",
      headerName: "Product Image",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => {
        var formattedData = params.row.image;
        return (
          <div className="rowitem">
            {formattedData ? (
              <img
                src={formattedData}
                alt="sliderImage"
                className="w-12 h-12"
              />
            ) : (
              <ImageNotSupportedIcon className="w-12 h-12" />
            )}
          </div>
        );
      },
    },
    {
      field: "inventoryStatus",
      headerName: "Inventory Status",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "inventoryLevel",
      headerName: "Inventory Level",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 140,
    },
    {
      field: "productName",
      headerName: "Product Name",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "productDescription",
      headerName: "Description",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "price",
      headerName: "Price",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "stockLevel",
      headerName: "Stock Level",
      headerClassName: "super-app-theme--header",
      flex: 1,
      minWidth: 150,
    },
   
  ];
  let deletedClick = false;

  useEffect(() => {
    console.log("search in show user is ", data);
    handleSearch();
  }, [searchInput, selectedView]);

  useEffect(() => {
    setGridData(data);
  }, [data]);

  const handleEvent: GridEventListener<"rowClick"> = (
    params: any // GridRowParams
  ) => {
    if (!deletedClick) {
      console.log("id is : ", params.row.id);
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === params.row.id) {
          setSelectedRow(i);
          setActiveAction("details");
        }
      }
    }
  };
  
  const handleSearch = () => {
    const filteredData = data.filter(
      (d) => d.inventoryStatus.toLowerCase() === selectedView.toLowerCase()
    )
    if (searchInput !== "") {
      const searchedData = filteredData.filter(
        (d) =>
         d.productName.toLowerCase().includes(searchInput.toLowerCase()) ||
          d.productDescription.toLowerCase().includes(searchInput.toLowerCase())
      );
      console.log("searchedData is ", searchedData);

      setGridData(searchedData);
    } else {
      setGridData(filteredData);
    }
  };

  const handleOpenPopUp = (id: number) => {
    setDeletingID(id);
    setOpenDeletePopUp(true);
  };

  return (
    <Box
      className="mt-5 sm:mt-7 h-full w-full"
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
        onRowClick={handleEvent}
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator":
            {
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
