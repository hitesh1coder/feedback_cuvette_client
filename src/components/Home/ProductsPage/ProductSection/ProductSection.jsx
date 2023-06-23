import React, { useEffect, useState } from "react";
import "./ProductSection.css";
import compnyLogo from "../../../../images/capany2.png";
import showcommentIcon from "../../../../images/addcomment.png";
import sendIcon from "../../../../images/send.png";
import upIcon from "../../../../images/up.png";
import commentIcon from "../../../../images/comment.png";
import axios from "axios";

const ProductSection = ({
  products,
  setAddProductModel,
  setRegisterModel,
  usercomment,
  setUsercomment,
  setUservote,
  showComments,
  handleShowComments,
  selectedSortValue,
  handleSelectChange,
}) => {
  const user = JSON.parse(localStorage.getItem("feedback_user"));

  const handleSendComment = async (id) => {
    try {
      const sendComment = await axios.post(
        `http://localhost:5000/product/add-comment/${id}`,
        {
          usercomment,
        }
      );
      setUsercomment("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUserVote = async (id) => {
    const product = await axios.get(`http://localhost:5000/product/${id}`);
    const votes = product.data.uservote;
    try {
      const sendUpvote = await axios.post(
        `http://localhost:5000/product/add-like/${id}`
      );
      setUservote(votes + 1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="productpage_wrapper">
        <div className="options">
          <p>{products.length} suggestions</p>
          <div className="sorting">
            <span>sort by :</span>
            <select
              name="sort"
              value={selectedSortValue}
              onChange={handleSelectChange}
            >
              <option className="option" value="Upvote">
                Upvote
              </option>
              <option className="option" value="Downvote">
                Downvote
              </option>
            </select>
          </div>
          <button
            className="add_product_btn"
            onClick={() =>
              user ? setAddProductModel(true) : setRegisterModel(true)
            }
          >
            + Add Product
          </button>
        </div>
        <div className="product_container">
          <div className="main">
            {products?.map((product, i) => {
              return (
                <div className="main_div" key={i}>
                  <div className="product_div">
                    <div className="product_logo_container">
                      <img src={product.logourl} alt="logo" />
                    </div>
                    <div className="product_details_container">
                      <h2>{product.companyname}</h2>
                      <p>{product.productdesc}</p>
                      <div className="product_type">
                        {product.categoryArray?.map((category, i) => {
                          return <p key={i}>{category} </p>;
                        })}

                        <span
                          className="comment_btn"
                          onClick={() => handleShowComments(product._id)}
                        >
                          <img src={showcommentIcon} alt="showcomment" />
                          <span>Comment</span>
                        </span>
                      </div>
                    </div>
                    <div className="product_comment_vote_container">
                      <div className="vote">
                        <span>
                          <img
                            onClick={() => handleUserVote(product._id)}
                            src={upIcon}
                            alt="upvote"
                          />
                        </span>
                        <p>{product?.uservote || 0}</p>
                      </div>
                      <div className="comments">
                        <p>{product?.usercomment?.length}</p>
                        <img src={commentIcon} alt="comment" />
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      showComments
                        ? "comment_section show"
                        : " comment_section hide"
                    }
                  >
                    <div className="input_div">
                      <input
                        type="text"
                        name="usercomment"
                        placeholder="Add a Comment..."
                        className="comment_input"
                        value={usercomment}
                        onChange={(e) => setUsercomment(e.target.value)}
                      />
                      <img
                        className="send_btn"
                        src={sendIcon}
                        onClick={() => handleSendComment(product._id)}
                        alt="send"
                      />
                    </div>
                    <div className="comments_div">
                      {product?.usercomment?.map((comment, i) => {
                        return (
                          <li key={i}>
                            <p>{comment}</p>
                          </li>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSection;
