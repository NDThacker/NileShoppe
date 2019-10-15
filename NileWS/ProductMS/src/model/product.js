onst dbmodel = require( "../utilities/connection" );

const productModel = {};

//Fetch product by id
productModel.getAllProducts = () => {
	return dbmodel.getProductColl().then( model => {
		return model.find().sort( { discount: -1 } ).then( pdata => {
			if( pdata.length ) {
				return pdata;
			}
			else return null;
		} )
	} )
}


//Fetch product by id
productModel.getProductById = ( pid ) => {
	return dbmodel.getProductColl().then( model => {
		return model.findById( pid ).then( pdata => {
			if( pdata ) return pdata;
			else return null;
		} )
	} )
}

//Fetch product by name
productModel.getProductByName = ( pname ) => {
	let regexp2 = "^.*(" + pname + ").*$";
	let regexp1 = "^" + pname + "$"
	return dbmodel.getCategoriesColl().then( model => {
		return model.findOne( { main: { $regex: new RegExp( regexp1 ), $options: 'sxi' } }, { main: 1, _id: 0 } ).then( mcategory => {
			if( mcategory ) {
				return productModel.getProductsByMcategory( mcategory.main ).then( pdata => {
					if( pdata.length ) {
						return pdata;
					}
					else{
						return null;
					}
				} )
			}
			else{
				return model.findOne( { sub: { $elemMatch: { $regex: new RegExp( regexp1 ), $options: 'sxi' } } }, { sub: 1, _id: 0 } ).then( scategory => {
					if( scategory ) {
						return productModel.getProductsByScategory( pname ).then( pdata => {
							if( pdata.length ) {
								return pdata;
							}
							else{
								return null;
							}
						} )
					}
					else{
						return dbmodel.getProductColl().then( model => {
							return model.find( { pname: { $regex: new RegExp( regexp2 ), $options: 'sxi' } } ).then( pdata => {
								if( pdata ) return pdata;
								else return null;
							} )
						} )
					}
				} )
			}
		} )
	} )
}

//Add a product
productModel.addProduct = ( product ) => {
	return dbmodel.getProductColl().then( model => {
		return model.create( product ).then( pdata => {
			if( Object.entries( pdata ).length ) return true;
			else return false;
		} )
	} )
}

//Fetch products by main category
productModel.getProductsByMcategory = ( mcategory ) => {
	return dbmodel.getProductColl().then( model => {
		return model.find( { "category.main": { $regex: new RegExp( mcategory ), $options: 'sxi' } } ).then( prods => {
			if( prods.length ) return prods;
			else return null;
		} )
	} )
}

//Fetch products by sub category
productModel.getProductsByScategory = ( scategory ) => {
	return dbmodel.getProductColl().then( model => {
		return model.find( { "category.sub": { $regex: new RegExp( scategory ), $options: 'sxi' } } ).then( prods => {
			if( prods.length ) return prods;
			else return null;
		} )
	} )
}

//Update stock of products array
productModel.updateStockAll = ( prodarr ) => {
	return dbmodel.getProductColl().then( model => {
		for( let prod of prodarr ) {
			model.updateOne( { _id: prod.pid }, { $inc: { stock: prod.count } } ).then( pdata => {
				if( pdata.n );
				else return false;
			} )
		}
		return true;
	} )
}

productModel.updateStockAllNegative = ( prodarr ) => {
	return dbmodel.getProductColl().then( model => {
		for( let prod of prodarr ) {
			model.updateOne( { _id: prod.pid }, { $inc: { stock: -prod.count } } ).then( pdata => {
				if( pdata.n );
				else return false;
			} )
		}
		return true;
	} )
}



//check stock of products array
productModel.checkStockAll = async ( prodarr ) => {
	let flag = true;
	let pdata;
	for( let prod of prodarr ) {
		pdata = await productModel.getProductById( prod.pid )
		if( !pdata ) return false;
		if( pdata.stock - prod.count < 0 ) {
			flag = false;
			break;
		}
	}
	return flag;

}



productModel.updateProduct = ( prod ) => {
	return dbmodel.getProductColl().then( model => {
		return model.replaceOne( { _id: prod._id }, prod ).then( pdata => {
			if( pdata.n ) return true;
			else return false;
		} )
	} )
}

productModel.getallScategories = () => {
	return dbmodel.getCategoriesColl().then( model => {
		return model.find( {}, { sub: 1, _id: 0 } ).then( sdata => {
			if( sdata.length ) return true;
			else return false;
		} )
	} )
}


productModel.deleteProduct = ( pid ) => {
	return dbmodel.getProductColl().then( model => {
		return model.deleteOne( { _id: pid } ).then( data => {
			if( data.n ) return true;
			else return false;
		} )
	} )
}

productModel.getMcategories = () => {
	return dbmodel.getCategoriesColl().then( model => {
		return model.find( {}, { "main": 1, _id: 0 } ).then( cdata => {
			if( cdata.length ) {
				return cdata;
			}
			else return null;
		} )
	} )
}

productModel.getScategories = ( mcat ) => {
	return dbmodel.getCategoriesColl().then( model => {
		return model.findOne( { "main": mcat }, { "sub": 1, _id: 0 } ).then( cdata => {
			if( cdata ) {
				return cdata;
			}
			else return null;
		} )
	} )
}

productModel.getReviews = ( pid ) => {
	return dbmodel.getProductColl().then( model => {
		return model.findOne( { _id: pid }, { reviews: 1, _id: 0 } ).then( rdata => {
			if( rdata ) return rdata;
			else return null;
		} )
	} )
}



productModel.getProductsBySellerId = ( sid ) => {
	return dbmodel.getProductColl().then( model => {
		return model.find( { sid: sid } ).then( pdata => {
			if( pdata.length ) return pdata;
			else return null;
		} )
	} )
}

productModel.addReview = ( review ) => {
	return dbmodel.getProductColl().then( model => {
		return model.updateOne( { _id: review.pid }, { $push: { reviews: { cname: review.cname, comment: review.comment, rating: review.rating } } } ).then( data => {
			if( data.n ) return true;
			else return false;
		} )
	} )
}

productModel.calcAvgReview = ( pid ) => {
	return dbmodel.getProductColl().then( model => {
		return model.findOne( { _id: pid }, { _id: 0, reviews: 1 } ).then( data => {
			if( data ) {
				const arr = data.reviews;
				let sum = 0;
				if( arr.length ) {
					arr.forEach( element => {
						sum += element.rating;
					} );
					return( sum / arr.length );
				}
				else return null;
			}
			else return null;
		} )
	} )
}


module.exports = productModel;
