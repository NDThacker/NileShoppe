import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Button from '@material/react-button';
import { connect } from 'react-redux'
import { addProductToCartAction } from '../../actions'
import NavBar from '../NavBar'
import { Headline5, Subtitle1, Subtitle2 } from '@material/react-typography'
import { deleteProduct, calcAvgReview } from '../../utils/api'
import LinearProgress from '@material/react-linear-progress';
import DeadProps from '../Error/DeadProps'

class Display extends Component {

    state = {
        error: {
            delete: ''
        },
        response: {
            delete: ''
        },
        rating: 0,
        clicked: false
    }

    handleChange = (productId) => {
        this.props.dispatch(addProductToCartAction(productId))
    }

    fireRedirect = (event) => {
        const targetName = event.currentTarget.getAttribute('name')
        let localState = this.state

        this.setState({ clicked: true }, () => {
            if (targetName === 'update') {
                this.props.history.push({
                    pathname: '/nile/update-product',
                    state: {
                        productData: this.props.location.state.productData
                    }
                })
            } else if (targetName === 'delete') {
                deleteProduct(this.props.location.state.productData._id).then(
                    response => {
                        localState.response.delete = response
                        localState.clicked = false
                        this.setState({}, () => {
                            this.props.history.push('/nile/my-products')
                        })
                    }
                ).catch(
                    err => {
                        if (err.response) {
                            localState.error.delete = err.response.data.message
                            localState.clicked = false
                            this.setState({})
                        } else {
                            localState.error.delete = err.message
                            localState.clicked = false
                            this.setState({})
                        }
                    }
                )
            }
        })
    }

    componentDidMount = () => {
        if (this.props.location.state === undefined) {

        } else {
            calcAvgReview(this.props.location.state.productData._id).then(
                rating => {
                    this.setState({ rating: rating.avgRating })
                }
            ).catch(
                err => {
                }
            )
        }
    }

    componentWillUnmount = () => {
        if (this.props.location.history === undefined) {

        } else {
            this.props.location.history.replace('', null)
        }
    }

    render() {

        const hasProps = () => {
            if (this.props.location.state === undefined) {
                return false
            } else {
                return true
            }
        }

        let mainJsx = () => {
            return (
                <React.Fragment>
                    <div className='container wrapper-2'>
                        <div className=' product-img'>
                            <img src={this.props.location.state.productData.imgsrc} width="100%" className='m-1 animateFromBottom br-10' alt='' />
                        </div>
                        <div className='product-desc d-flex flex-column'>
                            <Subtitle1 style={{ opacity: '0.5' }}>{this.props.location.state.productData.category.main}</Subtitle1>
                            <span className=''>
                                <Headline5 style={{ fontWeight: '600' }}>{this.props.location.state.productData.pname}</Headline5>
                                <span className='d-flex mb-5'><Headline5>&#8377;{this.props.location.state.productData.price}</Headline5></span>
                            </span>

                            <Subtitle2 style={{ opacity: '0.8' }} className='m-0'>{this.state.rating}<i className="fas fa-star" style={{ color: '#f7be16' }}></i></Subtitle2>
                            <Subtitle2 style={{ opacity: '0.8' }} className='m-0'>{this.props.location.state.productData.details}</Subtitle2>
                            <Subtitle2 style={{ opacity: '0.8' }}>Quantity available: {this.props.location.state.productData.stock}</Subtitle2>

                            <span>
                                <img src={this.props.location.state.productData.imgsrc} width="10%" className='m-1' alt='' />
                                <img src={this.props.location.state.productData.imgsrc} width="10%" className='m-1' alt='' />
                                <img src={this.props.location.state.productData.imgsrc} width="10%" className='m-1' alt='' />
                                <img src={this.props.location.state.productData.imgsrc} width="10%" className='m-1' alt='' />
                            </span>
                            {

                                (this.props.visitor.userType === 'customer')
                                    ? <span className='mt-5'>
                                        <Button unelevated className='primaryColor normalCase' onClick={() => this.handleChange(this.props.location.state.productData._id)}>Add to cart</Button>
                                    </span>
                                    : (this.props.visitor.userType === 'seller') ?
                                        <span className='mt-5'>
                                            <Button unelevated name='update' className='primaryColor normalCase mr-3' onClick={this.fireRedirect}>Update</Button>
                                            <Button unelevated name='delete' className='primaryColor normalCase' onClick={this.fireRedirect}>Delete</Button>
                                        </span>
                                        : <span className='mt-5'>
                                            <Button unelevated className='primaryColor normalCase' onClick={() => this.props.history.push('/nile/user/login')}>Add to cart</Button>
                                        </span>
                            }
                            {
                                this.props.location.state.productData.reviews.length !== 0
                                    ? <div className='d-flex flex-column mt-5'>
                                        <Subtitle2 style={{ opacity: '0.8' }}>Reviews</Subtitle2>
                                        {
                                            this.props.location.state.productData.reviews.map(
                                                (review, key) => {
                                                    return (
                                                        <div key={key} className='faint-border p-3 mt-3'>
                                                            <Subtitle2>{review.cname}</Subtitle2>
                                                            <span>
                                                                {review.rating} <i className="fas fa-star" style={{ color: '#f7be16' }}></i>
                                                            </span>
                                                            <Subtitle1>{review.comment}</Subtitle1>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </React.Fragment>
            )
        }

        return (
            <div>
                <NavBar />
                {
                    hasProps() === true
                        ? mainJsx()
                        : <DeadProps />
                }
                {
                    this.state.clicked === true
                        ? <LinearProgress indeterminate buffer={0.9} progress={0.8} />
                        : null
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visitor: state.loginReducer,
        cart: state.cartReducer
    }
}

export default compose(
    connect(mapStateToProps),
    withRouter)(Display)
