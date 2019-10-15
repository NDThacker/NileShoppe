import React from 'react';
// import {withRouter} from 'react-router';
import Menu from '@material-ui/core/Menu';
import { withRouter } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { delete_cookie } from 'sfcookies'
import { logOutAction, handlePushCartToBackend, removeCartData } from '../actions'

function SimpleMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	const contextTypes = {
		router: () => true, // replace with PropTypes.object if you use them
	}

	const fireClick = (event) => {
		const targetName = event.target.getAttribute('name')

		handleClose()
		if (targetName === 'signup') {
			props.history.push('/nile/user/signup')
			// contextTypes.router.history.goBack()
		}
		else if (targetName === 'sellerSignup'){ 
			props.history.push('/nile/seller/signup')
			// contextTypes.props.history.goBack()
		}
		else if (targetName === 'login') {
			props.history.push('/nile/user/login')
			// contextTypes.props.history.goBack()
		}
		else if (targetName === 'sellerLogin') {
			props.history.push('/nile/seller/login')
			// contextTypes.router.history.goBack()
		}
	}

	return (

		props.visitorData.userType === ''
			?
			<div>
				<button aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => {
					handleClick(e)
				}} className="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded" aria-label="More">more_vert</button>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={fireClick} className='pl-4 pr-5 fs-95' name='signup'>Customer SignUp</MenuItem>
					<MenuItem onClick={fireClick} className='pl-4 pr-5 fs-95' name='login'>Customer Login</MenuItem>
					<MenuItem onClick={fireClick} className='pl-4 pr-5 fs-95' name='sellerSignup'>Seller SignUp</MenuItem>	
					<MenuItem onClick={fireClick} className='pl-4 pr-5 fs-95' name='sellerLogin'>Seller Login</MenuItem>
				</Menu>
			</div>
			:
			<div>
				<button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded" aria-label="More">person</button>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem className='pl-4 pr-5 fs-95' onClick={() => {

						handleClose()
						if (props.visitorData.userType === 'customer') {

							handlePushCartToBackend(props.dispatch, { _id: props.visitorData.userData.id, prod: props.cartData.cart });
						}
						props.dispatch(logOutAction())
						props.dispatch(removeCartData())
						delete_cookie('visitorData')
						props.history.push('/nile/')
					}}>Logout</MenuItem>
				</Menu>
			</div>


	);
}

const mapStateToProps = (state) => {
	return {
		visitorData: state.loginReducer,
		cartData: state.cartReducer
	}
}

export default compose(connect(mapStateToProps), withRouter)(SimpleMenu)
