import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from "@mui/x-data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, loadUser, myOrders } from "../../../actions/userActions";
// import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
// import { useAlert } from "react-alert";
import {Typography} from "@mui/material";
// import MetaData from "../layout/MetaData";
import LaunchIcon from "@mui/icons-material/Launch";
import MetaData from "../../MetaData";
import Loader from '../../layout/Loader/Loader'
import { toast } from "react-toastify";




const MyOrders = () => {

    
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const alert = useAlert();
    
        const { loading, error, user , userOrder} = useSelector((state) => state.user);
        // const { user } = useSelector((state) => state.user);

        // console.log(order[0].orderItems[0].name);

        console.log(`user details: ${user}`);
    
        const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        // {
        //     field: "status",
        //     headerName: "Status",
        //     minWidth: 150,
        //     flex: 0.5,
        //     // cellClassName: (params) => {
        //     // return params.getValue(params.id, "status") === "Delivered"
        //     //     ? "greenColor"
        //     //     : "redColor";
        //     // },
        // },
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
            // // renderCell: (params) => {
            // // return (
            // //     <Link to={`/order/${params.getValue(params.id, "id")}`}>
            // //     <LaunchIcon />
            // //     </Link>
            // // );
            // },
        // },
        ];
        const rows = [];
    if(userOrder){
        userOrder &&
            userOrder.forEach((item, index) => {
                rows.push({
                itemsQty: item.quantity,
                id: item._id,
                amount: item.price,
                });
        });
    }

    const showToastLoginErrorMessage = (e) => {
        toast.error(e, {
        position: toast.POSITION.TOP_RIGHT,
        });
    };

    
        useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }
        dispatch(loadUser());
    }, [dispatch, error ]);
    

return (
    <Fragment>
    {user && (
        <MetaData title={`${user.email} - Orders`} />
            )}

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
{user && (
        <Typography id="myOrdersHeading">{user.email}'s Orders</Typography>
)}
        </div>
    )}
    </Fragment>
);
};

export default MyOrders;