import {
    sellerLoginApi, userLoginApi, getCartByCustomerId, updateCart
} from '../utils/api'

export const SET_MESSAGE = 'SET_MESSAGE';
export const STORE_DATA_OF_VISITOR = 'STORE_DATA_OF_VISITOR'
export const INCREMENT_COUNT_OF_PRODUCT = 'INCREMENT_QUANT_OF_PRODUCT'
export const DECREMENT_COUNT_OF_PRODUCT = 'DECREMENT_QUANT_OF_PRODUCT'
export const FETCH_CART_FROM_BACKEND = "FETCH_CART_FROM_BACKEND"
export const REMOVE_PRODUCT_FROM_CART = "REMOVE_PRODUCT_FROM_CART"
export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const ADD_CART_PRODDETAILS = "ADD_CART_PRODDETAILS";
export const REMOVE_CART_DATA = "REMOVE_CART_DATA";
export const UPDATE_USER_DATA = "UPDATE_USER_DATA";
export const LOG_OUT = "DELETE_USER_DATA";

export const setMessageAction = (successMessage, errorMessage) => {
    return {
        type: SET_MESSAGE,
        successMessage,
        errorMessage
    }
}

export const updateUserDataAction = (newUserData) => {
    return {
        type: UPDATE_USER_DATA,
        newUserData
    }
}

export const logOutAction = () => {
    return {
        type: LOG_OUT
    }
}


export const login = (data) => {
    return {
        type: STORE_DATA_OF_VISITOR,
        data
    }
}

export const handlePushCartToBackend = (dispatch, cartObj) => {
	return updateCart(cartObj).then(response => {
	}).catch(err => {
		dispatch(setMessageAction('', err.message))
	})
}


export const handleCustomerLogin = (dispatch, formData) => {
    return userLoginApi(formData).then(userDetails => {
        dispatch(login(userDetails));
		dispatch(setMessageAction('Updated Successfully', ''));
		return getCartByCustomerId(userDetails.id).then(cartObj => {
			dispatch(fetchCartFromBackEnd(cartObj));
		})
    }).catch(err => {
            dispatch(login({}));
            dispatch(setMessageAction('', err.message));
        })
}

export function handleSellerLogin(dispatch, formData) {
    return sellerLoginApi(formData).then((userDetails) => {
        dispatch(login(userDetails));
        dispatch(setMessageAction('Updated Successfully', ''));
    }).catch(err => {
        dispatch(login({}));
        dispatch(setMessageAction('', err.message));
    })
}

export const fetchCartFromBackEnd = (cartObj) => {
    return ({
        type: FETCH_CART_FROM_BACKEND,
        cartObj
    })
}

export const removeProductFromCart = (pid) => {
    return ({
        type: REMOVE_PRODUCT_FROM_CART,
        pid
    })
}

export const addProductToCartAction = (pid) => {

    return {
        type: ADD_PRODUCT_TO_CART,
        prodToBeAdded: { pid: pid, count: 1 }
    }
}

export const incrementCountOfProduct = (pid) => {
    return {
        type: INCREMENT_COUNT_OF_PRODUCT,
        pid: pid
    }
}

export const decrementCountOfProduct = (pid) => {
    return {
        type: DECREMENT_COUNT_OF_PRODUCT,
        pid: pid
    }
}

export function handleFetchCartFromBackEnd(dispatch, cid) {
    return getCartByCustomerId(cid).then(cartObj => {
        dispatch(fetchCartFromBackEnd(cartObj));
    }).catch(err => {
        dispatch(setMessageAction('', err.message));
    })

}

export const addCartProdDetails = (prodData, cartData) => {
    return {
        type: ADD_CART_PRODDETAILS,
        prodData,
        cartData
    }
}
export const removeCartData = () => {
    return {
        type: REMOVE_CART_DATA
    }
}
