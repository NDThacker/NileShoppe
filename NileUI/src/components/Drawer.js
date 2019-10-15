import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { logOutAction } from '../actions'
import { delete_cookie } from 'sfcookies'
import { removeCartData, handlePushCartToBackend } from '../actions'
import { getMainCategories } from '../utils/api'

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
});

function TemporaryDrawer(props) {
	const classes = useStyles();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (side, open) => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setState({ ...state, [side]: open });
	};

	const userArray = ['my-orders', 'cart', 'user/update']
	const sellerArray = ['my-products', 'add-product', 'seller/update']

	// const handleSearch = (mcat) => {
	// 	getProductsByMainCategory(mcat).then(prodArr => {
	// 		props.history.push({
	// 			pathname: "/nile/category",
	// 			state: { prodArr }
	// 		})
	// 	})
	// }

	let categoryArray = []

	getMainCategories().then(
		categories => {
			categoryArray.push(categories.main)
		}
	).catch(err => {

	})

	const sideList = side => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}
		>
			{(props.visitorData.userType === 'customer') ?
				<List>
					{['Your Orders', 'Your Cart', 'Edit Account'].map((text, index) => (
						<ListItem button key={text} onClick={() => props.history.push('/nile/' + userArray[index])}>
							{/* <i className="fas fa-box-open color-7e ml-3" ></i> */}
							<ListItemText primary={text} className='ml-3' onClick={() => props.history.push('/nile/' + userArray[index])} />
						</ListItem>
					))}
				</List>
				: (props.visitorData.userType === '')
					? null
					:
					<List>
						{['Your Products', 'Add Product', 'Edit Account'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemText primary={text} className='ml-3' onClick={() => props.history.push('/nile/' + sellerArray[index])} />
							</ListItem>
						))}
					</List>
			}
			<Divider />
			{props.visitorData.userType !== 'seller'
				? <List>
					{['Electronics', 'Clothes', 'Furniture', 'Footwear'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemText primary={text} className='ml-3' onClick={() => {
								props.history.push({
									pathname: "/nile/category",
									state: { category: text, clicked: true }
								})
							}} />
						</ListItem>
					))}
				</List>
				: null
			}
			<Divider />
			{
				(props.visitorData.userType === 'customer')
					? <List>
						<ListItem button key='Logout' onClick={() => {
							if (props.visitorData.userType === 'customer') {

								handlePushCartToBackend(props.dispatch, { _id: props.visitorData.userData.id, prod: props.cartData.cart });
							}
							props.dispatch(logOutAction())
							props.dispatch(removeCartData())
							delete_cookie('visitorData')
							props.history.push('/nile/')
						}}>
							<ListItemText primary='Logout' className='ml-3' />
						</ListItem>
					</List>
					: (props.visitorData.userType === '')
						? <List>
							<ListItem button key='Login' onClick={() => props.history.push('/nile/user/login')} >
								<ListItemText primary='Login' className='ml-3' />
							</ListItem>
							<ListItem button key='Signup' onClick={() => props.history.push('/nile/user/signup')} >
								<ListItemText primary='Signup' className='ml-3' />
							</ListItem>
						</List>
						: null
			}
		</div>
	);

	return (
		<div>
			<button className="mdc-icon-button material-icons mdc-top-app-bar__navigation-icon--unbounded" onClick={toggleDrawer('left', true)}>menu</button>
			<Drawer open={state.left} onClose={toggleDrawer('left', false)}>
				{sideList('left')}
			</Drawer>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		visitorData: state.loginReducer,
		cartData: state.cartReducer
	}
}

export default compose(
	withRouter,
	connect(mapStateToProps)
)(TemporaryDrawer)
