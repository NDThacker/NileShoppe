const productModel = require( '../model/product' );
const productObj = require( '../model/productObject' );
const validator = require( '../utilities/validator' );


const productServ = {}

productServ.getAllProducts = () => {
	return productModel.getAllProducts().then( pdata => {
		if( pdata ) return pdata;
		else{
			let err = new Error( "Sorry!!! Can't fetch products" );
			err.status = 404;
			throw err;
		}
	} )
}


productServ.getProductsById = ( pid ) => {
	return productModel.getProductById( pid ).then( pdata => {
		if( pdata ) return pdata;
		else{
			let err = new Error( "No such product" );
			err.status = 404;
			throw err;
		}
	} )
}

productServ.getProductsByName = pname => {
	return productModel.getProductByName( pname ).then( pdata => {
		if( pdata ) return pdata;
		else{
			let err = new Error( "No such product" );
			err.status = 404;
			throw err;
		}
	} )
}

productServ.addProduct = prod => {
	let pOb = new productObj( prod );
	
		validator.validateName( prod.pname );
		validator.validatePrice( prod.price );
		validator.validateStock( prod.stock );

	return productModel.addProduct( pOb ).then( status => {
		if( status ) return true;
		else{
			let err = new Error( "Product cannot be added" );
			err.status = 400;
			throw err;
		}
	} )
}

productServ.getProductsByMcategory = ( mcategory ) => {
	return productModel.getProductsByMcategory( mcategory ).then( prods => {
		if( prods ) {
			return prods;
		}
		else{
			let err = new Error( "No such Products found" );
			err.status = 404;
			throw err;

		}
	} )
}

productServ.getAllSubcategories = () => {
	return productModel.getallSCategories().then( sdata => {
		if( sdata ) return sdata;
		else{
			let err = new Error( "No sub categories" );
			err.status = 404;
			throw err;
		}
	} )
}


productServ.getProductsByScategory = ( scategory ) => {
	return productModel.getProductsByScategory( scategory ).then( prods => {
		if( prods ) {
			return prods;
		}
		else{
			let err = new Error( "No such Products found" );
			err.status = 404;
			throw err;

		}
	} )
}

productServ.updateStockAll = ( prodarr ) => {
	return productModel.updateStockAll( prodarr ).then( status => {
		if( status == true ) return true;
		else{
			let err = new Error( "Cant update" );
			err.status = 406;
			throw err;
		}
	} )
}


productServ.updateStockAllNegative = ( prodarr ) => {
	return productModel.updateStockAllNegative( prodarr ).then( status => {
		if( status == true ) return true;
		else{
			let err = new Error( "Cant update because not enough stock" );
			err.status = 406;
			throw err;
		}
	} )
}



productServ.checkStockAll = ( prodarr ) => {
	return productModel.checkStockAll( prodarr ).then( status => {
		if( status ) return status;
		else{
			let err = new Error( "Cant update because not enough stock" );
			err.status = 406;
			throw err;
		}
	} )
}

productServ.updateProd = ( prod ) => {
	return productModel.updateProduct( prod ).then( status => {
		if( status ) return true;
		else{
			let err = new Error( "Cant update" );
			err.status = 400;
			throw err;
		}
	} )
}


productServ.deleteProd = ( pid ) => {
	return productModel.deleteProduct( pid ).then( status => {
		if( status ) return true;
		else{
			let err = new Error( "Cant delete" );
			err.status = 406;
			throw err;
		}
	} )
}

productServ.getMcategories = () => {
	return productModel.getMcategories().then( cdata => {
		if( cdata ) return cdata;
		else{
			let err = new Error( "Cant retrieve categories" );
			err.status = 404;
			throw err;
		}
	} )
}

productServ.getScategories = ( mcat ) => {
	return productModel.getScategories( mcat ).then( cdata => {
		if( cdata ) return cdata;
		else{
			let err = new Error( "Cant retrieve categories" );
			err.status = 400;
			throw err;
		}
	} )
}


productServ.getReviewsByProduct = ( pid ) => {
	return productModel.getReviews( pid ).then( rdata => {
		if( rdata ) return rdata;
		else{
			let err = new Error( "Cant retrieve reviews" );
			err.status = 400;
			throw err;
		}
	} )
}

productServ.getProductsBySellerId = ( sid ) => {
	return productModel.getProductsBySellerId( sid ).then( pdata => {
		if( pdata ) return pdata;
		else{
			let err = new Error( "No products found" );
			err.status = 404;
			throw err;
		}
	} )
}

productServ.addReview = ( review ) => {
	return productModel.addReview( review ).then( status => {
		if( status ) return status;
		else{
			let err = new Error( "cant submit review" );
			err.status = 406;
			throw err;
		}
	} )
}

productServ.calcAvgReview = ( pid ) => {
	return productModel.calcAvgReview( pid ).then( rating => {
		if( rating ) return rating;

	} )
}

module.exports = productServ;
