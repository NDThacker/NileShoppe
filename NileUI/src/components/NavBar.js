import React, { Component } from 'react'
import 'material-components-web'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import Popver from './Popover'
import Badge from '@material-ui/core/Badge';
import Drawer from './Drawer'

class NavBar extends Component {

    state = {
        anchorEl: false,
        cart: this.props.cartData.cart
    }

    handleClick = (event) => {
        this.setState({ anchorEl: true })
    }

    handleClose = () => {
        this.setState({ anchorEl: false })
    }

    fireRedirect = (event) => {
        const fieldName = event.target.getAttribute('name')

        if (fieldName === 'nile') this.props.history.push("/nile/");
        else if (fieldName === 'cart') this.props.history.push("/nile/cart");
        else if (fieldName === 'search') this.props.history.push("/nile/search");
    }

    render() {
        return (
            <React.Fragment>
                <header className=" mdc-top-app-bar" style={{ borderBottom: '1.25px solid #eee' }}>
                    <div className="mdc-top-app-bar__row">
                        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                            <Drawer />
                            <span className="mdc-top-app-bar__title forceHover" onClick={this.fireRedirect} name='nile'>Nile</span></section>
                        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-center">
                        </section>
                        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
                            <button className="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded" aria-label="Search" name='search' onClick={this.fireRedirect}>search</button>
                            {this.props.visitorData.userType === 'customer' && <Badge badgeContent={this.props.cartData.cart.length} color='primary'>
                                <button className="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded" aria-label="Shopping Cart" name='cart' onClick={this.fireRedirect}>shopping_cart</button>
                            </Badge>}
                            <Popver />
                        </section>
                    </div>
                </header>
            </React.Fragment>
        )
    }
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
)(NavBar)
