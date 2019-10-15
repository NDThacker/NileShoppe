import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Subtitle1, Subtitle2, Body2 } from '@material/react-typography'
import { connect } from 'react-redux'
import { compose } from 'redux'
import NavBar from '../NavBar'
import DeadProps from '../Error/DeadProps'

class ProductCard extends Component {
    render() {

        const hasProps = () => {
            if (this.props.productArray === undefined || this.props.productArray.length === 0) {
                return false
            } else {
                return true
            }
        }

        let mainJsx = () => {
            return (
                <React.Fragment>
                    <div className='wrapper'>
                        {this.props.productArray.map((product, index) => {
                            return (
                                <div className='customCard' key={index}>
                                    <div>
                                        <Link to={{
                                            pathname: '/nile/view-product',
                                            state: {
                                                productData: product,
                                                userType: this.props.visitorData.userType
                                            }
                                        }}><img src={product.imgsrc} className='customCard-image br-10' width='100%' alt='' /></Link>
                                    </div>
                                    <div className='customCard-body'>
                                        <span className='mt-3'>
                                            <Subtitle1 style={{ fontWeight: '600' }}>{product.pname}</Subtitle1>
                                            {
                                                product.discount.toString() === ''
                                                    ? null
                                                    : <Subtitle2 style={{ color: 'red' }}>{product.discount}% OFF!</Subtitle2>
                                            }
                                        </span>
                                        {/* <Subtitle2 className='op-5 m-0'>{product.details}</Subtitle2> */}
                                        <Subtitle2 className='op-5 m-0'>&#8377;{product.price}</Subtitle2>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                {
                    hasProps() === true
                        ? mainJsx()
                        : <DeadProps />
                }
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
    connect(mapStateToProps)
)(ProductCard)
