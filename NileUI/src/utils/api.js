import axios from "axios";

// These url's need to be updated while deployment.
const productMsUrl = "http://localhost:3001/products";
const orderMsUrl = "http://localhost:3002"
const userMsUrl = "http://localhost:1000/user";
const sellerMsUrl = "http://localhost:1000/seller";

//-- Order Ms --//
export const getOrdersByCustomerId = (customerId) => {
  return axios.get(orderMsUrl + '/getOrders/' + customerId)
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const getCartByCustomerId = (customerId) => {
  return axios.put(orderMsUrl + '/getCartByCustomerId', { cid: customerId })
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const updateAddress = (customerId, address) => {
  return axios.put(orderMsUrl + '/updateAddr', { cid: customerId, address: address })
    .then(response => response.data.message)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const updateCart = (cart) => {
  return axios.put(orderMsUrl + '/updatecart', cart)
    .then(response => response.data.message)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const confirmDelivery = (oid) => {
  return axios.put(orderMsUrl + '/confirmation', { oid: oid })
    .then(response => response.data.message)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const cancelOrder = (orderObj) => {
  return axios.put(orderMsUrl + '/cancelorder', orderObj)
    .then(response => response.data.message)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const placeOrder = (orderObj) => {
  return axios.put(orderMsUrl + '/placeorder', orderObj)
    .then(response => response.data.message)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}


//-- ProductMs --

export const getAllProducts = () => {
  /* your code goes here */
  return axios.get(productMsUrl + '/getAllProducts')
    .then(response => { //arrow function is must here
      return response.data;
    })
    .catch(error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}

export const getProductById = (pid) => {
  return axios.get(productMsUrl + '/getproductsbyid/' + pid)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}

export const getProductsByName = (name) => {
  return axios.get(productMsUrl + '/getproductsbyname/' + name)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}

export const addProduct = (product) => {
  return axios.post(productMsUrl + '/addproduct/', product)
    .then(response => {
      return response.data.message;
    })
    .catch(error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}

export const getProductsByMainCategory = (mcategory) => {
  return axios.get(productMsUrl + '/getproductsbymcategory/' + mcategory)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}

export const getProductsBySubCategory = (scategory) => {
  return axios.get(productMsUrl + '/getproductsbyscategory/' + scategory)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}

export const updateProduct = (product) => {
  return axios.put(productMsUrl + '/updateproduct', product)
    .then(response => {
      return response.data.message;
    })
    .catch(error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}

export const deleteProduct = (pid) => {
  return axios.delete(productMsUrl + '/deleteprod/' + pid)
    .then(response => {
      return response.data.message;
    })
    .catch(error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}

export const getMainCategories = () => {
  return axios.get(productMsUrl + '/getMcategories/')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}

export const getSubCategories = (mcat) => {
  return axios.get(productMsUrl + '/getscategories/' + mcat)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}

export const getAllSubCategories = () => {
  return axios.get(productMsUrl + '/getAllSCategories').then(
    response => {
      return response
    }
  ).catch(
    error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    }
  )
}

export const getReviewsOfProduct = (pid) => {
  return axios.get(productMsUrl + '/getreviewsbyproduct/' + pid)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}

export const getProductsBySellerId = (sid) => {
  return axios.get(productMsUrl + '/getproductsbysellerid/' + sid)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}

//add Review { review: { pid: ,  cname: review.cname, comment: review.comment, rating: review.rating } } 
export const addReview = (review) => {
  return axios.post(productMsUrl + '/addreview/', review)
    .then(response => {
      return response.data.message;
    })
    .catch(error => {
      if (error.response !== null) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Server Error");
      }
    });
}


//-- UserMs --

export const userLoginApi = (loginData) => {
  return axios.post(userMsUrl + '/login', loginData)
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const userSignupApi = (userData) => {
  return axios.post(userMsUrl + '/signup', userData)
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const getAllUsers = () => {
  return axios.get(userMsUrl + '/getAllUsers')
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}


export const getUserById = (id) => {
  return axios.get(userMsUrl + '/getAllUsers/' + id)
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const updateById = (id, user_obj) => {
  return axios.put(userMsUrl + '/update/' + id, user_obj)
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

// -- SellerMs --

export const sellerLoginApi = (sellerData) => {
  return axios.post(sellerMsUrl + '/login', sellerData)
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const sellerSignupApi = (sellerData) => {
  return axios.post(sellerMsUrl + '/signup', sellerData)
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const getAllSellers = () => {
  return axios.get(sellerMsUrl + '/getAllSellers')
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const getSellerById = (id) => {
  return axios.get(sellerMsUrl + '/search/' + id)
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const sellerUpdateById = (id, seller_obj) => {
  return axios.put(sellerMsUrl + '/update/' + id, seller_obj)
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}

export const calcAvgReview =(pid)=> {
  return axios.put(productMsUrl + '/getrating', {pid:pid})
    .then(response => response.data)
    .catch(error => {
      let err = new Error();
      if (error.response) {
        err.message = error.response.data.message;
      } else {
        err.message = 'Server Error, Please try later';
      }
      throw err;
    })
}
