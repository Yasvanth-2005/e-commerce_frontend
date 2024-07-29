import React, { useEffect } from "react";
import ProductCard from "./ProductCard";

import { toast } from "react-hot-toast";
import { fetchProducts } from "../../store/productSlice";
import { useSelector, useDispatch } from "react-redux";
import ProductSkeleton from "./ProductSkeleton";
import { useNavigate } from "react-router-dom/dist";

const Products = () => {
  const productError = useSelector((state) => state.products.error);
  const productData = useSelector((state) => state.products.data);
  const productState = useSelector((state) => state.products.status);

  const navigate = useNavigate();

  //   useEffect(() => {
  //     console.log(productData);
  //     console.log(productState);
  //     console.log(productError);
  //   }, [productData, productState, productError]);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (productState === "idle") {
      dispatch(fetchProducts(token));
    }
  }, [dispatch, productState]);

  useEffect(() => {
    if (productError) {
      toast.error(productError);
      navigate("/login");
    }
  }, [productError, navigate]);

  return (
    <div className="py-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {productState === "loaded" && productData ? (
        <>
          {productData.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </>
      ) : (
        <>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </>
      )}
    </div>
  );
};

export default Products;
