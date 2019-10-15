import { ADD_PRODUCT_TO_CART, INCREMENT_COUNT_OF_PRODUCT, DECREMENT_COUNT_OF_PRODUCT, FETCH_CART_FROM_BACKEND, REMOVE_PRODUCT_FROM_CART, REMOVE_CART_DATA } from '../actions';

export const cartReducer = (state = { cart: [] }, action) => {
	let myCart = [];
	switch (action.type) {
		case FETCH_CART_FROM_BACKEND:
			state.cart = action.cartObj.prod;
			return state;

		case REMOVE_CART_DATA:
			return { cart: [] };

		case ADD_PRODUCT_TO_CART:
			myCart = state.cart.filter(item => {
				if (item.pid !== action.prodToBeAdded.pid)
					return true;
				else {
					action.prodToBeAdded.count = item.count + 1;
					return false;
				}
			})
			myCart.push(action.prodToBeAdded)
			return { cart: myCart }

		case REMOVE_PRODUCT_FROM_CART:
			myCart = state.cart.filter(prod => {
				if (prod.pid !== action.pid)
					return true;
				return false;
			});
			return { cart: myCart }

		case INCREMENT_COUNT_OF_PRODUCT:
			myCart = state.cart.map(prod => {
				if (prod.pid === action.pid) {
					prod.count++;
					return prod;
				}
				else {
					return prod;
				}
			})
			return { cart: myCart }

		case DECREMENT_COUNT_OF_PRODUCT:
			myCart = state.cart.map(prod => {
				if (prod.pid === action.pid) {
					if (prod.count > 1) prod.count--;
					return prod;
				}
				else {
					return prod;
				}
			})
			return { cart: myCart }

		default:
			return state;
	}
}
