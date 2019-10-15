const hydraExpress = require( 'hydra-express' );
const express = hydraExpress.getExpress();
const router = express.Router();
// const hydra = require( 'hydra' );
const productServ = require( '../service/product' )

router.get( '/getAllProducts', ( req, res, next ) => {
	productServ.getAllProducts().then( pdata => {
		res.json( pdata );
	} ).catch( err => {
		next( err );
	} )

} )

router.get( '/getproductsbyid/:pid', ( req, res, next ) => {
	productServ.getProductsById( req.params.pid ).then( pdata => {
		res.json( pdata );
	} ).catch( err => {
		next( err );
	} )

} )

router.get( '/getproductsbyname/:name', ( req, res, next ) => {
	productServ.getProductsByName( req.params.name ).then( pdata => {
		res.json( pdata );
	} ).catch( err => {
		next( err );
	} )

} )

router.post( '/addproduct', ( req, res, next ) => {
	productServ.addProduct( req.body ).then( status => {
		if( status ) res.json( { "message": "Product added" } );
	} ).catch( err => {
		next( err );
	} )
} )

router.get( '/getproductsbymcategory/:mcategory', ( req, res, next ) => {
	productServ.getProductsByMcategory( req.params.mcategory ).then( prods => {
		res.json( prods );
	} ).catch( err => {
		next( err );
	} )
} )

router.get( '/getproductsbyscategory/:scategory', ( req, res, next ) => {
	productServ.getProductsByScategory( req.params.scategory ).then( prods => {
		res.json( prods );
	} ).catch( err => {
		next( err );
	} )
} )


router.get( '/getallscategories', ( req, res, next ) => {
	productServ.getAllSubcategories().then( sdata => {
		res.json( sdata );
	} ).catch( err => {
		next( err );
	} )
} )


router.put( '/updatestockall', ( req, res, next ) => {
	
	productServ.updateStockAll( req.body.purchase ).then( status => {
		if( status ) res.json( { "message": "stock updated" } );
	} ).catch( err => {
		next( err );
	} )
} )

router.put( '/updatestockallnegative', ( req, res, next ) => {
	
	productServ.updateStockAllNegative( req.body.purchase ).then( status => {
		if( status ) res.json( { "message": "stock updated" } );
	} ).catch( err => {
		next( err );
	} )
} )


router.put( '/checkstockall', ( req, res, next ) => {
	
	productServ.checkStockAll( req.body.purchase ).then( status => {
		if( status ) res.json( { "message": "stock available" } );
	} ).catch( err => {
		next( err );
	} )
} )

router.put( '/updateproduct', ( req, res, next ) => {
	productServ.updateProd( req.body ).then( status => {
		if( status ) res.json( { "message": "Product updated" } );
	} ).catch( err => {
		next( err );
	} )
} )

router.delete( '/deleteprod/:pid', ( req, res, next ) => {
	productServ.deleteProd( req.params.pid ).then( status => {
		if( status ) res.json( { "message": "Product deleted" } );
	} ).catch( err => {
		next( err );
	} )
} )

router.get( '/getMcategories', ( req, res, next ) => {
	productServ.getMcategories().then( cdata => {
		res.json( cdata );
	} ).catch( err => {
		next( err );
	} )
} )

router.get( '/getScategories/:mcat', ( req, res, next ) => {
	productServ.getScategories( req.params.mcat ).then( cdata => {
		res.json( cdata );
	} ).catch( err => {
		next( err );
	} )
} )

router.get( '/getreviewsbyproduct/:pid', ( req, res, next ) => {
	productServ.getReviewsByProduct( req.params.pid ).then( rdata => {
		res.json( rdata );
	} ).catch( err => {
		next( err );
	} )
} )

router.get( '/getproductsbysellerid/:sid', ( req, res, next ) => {
	productServ.getProductsBySellerId( req.params.sid ).then( pdata => {
		res.json( pdata );
	} ).catch( err => {
		next( err );
	} )
} )

router.post( '/addreview', ( req, res, next ) => {
	productServ.addReview( req.body ).then( status => {
		if( status ) res.json( { "message": "review submitted" } )
	} ).catch( err => {
		next( err );
	} )
} )

router.put( '/getrating', ( req, res, next ) => {
	productServ.calcAvgReview( req.body.pid ).then( status => {
		res.json( { "avgRating": status } )
	} ).catch( err => {
		next( err );
	} )
} )

module.exports = router;
