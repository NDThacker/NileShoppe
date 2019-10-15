const userDb = require( '../utilities/connection' )

let userModel = {}

userModel.createUser = ( userData ) => {
	return userDb.getUserCollection().then( db => {
		return db.create( userData ).then( response => {
			// response is an object that contains generated id along with 'userData'
			if( Object.entries( response ).length ) {
				return response;
			}
			else{
				return null;
			}
		}
		)
	}
	)
}

userModel.getAllUsers = () => {
	return userDb.getUserCollection().then(
		db => {
			return db.find( {}, { _id: 0 } ).then( response => {
				if( response.length ) return response;
				else return null;
			}
			)
		}
	)
}

userModel.getUserById = ( userId ) => {
	return userDb.getUserCollection().then(
		db => {
			return db.findOne( { id: userId }, { _id: 0 } ).then( response => {
				// response is an object that contains all details of a user
				if( response ) return response;
				else return null;
			}
			)
		}
	)
}

userModel.login = ( userObj ) => {
	return userDb.getUserCollection().then( db => {
		return db.findOne(
			{
				email: userObj.email,
				password: userObj.password
			}, {
				_id: 0
			}
		).then(
			response => {
				// response is an object that contains all details of a user
				if( response ) {
					return response;
				} else{
					return null;
				}
			}
		)
	}
	)
}

userModel.updateById = ( userId, userObj ) => {
	return userDb.getUserCollection().then( db => {
		return db.replaceOne( { id: userId }, userObj ).then( response => {
			if( response.nModified == 1 ) {
				return userModel.getUserById( userObj.id ).then( searchResponse => {
					// searchResponse is an object that contains all details of a user
					if( searchResponse ) return searchResponse;
					else return null;
				} )
			}
			else return null
		}
		)
	}
	)
}

module.exports = userModel
