import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from "react-router-dom";
import NavBar from '../NavBar'
import { placeOrder } from '../../utils/api'
import { removeCartData } from '../../actions'
import { Subtitle1, Subtitle2 } from '@material/react-typography'
import Button from '@material/react-button';
import TextField, { Input } from '@material/react-text-field';
import Select, { Option } from '@material/react-select';
import SnackBar from '../SnackBar'
import LinearProgress from '@material/react-linear-progress';
import Error406 from '../Error/Error406'
import EmptyCart from '../Error/EmptyCart'

class Checkout extends Component {

    state = {
        address: {

        },
        payMethod: '',
        addressError: {
            houseNo: '',
            city: '',
            landmark: '',
            pincode: '',
            country: '',
            streetName: ''
        },
        paymentMethodError:
        {
            payMethod: ''
        },
        message: '',
        submitActive: false,
        redirect: false,
        clicked: false,
    }

    totoalCost = 0

    onEnhancedChange = (index, item) => {
        return this.setState({ payMethod: item.getAttribute('data-value') }, () => {
            this.validate('payMethod', this.state.payMethod)
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let postData = {
            address: this.state.address,
            payMethod: this.state.payMethod,
            purchase: this.props.cartData.cart,
            customerId: this.props.visitor.userData.id,
            payAmount: this.props.cartItems.grandTotal
        }

        this.setState({ clicked: true }, () => {
            placeOrder(postData).then(
                response => {
                    let localState = this.state
                    localState.message = response
                    localState.redirect = true
                    localState.clicked = true
                    this.props.dispatch(removeCartData())
                    this.setState({})
                }
            ).catch(
                err => {
                    let localState = this.state
                    localState.message = err
                    localState.redirect = false
                    localState.clicked = false
                    this.setState({})
                    
                }
            )
        })
    }

    handleChange = (event) => {
        let localState = this.state
        const fieldName = event.target.name
        const fieldValue = event.target.value

        localState.address[fieldName] = fieldValue
        this.setState({})
        this.validate(fieldName, fieldValue)
    }

    validate = (fieldName, fieldValue) => {
        let localState = this.state

        switch (fieldName) {

            case 'payMethod':
                if (fieldValue === '') {
                    localState.paymentMethodError[fieldName] = 'Please fill the above field'
                } else {
                    localState.paymentMethodError[fieldName] = ''
                }
                break

            case 'houseNo':
                if (fieldValue === '') {
                    localState.addressError[fieldName] = 'Please fill the above field'
                } else {
                    localState.addressError[fieldName] = ''
                }
                break

            case 'landmark':
                if (fieldValue === '') {
                    localState.addressError[fieldName] = 'Please fill the above field'
                } else {
                    localState.addressError[fieldName] = ''
                }
                break

            case 'city':
                if (fieldValue === '') {
                    localState.addressError[fieldName] = 'Please fill the above field'
                } else {
                    localState.addressError[fieldName] = ''
                }
                break

            case 'streetName':
                if (fieldValue === '') {
                    localState.addressError[fieldName] = 'Please fill the above field'
                } else {
                    localState.addressError[fieldName] = ''
                }
                break

            case 'country':
                if (fieldValue === '') {
                    localState.addressError[fieldName] = 'Please fill the above field'
                } else {
                    localState.addressError[fieldName] = ''
                }
                break

            case 'pincode':
                if (fieldValue === '') {
                    localState.addressError[fieldName] = 'Please fill the above field'
                } else {
                    localState.addressError[fieldName] = ''
                }
                break

            default:
                break
        }

        if (localState.addressError.houseNo === '' && localState.addressError.city === '' && localState.addressError.country === '' && localState.addressError.landmark === '' && localState.addressError.pincode === '' && localState.addressError.streetName === '') localState.submitActive = true
        else localState.submitActive = false

        this.setState({})
    }

    componentDidMount = () => {
        this.setState({ address: this.props.visitor.userData.address })
    }

    render() {


        const accessValidator = () => {
            if (this.props.visitor.userType === 'customer') {
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
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="mdc-data-table" style={{ margin: '1rem', position: 'relative', display: 'block' }}>
                            <table className="mdc-data-table__table" aria-label="Dessert calories">
                                <thead>
                                    <tr className="mdc-data-table__header-row">
                                        <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Image</th>
                                        <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Details</th>
                                        <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Count</th>
                                        <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Discount</th>
                                        <th className="mdc-data-table__header-cell" role="columnheader" scope="col">Total Cost(after discount)</th>
                                    </tr>
                                </thead>
                                <tbody className="mdc-data-table__content">
                                    {this.props.cartItems.cartDetails.map(
                                        (item, key) => {
                                            return (<tr key={key} className="mdc-data-table__row">
                                                <td className="mdc-data-table__cell" width='15%'>
                                                    <img src={item.imgsrc} width='100%' alt='' />
                                                </td>
                                                <td className="mdc-data-table__cell">
                                                    <Subtitle1 style={{ fontWeight: '600' }}>{item.pname}</Subtitle1>
                                                    <Subtitle2 className='op-5'>{item.details}</Subtitle2>
                                                </td>
                                                <td className="mdc-data-table__cell">
                                                    <Subtitle2 className='op-5'>x{item.count}</Subtitle2>
                                                </td>
                                                <td className="mdc-data-table__cell">
                                                    <Subtitle2 className='op-5'>{item.discount}%</Subtitle2>
                                                </td>
                                                <td className="mdc-data-table__cell">
                                                    <Subtitle2 className='op-5'>&#8377;{Number(item.costInOrder)}</Subtitle2>
                                                </td>
                                            </tr>)
                                        })
                                    }
                                    <tr>
                                        <td className="mdc-data-table__cell">

                                        </td>
                                        <td className="mdc-data-table__cell">

                                        </td>
                                        <td className="mdc-data-table__cell">

                                        </td>
                                        <td className="mdc-data-table__cell">

                                        </td>
                                        <td className="mdc-data-table__cell">
                                            <Subtitle2 className='mt-3'>&#8377;{this.props.cartItems.grandTotal}</Subtitle2>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <form onSubmit={this.handleSubmit} className='d-flex flex-column col-md-6 col-sm-12 ' >
                            <Select
                                outlined
                                enhanced
                                label='Payment Mode'
                                name='payMethod'
                                value={this.state.payMethod}
                                onEnhancedChange={this.onEnhancedChange}
                            >
                                <Option value=''></Option>
                                <Option value='cod'>Cash on Delivery</Option>
                            </Select>

                            <small className='text-danger'>{this.state.paymentMethodError.payMethod === '' ? null : this.state.paymentMethodError.payMethod}</small>
                            <TextField outlined
                                dense
                                label='House Number'
                                className='width-100 mt-3'>
                                <Input name='houseNo' type='text' value={this.state.address.houseNo} onChange={this.handleChange} />
                            </TextField>
                            <small className='text-danger'>{this.state.addressError.houseNo === '' ? null : this.state.addressError.houseNo}</small>

                            <TextField outlined
                                dense
                                label='Street Name'
                                className='width-100 mt-3'>
                                <Input name='streetName' type='text' value={this.state.address.streetName} onChange={this.handleChange} />
                            </TextField>
                            <small className='text-danger'>{this.state.addressError.streetName === '' ? null : this.state.addressError.streetName}</small>

                            <TextField outlined
                                dense
                                label='Landmark'
                                className='width-100 mt-3'>
                                <Input name='landmark' type='text' value={this.state.address.landmark} onChange={this.handleChange} />
                            </TextField>
                            <small className='text-danger'>{this.state.addressError.landmark === '' ? null : this.state.addressError.landmark}</small>

                            <TextField outlined
                                dense
                                label='City'
                                className='width-100 mt-3'>
                                <Input name='city' type='text' value={this.state.address.city} onChange={this.handleChange} />
                            </TextField>
                            <small className='text-danger'>{this.state.addressError.city === '' ? null : this.state.addressError.city}</small>

                            <TextField outlined
                                dense
                                label='Pincode'
                                className='width-100 mt-3'>
                                <Input name='pincode' type='number' value={this.state.address.pincode} onChange={this.handleChange} />
                            </TextField>
                            <small className='text-danger'>{this.state.addressError.pincode === '' ? null : this.state.addressError.pincode}</small>

                            <TextField outlined
                                dense
                                label='Country'
                                className='width-100 mt-3'>
                                <Input name='country' type='text' value={this.state.address.country} onChange={this.handleChange} />
                            </TextField>
                            <small className='text-danger'>{this.state.addressError.country === '' ? null : this.state.addressError.country}</small>

                            <Button unelevated className='normalCase mt-3' type='submit' value='submit' disabled={!this.state.submitActive} >Submit</Button>
                        </form>
                        {
                            this.state.message === ''
                                ? null
                                : <SnackBar message={this.state.message} />
                        }
                        {
                            this.state.redirect === true
                                ? setTimeout(() => { this.props.history.push('/nile/') }, 2000)
                                : null
                        }
                    </div>
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
        visitor: state.loginReducer,
        cartItems: state.cardProDetailsReducer,
        cartData: state.cartReducer
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps)
)(Checkout)
