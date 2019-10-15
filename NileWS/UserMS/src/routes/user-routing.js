//import neccessary modules and implement routing as per the requirement
const he = require( 'hydra-express' );
const express = he.getExpress();
const userService = require( '../service/user' )
const route = express.Router();

route.post( '/signup', ( req, res, next ) => {
	userService.createUser( req.body ).then(
		response => {
			res.json( response )
		}
	).catch( err => {
		next( err )
	}
	)
} )

route.get( '/getAllUsers', ( req, res, next ) => {
	userService.getAllUsers().then(
		response => {
			res.json( { "message": response } )
		}
	).catch( err => {
		next( err )
	}
	)
} )

route.get( '/search/:id', ( req, res, next ) => {
	userService.getUserById( req.params.id ).then(
		response => {
			res.json( response )
		}
	).catch( err => {
		next( err )
	}
	)
} )

route.post( '/login', ( req, res, next ) => {
	userService.login( req.body ).then(
		response => {
			res.json( response )
		}
	).catch( err => {
		next( err )
	}
	)
} )

route.put( '/update/:id', ( req, res, next ) => {
	userService.updateById( req.params.id, req.body ).then(
		response => {
			res.json( response )
		}
	).catch( err => {
		next( err )
	}
	)
} )

module.exports = route;
