import React, { Component } from "react";
// import { compose } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
import { login } from './actions/'
import Home from './components/Home'
import UserLogin from './components/Login/UserLogin'
import SellerLogin from './components/Login/SellerLogin'
import SellerSignup from './components/SignUp/SellerSignup'
import UserSignup from './components/SignUp/UserSignup'
import ProductCreate from './components/Product/Create'
import Display from './components/Product/Display'
import Cart from './components/Product/Cart'
import Popover from './components/Popover'
import Checkout from './components/Product/Checkout'
import Search from './components/Product/Search'
import MyProducts from './components/Product/MyProducts'
import ViewOrders from './components/Order/ViewOrder'
import UpdateProduct from './components/Product/Update'
import UserUpdate from './components/Update/UserUpdate'
import SellerUpdate from './components/Update/SellerUpdate'
import SnackBar from './components/SnackBar'
import Error406 from './components/Error/Error406'
import Category from './components/Product/Category';

class App extends Component {

  render() {

    const userDataFromCookie = read_cookie('visitorData')

    if (userDataFromCookie.length === 0) {

    } else {
      const visitorData = userDataFromCookie
      this.props.dispatch(login(visitorData.userData))

    }

    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/nile" component={Home} />
            <Route exact path="/nile/user/login" component={UserLogin} />
            <Route exact path="/nile/seller/login" component={SellerLogin} />
            <Route exact path="/nile/seller/signup" component={SellerSignup} />
            <Route exact path="/nile/user/signup" component={UserSignup} />
            <Route exact path="/nile/add-product" component={ProductCreate} />
            <Route exact path="/nile/my-products" component={MyProducts} />
            <Route exact path='/nile/update-product' component={UpdateProduct} />
            <Route exact path="/nile/view-product" component={Display} />
            <Route exact path="/nile/cart" component={Cart} />
            <Route exact path="/nile/checkout" component={Checkout} />
            <Route exact path="/nile/user/update" component={UserUpdate} />
            <Route exact path="/nile/seller/update" component={SellerUpdate} />
            <Route exact path="/nile/trash" component={Popover} />
            {/* <Route exact path="/nile/trash-a" component={SingleProduct} /> */}
            <Route exact path="/nile/search" component={Search} />
            <Route exact path="/nile/my-orders" component={ViewOrders} />
            <Route exact path="/nile/snackbar" component={SnackBar} />
            <Route exact path="/nile/error" component={Error406} />
			<Route exact path="/nile/category" component={Category} />
			
            <Route path="/**" render={() => {
              return <Redirect to="/nile" />
            }} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  visitorData: state.loginReducer
})

export default connect(mapStateToProps)(App);
