//Import necessary modules
const validator = require( '../utilities/validator' );
const orderDb = require( '../model/order' );

let orderService = {}

orderService.getOrderByCustomerId = ( customerId ) => {
	// Your code goes here
	return orderDb.getOrderByCustomerId( customerId ).then( data => {
		if( data ) return data;
		else{
			const err = new Error( "Can't find orders" );
			err.status = 406
			throw err;
		}
	} )
}


orderService.getCartByCustomerId = ( customerId ) => {
	return orderDb.getCartByCustomerId( customerId ).then( data => {
		if( data ) return data;
		else{
			const err = new Error( "Can't find cart details" );
			err.status = 406
			throw err;
		}
	} )
}

//replace cart
orderService.updateCartDoc = ( cartObj ) => {
	return orderDb.updateCartDoc( cartObj ).then( status => {
		if( status ) return status;
		else{
			const err = new Error( "Can't update cart" )
			err.status = 406
			throw err;
		}
	} )
}


orderService.placeOrder = ( orderData ) => {
	// Your code goes here
	validator.validateAddress( orderData.address )
	return orderDb.placeOrder( orderData ).then( data => {
		if( data ) return data;
		else{
			const err = new Error( "Can't Place order" )
			err.status = 406
			throw err;
		}
	} )
}

orderService.updateAddr = ( customerId, address ) => {
	// Your code goes here
	return orderDb.updateAddr( customerId, address ).then( data => {
		if( data ) return true;
		else{
			const err = new Error( "Can't update address" )
			err.status = 406
			throw err;
		}
	} )
}


orderService.cancelOrder = ( order ) => {
	// Your code goes here
	return orderDb.cancelOrder( order ).then( data => {
		if( data ) return data;
		else{
			const err = new Error( "Can't Cancel Order" )
			err.status = 406
			throw err;
		}
	} )
}

orderService.confirmation = ( orderId ) => {
	// Your code goes here
	return orderDb.confirmation( orderId ).then( data => {
		if( data ) return true;
		else{
			const err = new Error( "Can't confirm that order is delivered" )
			err.status = 406
			throw err;
		}
	} )
}

//Export orderService as module
module.exports = orderService;
