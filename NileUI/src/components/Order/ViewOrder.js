import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { getOrdersByCustomerId } from '../../utils/api'
import { connect } from 'react-redux'
import NavBar from '../NavBar'
import OrderCard from './OrderCard'
import LinearProgress from '@material/react-linear-progress'
import Error406 from '../Error/Error406'

class ViewOrder extends Component {
    state = { orderData: [], clicked: false }

    fetchOrderData = (cid) => {
        this.setState({ clicked: true }, () => {
            getOrdersByCustomerId(cid).then(orderData => {
                this.setState({ orderData: orderData, clicked: false });
            }).catch(
                err => {

                }
            )
        })
    }

    componentDidMount = () => {
        this.fetchOrderData(this.props.visitor.userData.id);
    }

    render() {

        const accessValidator = () => {
            if (this.props.visitor.userType === 'customer') {
                return true
            } else {
                return <Error406 />
            }
        }

        let mainJsx = () => {
            return (
                <React.Fragment>
                    {
                        this.state.clicked === true ?
                            <div className='d-flex align-items-start' style={{ zIndex: '10', position: 'absolute', height: 'auto', width: '100%', background: 'rgba(255, 255, 255, .5)' }}>
                                <LinearProgress indeterminate buffer={0.9} progress={0.8} />
                            </div>
                            : null
                    }
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                <NavBar />
                {
                    accessValidator() === true
                        ? mainJsx()
                        : <Error406 />
                }
                <OrderCard orders={this.state.orderData} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visitor: state.loginReducer,
        cart: state.cartReducer
    }
}

export default compose(withRouter, connect(mapStateToProps))(ViewOrder)
