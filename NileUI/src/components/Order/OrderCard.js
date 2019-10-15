import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getProductById, addReview, cancelOrder } from '../../utils/api'
import { Headline6, Subtitle1, Subtitle2 } from '@material/react-typography'
import Button from '@material/react-button'
import TextField, { Input } from '@material/react-text-field';
import SnackBar from '../SnackBar'
import LinearProgress from '@material/react-linear-progress'

class OrderCard extends Component {

    _isMounted = false

    state = {
        productData: [],
        viewProducts: false,
        formData: [],
        errorMessage: '',
        successMessage: '',
        clicked: false
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }

    fetchProductDetails = (productArray) => {
        let productData = []
        let formData = []
        let isActive = []
        let error = []
        let redirect = []
        this.setState({ clicked: true }, () => {
            if (this._isMounted === true) {
                productArray.map((item, index) => {
                    getProductById(item.pid).then(
                        response => {
                            productData.push({ ...response, count: item.count })
                            formData.push({
                                ['star' + index]: '',
                                ['comment' + index]: '',
                            })
                            error.push({
                                ['star' + index]: '',
                                ['comment' + index]: '',
                            })
                            redirect.push({
                                [index]: false
                            })
                            isActive.push(true)
                        }
                    ).catch(
                        err => {
                            this.setState({ clicked: false })
                        }
                    )
                })
            }
            setTimeout(() => this.setState({ productData, formData, viewProducts: true, isActive, redirect, error, clicked: false }), 3000);
        })
    }

    validate = (fieldName, fieldValue, index) => {

        let localState = this.state

        if (fieldName.includes('star')) {
            if (Number(fieldValue) >= 1 && Number(fieldValue) <= 5) {
                localState.error[index][fieldName] = ''
                this.setState({})
            } else {
                localState.error[index][fieldName] = 'Rating should be between 1 and 5'
                this.setState({})
            }
        }

        if (localState.error[index][fieldName] === '') {
            localState.redirect[index] = true
            this.setState({})
        } else {
            localState.redirect[index] = false
            this.setState({})
        }
    }

    submitReview(e, id, cindex) {
        e.preventDefault()

        addReview({ pid: id, cname: this.props.visitorData.userData.firstName, comment: this.state.formData[cindex]["comment" + cindex], rating: this.state.formData[cindex]["star" + cindex], error: this.state.formData[cindex]["star"] }).then(status => {
            let localState = this.state;
            localState.isActive[cindex] = false
            localState.successMessage = status
            this.setState({})
        }).catch(
            err => {

            }
        )
    }

    handleChange = (event, index) => {
        const fieldName = event.target.name
        const fieldValue = event.target.value
        let localState = this.state

        localState.formData[index][fieldName] = fieldValue
        this.setState({}, () => {
            this.validate(fieldName, fieldValue, index)
        })
    }

    componentDidMount = () => {
        this._isMounted = true
    }

    componentWillUnmount = () => {
        this._isMounted = false
    }

    render() {
        const orderDetails = this.props
        return (
            <React.Fragment>
                {
                    this.state.clicked === true
                        ? <LinearProgress indeterminate buffer={0.9} progress={0.8} />
                        : null
                }
                <div className='wrapper-orderCard'>
                    {
                        orderDetails.visitorData.userType === ''
                            ? 'restricted route'

                            : !this.state.viewProducts
                                ? <React.Fragment>
                                    {orderDetails.orders.map((item, key) => {
                                        return (
                                            <div key={key} className='d-flex flex-column p-3' style={{ border: '1px solid #eee' }}>
                                                <Headline6 style={{ fontWeight: '600' }}>{item._id}</Headline6>
                                                <Subtitle2 className='op-5'>Status:  &nbsp;{item.status}</Subtitle2>
                                                <Subtitle2 className='op-5'>Amount:  &nbsp;&#8377;{item.payAmount}</Subtitle2>
                                                <Subtitle2 className='op-5'>Payment Mode:  &nbsp;{item.payMethod}</Subtitle2>
                                                <Subtitle2 className='op-5'>City:  &nbsp;{item.address.city}</Subtitle2>

                                                {
                                                    item.status.toLowerCase() !== 'cancelled'
                                                        ?
                                                        <span className='d-flex'>
                                                            <Button unelevated className='normalCase' onClick={() => this.fetchProductDetails(item.purchase)}>View More</Button>
                                                            <Button className='normalCase btn-danger ml-3' onClick={() => {
                                                                cancelOrder(item).then(
                                                                    response => {
                                                                    }
                                                                ).catch(
                                                                    err => {
                                                                        if (err.response) {


                                                                        } else {

                                                                        }
                                                                    }
                                                                )
                                                            }}>Cancel Order</Button>
                                                        </span>

                                                        : null
                                                }
                                            </div>
                                        )
                                    })}

                                </React.Fragment>
                                :
                                <div className='wrapper'>
                                    {this.state.productData.map(
                                        (pItem, cindex) => {
                                            return (
                                                <div className='d-flex flex-column'>
                                                    <div className='d-flex align-items-start justify-content-center'>
                                                        <img src={pItem.imgsrc} width='40%' height='auto' alt='' className='mr-3' />
                                                        <div>
                                                            <Subtitle1 style={{ fontWeight: '600' }}>{pItem.pname}</Subtitle1>
                                                            <Subtitle2 className='op-5'>&#8377;{
                                                                pItem.discount === null
                                                                    ? pItem.price
                                                                    : (Number(pItem.price) - (Number(pItem.price) / Number(pItem.discount)))
                                                            }</Subtitle2>
                                                            <Subtitle2 className='op-5'>x{pItem.count}</Subtitle2>
                                                            <Subtitle2 className='op-5'>{pItem.details}</Subtitle2>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex flex-column'>
                                                        {
                                                            this.state.isActive[cindex] ? <form onSubmit={this.handleSubmit} className='d-flex flex-column'>
                                                                <Subtitle2 className='op-5'>Add your review</Subtitle2>
                                                                <TextField outlined dense label='Rating between 1 and 5'>
                                                                    <Input type='number' name={'star' + cindex} value={this.state.formData[cindex]['star' + cindex]} onChange={(e) => { this.handleChange(e, cindex) }} placeholder='Should be between 1 and 5' />
                                                                </TextField>
                                                                <TextField outlined dense textarea>
                                                                    <Input name={'comment' + cindex} value={this.state.formData[cindex]['comment' + cindex]} onChange={(e) => { this.handleChange(e, cindex) }} />
                                                                </TextField><br />
                                                                < Button disabled={
                                                                    this.state.redirect !== undefined
                                                                        ? this.state.redirect[cindex] === true
                                                                            ? false
                                                                            : true
                                                                        : null
                                                                } outlined className='normalCase' type='submit' value='submit' onClick={(e) => { this.submitReview(e, pItem._id, cindex) }} >Submit</Button>
                                                            </form> : null
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )}
                                    <div>
                                        <Button className='normalCase' unelevated onClick={() => this.setState({ viewProducts: false })}>Go back</Button>
                                    </div>
                                </div>
                    }
                </div>
                {
                    this.state.successMessage === ''
                        ? null
                        : <SnackBar message={this.state.successMessage} />
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
)(OrderCard)
