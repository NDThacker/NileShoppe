const he = require( 'hydra-express' );
const express = he.getExpress();
const router = express.Router();
const orderService = require( '../service/order' )
const hydra = he.getHydra();

router.get( '/getorders/:customerId', ( req, res, next ) => {
	orderService.getOrderByCustomerId( req.params.customerId ).then( data => {
		res.json( data )
	} ).catch( err => {
		next( err )
	} )
} )

router.put( '/getCartByCustomerId', ( req, res, next ) => {
	orderService.getCartByCustomerId( req.body.cid ).then( data => {
		res.json( data );
	} ).catch( err => {
		next( err )
	} )
} )

router.put( '/updateAddr', ( req, res, next ) => {
	orderService.updateAddr( req.body.cid, req.body.address ).then( data => {
		if( data ) res.json( { "message": "address successfully updated" } );
	} ).catch( err => {
		next( err )
	} )
} )

router.put( '/updatecart', ( req, res, next ) => {
	orderService.updateCartDoc( req.body ).then( data => {
		if( data ) res.json( { "message": "Cart updated" } )
	} ).catch( err => {
		next( err )
	} )
} )


router.put( '/confirmation', ( req, res, next ) => {
	orderService.confirmation( req.body.oid ).then( data => {
		if( data ) res.json( { "message": "Your order is delivered" } );
	} ).catch( err => {
		next( err )
	} )
} )



router.put( '/cancelorder', ( req, res, next ) => {
	let order = req.body;
	let message2 = hydra.createUMFMessage( {
		to: "productms:[put]/products/updatestockall",
		from: "orderms",
		body: { purchase: order.purchase }
	} )
	hydra.makeAPIRequest( message2 ).then( result => {
		if( result.statusCode === 200 ) {
			orderService.cancelOrder( order ).then( status => {
				if( status ) res.json( { "message": "Order cancelled" } )
			} ).catch( err => next( err ) )
		}
	} )

} )

router.put( '/placeorder', ( req, res, next ) => {
	let order = req.body;
	
	let inobj = { purchase: order.purchase }
	
	let message1 = hydra.createUMFMessage( {
		to: "productms:[put]/products/checkstockall",
		from: "orderms",
		body: inobj
	} )
	hydra.makeAPIRequest( message1 ).then( result => {
		
		
		if( result.statusCode === 200 ) {
			let message2 = hydra.createUMFMessage( {
				to: "productms:[put]/products/updatestockallnegative",
				from: "orderms",
				body: inobj
			} )
			hydra.makeAPIRequest( message2 ).then( result => {
				if( result.statusCode === 200 ) {
					orderService.placeOrder( order ).then( data => {
						if( data ) res.json( { "message": "Order placed!" } )
					} ).catch( err => next( err ) )
				}
				else{
					res.json( { "message": "error occured while placing" } )
				}
			} )
		}
		else{
			res.json( { "message": "Not enough stocks.." } )
		}
	} )

} )

module.exports = router;
