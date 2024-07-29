import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import OrderSkeleton from "./OrderSkeleton";

import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../store/orderSlice";
import { useNavigate } from "react-router-dom/dist";

const Order = () => {
  const orderError = useSelector((state) => state.order.error);
  const orderData = useSelector((state) => state.order.data);
  const orderState = useSelector((state) => state.order.status);

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(orderData);
  //   console.log(orderState);
  //   console.log(orderError);
  // }, [orderData, orderState, orderError]);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (orderState === "idle") {
      dispatch(fetchOrders(token));
    }
  }, [dispatch, orderState]);

  useEffect(() => {
    if (orderError) {
      toast.error(orderError);
      navigate("/login");
    }
  }, [orderError, navigate]);

  return (
    <div className="py-5">
      {orderState === "loaded" && orderData ? (
        <>
          {orderData.map((order) => (
            <OrderCard order={order} key={order._id} />
          ))}
        </>
      ) : (
        <>
          <OrderSkeleton />
          <OrderSkeleton />
        </>
      )}
    </div>
  );
};

export default Order;
