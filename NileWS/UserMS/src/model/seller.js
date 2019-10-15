const sellerDb = require( '../utilities/connection' )

let sellerModel = {}

sellerModel.createSeller = ( sellerData ) => {
	return sellerDb.getSellerCollection().then(
		db => {
			return db.create( sellerData ).then(
				response => {
					if( Object.entries( response ).length )
						return response;
					else return null
				} )// response is an object that contains generated id along with 'sellerData'
		} )
}

sellerModel.getAllSellers = () => {
	return sellerDb.getSellerCollection().then(
		db => {
			return db.find( {}, { _id: 0 } ).then(
				response => {
					if( response.length )
						return response;
					else
						return null
				}
			)
		}
	)
}

sellerModel.getSellerById = ( sellerId ) => {
	return sellerDb.getSellerCollection().then(
		db => {
			return db.findOne( { id: sellerId }, { _id: 0 } ).then(
				response => {
					if( response )
						return response;
					else
						return null
				} // response is an object that contains all details of a seller
			)
		}
	)
}

sellerModel.login = ( sellerObj ) => {
	return sellerDb.getSellerCollection().then(
		db => {
			return db.findOne(
				{
					email: sellerObj.email,
					password: sellerObj.password
				}, {
					_id: 0
				}
			).then(
				response => {
					if( response ) {
						return response;
					} else{
						return null; // response is an object that contains all details of a seller
					}
				}
			)
		}
	)
}

sellerModel.updateById = ( sellerId, sellerObj ) => {
	return sellerDb.getSellerCollection().then(
		db => {
			return db.replaceOne( { id: sellerId }, sellerObj ).then(
				response => {
					if( response.nModified == 1 ) {
						return sellerModel.getSellerById( sellerObj.id ).then(
							searchResponse => ( searchResponse ) // searchResponse is an object that contains all details of a seller
						)
					}
					else return null
				}
			)
		}
	)
}

module.exports = sellerModel
