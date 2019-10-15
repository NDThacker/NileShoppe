import React, { Component } from 'react'
import NavBar from '../NavBar'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { getProductsByMainCategory } from '../../utils/api'
import ProductCard from './ProductCard'
import EmptySearch from '../Error/EmptySearch'
// import { Headline6, Subtitle1 } from '@material/react-typography'

// import LinearProgress from '@material/react-linear-progress';

class Category extends Component {

	_isMounted = false
	_didUpdate = false

	state = {
		products: [],
		clicked: false

	}

	componentDidUpdate = () => {
		//console.log("in did update");
		if (this.props.location.state.clicked) {
			getProductsByMainCategory(this.props.location.state.category).then(
				productArray => {
					this.setState({ products: productArray, clicked: true }, () => {
					})
				}
			).catch(
				err => {
					this.setState({ clicked: true })
				}
			)
			this.props.history.replace({ pathname: "/nile/category", state: {} })
		}
	}


	componentDidMount = () => {
		//console.log("in did mount");
		getProductsByMainCategory(this.props.location.state.category).then(
			productArray => {
				this.setState({ products: productArray, clicked: true }, () => {
				})
			}
		).catch(
			err => {
				this.setState({ clicked: true })
			}
		)
	}


	render() {
		//console.log("in redner");
		return (
			<React.Fragment>

				<NavBar />

				{
					this.state.products.length === 0
						? <EmptySearch />
						: <ProductCard productArray={this.state.products} />
				}

				{/* {
                    this.state.clicked === true
                        ? <LinearProgress indeterminate buffer={0.9} progress={0.8} />
                        : null
                } */}

				{/* {
                    this.state.products.length === 0 ? null : <React.Fragment>
                        <Subtitle1 className='ml-3 fs-95-black'>Trending Products</Subtitle1>
                        {
                            this.props.visitorData.userType === 'seller'
                                ? null
                                : <ProductCard productArray={this.state.products} />
                        }
                    </React.Fragment>
                } */}
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		visitorData: state.loginReducer
	}
}

export default compose(
	connect(mapStateToProps),
	withRouter
)(Category)
