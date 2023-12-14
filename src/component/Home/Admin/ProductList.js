    import React, { Fragment, useEffect } from "react";
    import { DataGrid } from "@mui/x-data-grid";
    // import { DataGrid } from "@material-ui/data-grid";
    import "./productList.css";
    import { useSelector, useDispatch } from "react-redux";
    import {
    clearErrors,
    getAdminProduct,
    deleteProduct,
    } from "../../../actions/Admin/productActions";
    import { Link } from "react-router-dom";
    import { toast } from "react-toastify";
    import { Button, Typography } from "@mui/material";
    import MetaData from "../../MetaData";
    import EditIcon from "@mui/icons-material/Edit";
    import DeleteIcon from "@mui/icons-material/Delete";
    import { useNavigate } from "react-router-dom";
    import { DELETE_PRODUCT_RESET } from "../../../constants/Admin/productConstants";
    import Sidebar from "./Sidebar";

    const ProductList = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.delProduct);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };



    
    const showToastSuccessMessage = () => {
      toast.success(`Successfully Deleted Product!`, {
      position: toast.POSITION.TOP_RIGHT,
      });
  };

  

  const showToastErrorMessage = (e) => {
      toast.error(e, {
      position: toast.POSITION.TOP_RIGHT,
      });
  };


    useEffect(() => {
        if (error) {
          showToastErrorMessage(error);
        dispatch(clearErrors());
        }

        if (deleteError) {
          showToastErrorMessage(deleteError);
        dispatch(clearErrors());
        }

        if (isDeleted) {
          showToastSuccessMessage();
          navigate("/admin/");
          dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getAdminProduct());
    }, [dispatch, error, deleteError, navigate, isDeleted]);

    const columns = [
        { field: 'id', headerName: 'Product ID', flex: 1, minWidth: 200 },
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 350 },
        // { field: 'image', headerName: 'Image', flex: 1, minWidth: 350 },
        { field: 'stock', headerName: 'Stock', type: 'number', flex: 0.3, minWidth: 150 },
        { field: 'price', headerName: 'Price', type: 'number', flex: 0.5, minWidth: 270 },
        {
          field: 'actions',
          headerName: 'Actions',
          flex: 0.3,
          minWidth: 150,
          sortable: false,
          renderCell: (params) => (
            <Fragment>
              {/* {params.row ? (
                <Link to={`/admin/product/${params.row.id}`}>
                  <EditIcon />
                </Link>
              ) : null} */}
              <Button
                onClick={() => deleteProductHandler(params.row ? params.row.id : null)}
              >
                <DeleteIcon />
              </Button>
            </Fragment>
          ),
        },
      ];

      const rows = products
        ? products.map((item) => ({
            id: item._id,
            // image: <img src={item.images[0]?.url} alt={item.name} />,
            stock: item.stock,
            price: item.price,
            name: item.name,
        }))
        : [];

    
      return (
        <Fragment>
        <MetaData title={`ALL PRODUCTS - Admin`} />
    
          <div className="dashboard">
          
            <div className="productListContainer">
          <Typography variant="h4" component="h1" gutterBottom style={{color:"red" , margin:"0 auto"}}>
            ALL PRODUCTS
          </Typography>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </Fragment>
    );
    };

    export default ProductList;
