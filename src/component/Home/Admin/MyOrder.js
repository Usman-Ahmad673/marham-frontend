import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllOrders } from "../../../actions/Admin/orderActions";
import Loader from "../../layout/Loader/Loader";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";
// import Typography from "@material-ui/core/Typography";
import MetaData from "../../MetaData";
import LaunchIcon from "@mui/icons-material/Launch";

const MyOrders = () => {
    const dispatch = useDispatch();

        const { loading, error, orders } = useSelector((state) => state.allOrders);
        // const { user } = useSelector((state) => state.user);

        // console.log(orders[0].orderItems[0].name);

        // console.log(`user details: ${user}`);
    
        const columns = [
        { field: "id", headerName: "Orders ID", minWidth: 300, flex: 1 },
    
        {
            field: "ProductName",
            headerName: "Product Name",
            type: "text",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "BuyerName",
            headerName: "Buyer Name",
            type: "text",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "BuyerAddress",
            headerName: "Buyer Address",
            type: "text",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "BuyerContact",
            headerName: "Buyer Contact",
            type: "text",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
    
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
    
        // {
        //     field: "actions",
        //     flex: 0.3,
        //     headerName: "Actions",
        //     minWidth: 150,
        //     type: "number",
        //     sortable: false,
            // renderCell: (params) => {
            // return (
            //     // <Link to={`/orders/${params.getValue(params.id, "id")}`}>
            //     // <LaunchIcon />
            //     // <Link>
            // );
            // },
        // },
        ];
        const rows = [];
    // if(user.role === 'admin'){
        orders &&
            orders.forEach((item, index) => {
                rows.push({
                ProductName:item.orderItemName,
                BuyerName: item.buyerName,
                BuyerAddress: item.buyerAddress,
                BuyerContact: item.buyerContact,
                itemsQty: item.orderItemQuantity,
                id: item._id,
                amount: item.orderItemPrice,
                });
        });
    // }
    // else{
        // user.orders &&
        //     user.orders.forEach((item, index) => {
        //         rows.push({
        //         itemsQty: item.orderItems.length,
        //         id: item._id,
        //         status: item.orderStatus,
        //         amount: item.totalPrice,
        //         });
        // });
    // }
    

    const showToastSuccessMessage = () => {
        toast.success(`Successfully Deleted Order!`, {
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
    
        dispatch(getAllOrders());
    }, [dispatch, error]);
    

return (
    <Fragment>
    {/* {user && ( */}
        <MetaData title={`All - Orders`} />
            {/* )} */}

    {loading ? (
        <Loader />
    ) : (
        <div className="myOrdersPage">
        <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 90,
            },
          },
        }}
        pageSizeOptions={[90]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
{/* {user && (
        <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
)} */}
        </div>
    )}
    </Fragment>
);
};

export default MyOrders;