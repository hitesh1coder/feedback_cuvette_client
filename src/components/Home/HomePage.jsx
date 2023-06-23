import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import "./Home.css";
import Banner from "./Banner/Banner";
import FilterPage from "./ProductsPage/FilterSection/FilterPage";
import ProductSection from "./ProductsPage/ProductSection/ProductSection";
import RegisterModel from "../Models/RegisterModel/RegisterModel";
import LoginModel from "../Models/LoginModel/LoginModel";
import AddProductModel from "../Models/AddProductModel/AddProductModel";
import axios from "axios";

const HomePage = () => {
  const [registerModel, setRegisterModel] = useState(false);
  const [loginModel, setLoginModel] = useState(false);
  const [addProductModel, setAddProductModel] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [usercomment, setUsercomment] = useState("");
  const [uservote, setUservote] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [selectedSortValue, setSelectedSortValue] = useState("Upvote");

  const handleSelectChange = (event) => {
    setSelectedSortValue(event.target.value);
  };

  const techFields = [
    "All",
    "Fintech",
    "Edtech",
    "B2B",
    "Agritech",
    "Sass",
    "Meditech",
  ];

  const handleChildData = (data) => {
    setSelectedFilter(data);
  };
  const handleShowComments = (id) => {
    const product = products.filter((product) => product._id === id);
    console.log(product[0]);
    setShowComments((current) => !current);
  };
  const closeRegisterModel = () => setRegisterModel(false);
  const closeLoginModel = () => setLoginModel(false);
  const closeAddProductModel = () => setAddProductModel(false);

  const fetchAllproducts = async () => {
    try {
      const AllProducts = await axios.get(`http://localhost:5000/products`, {
        params: {
          category: selectedFilter,
          sortorder: selectedSortValue,
        },
      });
      const { data } = AllProducts;
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllproducts();
  }, [selectedFilter, usercomment, uservote, selectedSortValue, registerModel]);
  return (
    <>
      <div className="home_wrapper">
        <Header
          setRegisterModel={setRegisterModel}
          setLoginModel={setLoginModel}
        />
        {registerModel && (
          <RegisterModel closeRegisterModel={closeRegisterModel} />
        )}
        {loginModel && <LoginModel closeLoginModel={closeLoginModel} />}
        <Banner />
        <div className="product_section">
          <FilterPage
            techFields={techFields}
            onGetFilterValue={handleChildData}
          />
          <ProductSection
            usercomment={usercomment}
            setUsercomment={setUsercomment}
            uservote={uservote}
            setUservote={setUservote}
            showComments={showComments}
            setShowComments={setShowComments}
            selectedSortValue={selectedSortValue}
            setSelectedSortValue={setSelectedSortValue}
            handleSelectChange={handleSelectChange}
            products={products}
            setRegisterModel={setRegisterModel}
            setAddProductModel={setAddProductModel}
            handleShowComments={handleShowComments}
          />
          {addProductModel && (
            <AddProductModel closeAddProductModel={closeAddProductModel} />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
