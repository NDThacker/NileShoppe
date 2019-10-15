import React, { Component } from 'react'
import NavBar from '../NavBar'
import { getProductById } from '../../utils/api'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { decrementCountOfProduct, incrementCountOfProduct, removeProductFromCart, addCartProdDetails } from '../../actions'
import { Subtitle1, Subtitle2 } from '@material/react-typography'
import Button from '@material/react-button';
import SnackBar from '../SnackBar'
import LinearProgress from '@material/react-linear-progress';
import Error406 from '../Error/Error406'
import EmptyCart from '../Error/EmptyCart'

class Cart extends Component {

    state = {
        productData: [],
        clicked: false,
        message: ''
    }

    handleIncrement = (pid) => {
        this.props.dispatch(incrementCountOfProduct(pid))
    }

    handleDecrement = (pid) => {
        this.props.dispatch(decrementCountOfProduct(pid))
    }

    handleDeletion = (pid) => {
        this.props.dispatch(removeProductFromCart(pid))
        let products = this.state.productData;
        products = products.filter(prod => prod._id !== pid);
        this.setState({ productData: products, message: 'Product removed' })
    }

    componentDidMount = () => {
        this.setState({ productData: [], clicked: true }, () => {
            if (this.props.cartData.cart.length === 0) {
                this.setState({ clicked: false })
            } else {
                this.props.cartData.cart.map(item => {
                    
                    getProductById(item.pid).then(
                        response => {
                            this.setState({ productData: this.state.productData.concat({ ...response }), clicked: false })
                        }
                    ).catch(
                        err => {
                            
                        }
                    )
                })
            }
        })
    }

    render() {

        const accessValidator = () => {
            if (this.props.visitorData.userType === 'customer') {
                return true
            } else {
                return <Error406 />
            }
        }

        const cartHasItems = () => {
            if (this.props.cartData.cart.length === 0) {
                return false
            }
            else {
                return true
            }
        }

        let mainJsx = () => {
            return (
                <React.Fragment>
                    <div className='wrapper'>
                        {this.state.productData.map(
                            (item, key) => {
                                return <div key={key} className=''>
                                    <div className='d-flex flex-column' style={{}}>
                                        <img src={item.imgsrc} alt='' width='100%' />
                                        <div className=''>
                                            <Subtitle1 style={{ fontWeight: '600' }}>{item.pname}</Subtitle1>
                                            <Subtitle2 className='op-5 m-0 mb-3'>&#8377;{item.price}</Subtitle2>
                                            <Subtitle2 className='op-5 m-0 '>Quantity</Subtitle2>
                                            <span className='d-flex align-items-center'>
                                                <Button outlined onClick={() => this.handleIncrement(item._id)}>+</Button>
                                                <Subtitle2 className='mb-0 ml-3 mr-3'>{this.props.cartData.cart[key].count}</Subtitle2>
                                                <Button outlined disabled={this.props.cartData.cart[key].count === 1 ? true : false} onClick={() => this.handleDecrement(item._id)}>-</Button>
                                            </span>
                                        </div>
                                        <div>
                                            <Button outlined className='normalCase mt-3 w-100' onClick={() => this.handleDeletion(item._id)}>remove</Button>
                                        </div>
                                    </div>
                                </div>
                            }
                        )}
                    </div>
                    <div>
                        {
                            this.state.productData.length !== 0
                                ? <Button unelevated className='normalCase mt-3 ml-3' onClick={() => {
                                    this.props.dispatch(addCartProdDetails(this.state.productData, this.props.cartData.cart))
                                    this.props.history.push("/nile/checkout");
                                }}>Checkout</Button>
                                : null
                        }
                        {
                            this.state.message === ''
                                ? null
                                : <SnackBar message={this.state.message} />
                        }
                    </div>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <NavBar />
                {
                    this.state.clicked === true ?
                        <div className='d-flex align-items-start' style={{ zIndex: '10', position: 'absolute', height: 'auto', width: '100%', background: 'rgba(255, 255, 255, .5)' }}>
                            <LinearProgress indeterminate buffer={0.9} progress={0.8} />
                        </div>
                        : null
                }
                {
                    accessValidator() === true
                        ? cartHasItems() === true
                            ? mainJsx()
                            : <EmptyCart />
                        : <Error406 />
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visitorData: state.loginReducer,
        cartData: state.cartReducer,
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(Cart)
