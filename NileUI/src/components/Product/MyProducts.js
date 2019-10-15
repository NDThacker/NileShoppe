import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getProductsBySellerId } from '../../utils/api'
import NavBar from '../NavBar'
import ProductCard from './ProductCard'
import Error406 from '../Error/Error406'
import LinearProgress from '@material/react-linear-progress';
import EmptyProduct from '../Error/EmptyProduct'

class MyProducts extends Component {

    state = {
        productData: [],
        error: {
            serverError: '',
            mountError: ''
        },
        _isMounted: false,
        clicked: false
    }

    fetchProductDetailsBySellerId = (sellerId) => {
        let localState = this.state

        if (this.state._isMounted) {
            getProductsBySellerId(sellerId).then(
                response => {
                    localState.productData = response
                    localState.clicked = false
                    this.setState({})
                }
            ).catch(
                err => {
                    if (err.response) {
                        localState.error.serverError = err.response.data.message
                    } else {
                        localState.error.serverError = err.message
                    }
                    localState.clicked = false
                    this.setState({})
                }
            )
        }
    }

    componentDidMount = () => {
        this.setState({ _isMounted: true, clicked: true }, () => {
            this.fetchProductDetailsBySellerId(this.props.visitorData.userData.id)
        })
    }

    componentWillUnmount = () => {
        let localState = this.state

        localState._isMounted = false
        this.setState({})
    }

    render() {
        const { productData } = this.state

        const accessValidator = () => {
            if (this.props.visitorData.userType === 'seller') {
                return true
            } else {
                return <Error406 />
            }
        }

        let mainJsx = () => {
            return (
                <React.Fragment>
                    {productData.length === 0 ? <EmptyProduct /> : <ProductCard productArray={productData} />}
                </React.Fragment>
            )
        }


        return (
            <React.Fragment>
                <NavBar />
                {
                    this.state.clicked === true
                        ? <LinearProgress indeterminate buffer={0.9} progress={0.8} />
                        : null
                }
                {
                    accessValidator() === true
                        ? mainJsx()
                        : <Error406 />
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
)(MyProducts)
