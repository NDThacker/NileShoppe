//import neccessary modules and implement routing as per the requirement
const he = require( 'hydra-express' );
const express = he.getExpress();
const sellerService = require( '../service/seller' )
const route = express.Router();

route.post( '/signup', ( req, res, next ) => {
	sellerService.createSeller( req.body ).then(
		response => { res.json( response ) }
	).catch( e => next( e ) )
} )

route.get( '/getAllSellers', ( req, res, next ) => {
	sellerService.getAllSellers().then(
		response => {
			res.json( response )
		}
	).catch( e => next( e ) )
} )

route.get( '/search/:id', ( req, res, next ) => {
	sellerService.getSellerById( req.params.id ).then(
		response => {
			res.json( response )
		}
	).catch( e => next( e ) )
} )

route.post( '/login', ( req, res, next ) => {
	sellerService.login( req.body ).then(
		response => {
			res.json( response )
		}
	).catch( e => next( e ) )
} )

route.put( '/update/:id', ( req, res, next ) => {
	sellerService.updateById( req.params.id, req.body ).then(
		response => {
			res.json( response )
		}
	).catch( e => next( e ) )
} )

module.exports = route;
