import React, { Component } from 'react'
import NavBar from './NavBar'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Carousel from './Carousel'
import { withRouter } from 'react-router-dom'
import ProductCard from './Product/ProductCard'
import { Headline6, Subtitle1 } from '@material/react-typography'
import axios from 'axios'
import LinearProgress from '@material/react-linear-progress';

class Home extends Component {

    _isMounted = false

    state = {
        products: [],
        clicked: false
    }

    componentDidMount = () => {
        this._isMounted = true
        if (this._isMounted && this.props.visitorData.userType === '' || this.props.visitorData.userType === 'customer') {
            this.setState({ clicked: true }, () => {
                axios.get('http://localhost:3001/products/getAllProducts').then(
                    response => {
                        this.setState({ products: response.data, clicked: false })
                    }
                ).catch(
                    err => {
                        this.setState({ clicked: false })
                    }
                )
            })
        } else {
            this.setState({ clicked: false }, () => {
                this.props.history.push('/nile/my-products/')

            })
        }
    }

    componentWillUnmount = () => {
        this._isMounted = false
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <NavBar />
                </header>
                {
                    this.state.clicked === true
                        ? <LinearProgress indeterminate buffer={0.9} progress={0.8} />
                        : null
                }
                <Carousel />
                {
                    this.state.products.length === 0 ? null : <React.Fragment>
                        <Subtitle1 className='ml-3 fs-95-black'>Trending Products</Subtitle1>
                        {
                            this.props.visitorData.userType === 'seller'
                                ? null
                                : <ProductCard productArray={this.state.products} />
                        }
                    </React.Fragment>
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
    connect(mapStateToProps),
    withRouter
)(Home)
