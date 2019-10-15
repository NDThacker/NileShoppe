const userModel = require( '../model/user' )
const validator = require( '../utilities/validator' )

let userService = {}

userService.createUser = ( userData ) => {
	validator.validateName( userData.firstName + ' ' + userData.lastName )
	validator.validateEmail( userData.email )
	validator.validatePass( userData.password )
	validator.validatePhoneNo( userData.phoneNumber )
	userData.id = 'C' + new Date().getTime()
	return userModel.createUser( userData ).then( response => {
		if( response ) return response;
		else{
			let err = new Error( "Can't Create user profile" );
			err.status = 400
			throw err;
		}
	} )
}

userService.getAllUsers = () => {
	return userModel.getAllUsers().then( response => {
		if( response ) return response
		else{
			let err = new Error( "Can't find any user" );
			err.status = 404
			throw err;
		}
	}
	)
}

userService.getUserById = ( userId ) => {
	return userModel.getUserById( userId ).then( response => {
		if( response ) return response;
		else{
			let err = new Error( "Can't find any user with this id" );
			err.status = 404
			throw err;
		}
	}
	)
}

userService.login = ( userObj ) => {
	return userModel.login( userObj ).then( response => {
		if( response ) return response;
		else{
			let err = new Error( "Invalid Credentials!!!!" );
			err.status = 406
			throw err;
		}
	}
	)
}

userService.updateById = ( userId, userObj ) => {
	return userModel.updateById( userId, userObj ).then( response => {
		if( response ) return response;
		else{
			let err = new Error( "Can't Update" );
			err.status = 400
			throw err;
		}
	}
	)
}

module.exports = userService
