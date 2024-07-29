import React, { useEffect } from "react";
import CartCard from "./CartCard";
import CartSkeleton from "./CartSkeleton";

import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom/dist";

const Cart = () => {
  const cartError = useSelector((state) => state.cart.error);
  const cartData = useSelector((state) => state.cart.data);
  const userData = useSelector((state) => state.user.data);
  const cartState = useSelector((state) => state.cart.status);

  // useEffect(() => {
  //   console.log(cartData);
  //   console.log(cartState);
  //   console.log(cartError);
  // }, [cartData, cartState, cartError]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (cartState === "idle") {
      dispatch(fetchCart(token));
    }
  }, [dispatch, cartState]);

  useEffect(() => {
    if (cartError) {
      toast.error(cartError);
      navigate("/login");
    }
  }, [cartError, navigate]);

  return (
    <div className="py-5">
      {cartState === "loaded" && cartData && userData ? (
        <>
          {cartData.map((cart) => (
            <CartCard cart={cart} key={cart.productId._id} />
          ))}
        </>
      ) : (
        <>
          <CartSkeleton />
          <CartSkeleton />
          <CartSkeleton />
          <CartSkeleton />
        </>
      )}
    </div>
  );
};

export default Cart;
