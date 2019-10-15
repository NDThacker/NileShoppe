const sellerModel = require( '../model/seller' )
const validator = require( '../utilities/validator' )

let sellerService = {}

sellerService.createSeller = ( sellerData ) => {
	validator.validateName( sellerData.firstName + ' ' + sellerData.lastName )
	validator.validateEmail( sellerData.email )
	validator.validatePass( sellerData.password )
	validator.validatePhoneNo( sellerData.phoneNumber )
	validator.validAccount( sellerData.accountNumber )
	validator.validateGst( sellerData.gst )
	validator.validateTan( sellerData.tan )
	sellerData.id = 'S' + new Date().getTime()
	return sellerModel.createSeller( sellerData ).then(
		response => {
			if( response )
				return response;
			else{
				let err = new Error( "Cant register" );
				err.status = 406;
				throw err;
			}
		} )
}

sellerService.getAllSellers = () => {
	return sellerModel.getAllSellers().then(
		response => {
			if( response )
				return response;
			else{
				let err = new Error( "No sellers found" );
				err.status = 404;
				throw err;
			}
		}
	)
}

sellerService.getSellerById = ( sellerId ) => {
	return sellerModel.getSellerById( sellerId ).then(
		response => {
			if( response )
				return response;
			else{
				let err = new Error( "No such seller found" );
				err.status = 404;
				throw err;
			}
		}
	)
}

sellerService.login = ( sellerObj ) => {
	return sellerModel.login( sellerObj ).then(
		response => {
			if( response )
				return response;
			else{
				let err = new Error( "Invalid Email or Password" );
				err.status = 406;
				throw err;
			}
		}
	)
}

sellerService.updateById = ( sellerId, sellerObj ) => {
	return sellerModel.updateById( sellerId, sellerObj ).then(
		response => {
			if( response )
				return response;
			else{
				let err = new Error( "Cant update" );
				err.status = 400;
				throw err;
			}
		}
	)
}

module.exports = sellerService
