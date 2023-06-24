import React, { useState } from "react";
import "../AddProductModel/AddProductModel.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UpdateProductModal = ({ closeUpdateProductModel, updateProductData }) => {
  const [formValue, setFormValue] = useState({
    companyname: updateProductData.companyname,
    category: updateProductData?.categoryArray?.map((category) => category),
    logourl: updateProductData.logourl,
    productlink: updateProductData.productlink,
    productdesc: updateProductData.productdesc,
  });

  const [error, setError] = useState(false);

  const user = JSON.parse(localStorage.getItem("feedback_user"));

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const id = updateProductData._id;

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      !formValue.companyname ||
      !formValue.category.length < 0 ||
      !formValue.logourl ||
      !formValue.productdesc ||
      !formValue.productlink
    ) {
      setError(true);
    } else {
      setError(false);
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const { companyname, category, logourl, productdesc, productlink } =
          formValue;
        const updatedJob = await axios.put(
          `https://feedback-cuvette-server.onrender.com/product/update/${id}`,
          { companyname, category, logourl, productdesc, productlink },
          config
        );
        const { data } = updatedJob;

        toast.success(`${data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          closeUpdateProductModel();
        }, 3000);
      } catch (error) {
        if (error.request.status === 500) {
          toast.error(`${error.response.data.message}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            closeUpdateProductModel();
          }, 3000);
        }
      }
    }
  };
  return (
    <>
      <div
        className="product_model_wrapper"
        onClick={closeUpdateProductModel}
      ></div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="product_model">
        <div className="product_model_section">
          <div className="addproduct_form">
            <h1>Update Product details</h1>
            <div className="input_box">
              <input
                className="input"
                type="text"
                name="companyname"
                placeholder="Name of the Company"
                onChange={handleChange}
                value={formValue.companyname}
              />
            </div>
            <div className="input_box">
              <input
                className="input"
                type="text"
                name="category"
                placeholder="Category"
                onChange={handleChange}
                value={formValue.category}
              />
            </div>
            <div className="input_box">
              <input
                className="input"
                type="text"
                placeholder="Add Logo URL"
                name="logourl"
                onChange={handleChange}
                value={formValue.logourl}
              />
            </div>
            <div className="input_box">
              <input
                className="input"
                type="text"
                name="productlink"
                placeholder="Link of Product"
                onChange={handleChange}
                value={formValue.productlink}
              />
            </div>
            <div className="input_box">
              <input
                className="input"
                type="text"
                name="productdesc"
                placeholder="Add Description"
                onChange={handleChange}
                value={formValue.productdesc}
              />
            </div>
            <p className="error">
              {error ? "* all fields required in the form" : ""}
            </p>
            <button className="addproduct_model_btn" onClick={handleUpdate}>
              Update
            </button>
          </div>
          <div className="model_banner2">
            <div className="banner_desc">
              <h2>Feedback</h2>
              <p>Add your product and rate other Items...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProductModal;
