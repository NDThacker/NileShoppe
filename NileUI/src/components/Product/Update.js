import React, { Component } from 'react'
import FileBase64 from 'react-file-base64';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import '../../stylesheets/global.css'
import { compose } from 'redux'
import { Headline6, Subtitle2, } from '@material/react-typography';
import 'bootstrap-4-react'
import { withRouter } from "react-router-dom";
import { updateProduct } from '../../utils/api'
import NavBar from '../NavBar'
import SnackBar from '../SnackBar'
import LinearProgress from '@material/react-linear-progress';
import Error406 from '../Error/Error406'
import { connect } from 'react-redux'
import DeadProps from '../Error/DeadProps'

class UpdateProd extends Component {

    state = {
        formData: this.props.location.state.productData,
        formValid: {
            imgsrc: true,
            price: true,
            discount: true,
            stock: true,
            details: true
        },
        formError: {
            imgsrc: '',
            price: '',
            discount: '',
            stock: '',
            details: ''
        },
        submitActive: true,
        errorMessage: '',
        redirect: false,
        postData: '',
        successMessage: '',
        clicked: false
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let localState = this.state

        if (localState.submitActive) {
            this.setState({ clicked: true }, () => {
                updateProduct(localState.formData).then(
                    response => {
                        this.setState({ successMessage: response, redirect: true, clicked: false })
                    }
                ).catch(
                    err => {
                        let localState = this.state

                        if (err.response) {
                            localState.errorMessage = err.response.data.message
                        } else {
                            localState.errorMessage = err.message
                        }
                        localState.redirect = false
                        localState.clicked = false
                        this.setState({})
                    }
                )
            })
        }
    }

    handleChange = (event) => {
        const fieldName = event.target.name
        const fieldValue = event.target.value
        let localState = this.state
        localState.formData[fieldName] = fieldValue
        this.setState({})
    }

    getData = (event) => {
        const fieldName = event.target.name
        const fieldValue = event.target.value

        this.validate(fieldName, fieldValue)
    }

    getFiles(files) {
        let localState = this.state

        localState.formData.imgsrc = files[0].base64
        localState.formValid.imgsrc = true
        localState.formError.imgsrc = ''

        if (localState.formValid.details && localState.formValid.discount && localState.formValid.imgsrc && localState.formValid.price && localState.formValid.stock) {
            localState.submitActive = true
        }

        this.setState({})
    }

    validate = (fieldName, fieldValue) => {

        let localState = this.state

        switch (fieldName) {

            case 'imgsrc':
                if (fieldValue === '') {
                    localState.formError.imgsrc = 'Please upload an image'
                    localState.formValid.imgsrc = false
                }
                else {
                    localState.formValid.imgsrc = ''
                    localState.formValid.imgsrc = false
                }
                break
            case 'price':
                let val = fieldValue.toString()
                if (fieldValue === '') {
                    localState.formError.price = 'Please fill the above field'
                    localState.formValid.price = false
                }
                else if (-(-fieldValue) < 0) {
                    localState.formError.price = 'Price should be positive'
                    localState.formValid.price = false
                }
                else {
                    localState.formError.price = ''
                    localState.formValid.price = true
                }
                break;
            case 'stock':
                if (fieldValue === '') {
                    localState.formError.stock = 'Please fill the above field'
                    localState.formValid.stock = false
                }
                else if (-(-fieldValue) < 0 || -(-fieldValue) > 100) {
                    localState.formError.stock = 'Stocks should be positive and must not be greater than 100'
                    localState.formValid.stock = false
                }
                else {
                    localState.formError.stock = ''
                    localState.formValid.stock = true
                }
                break;

            case 'discount':
                if (fieldValue === '') {
                    localState.formError.discount = 'Please fill the above field'
                    localState.formValid.discount = false
                }
                else if (-(-fieldValue) < 0 || -(-fieldValue) > 100) {
                    localState.formError.discount = 'Enter discount percentage'
                    localState.formValid.discount = false
                }
                else {
                    localState.formError.discount = ''
                    localState.formValid.discount = true
                }
                break;
            case 'details':
                if (fieldValue === '') {
                    localState.formError.details = 'Please fill the above field'
                    localState.formValid.details = false
                }
                else {
                    localState.formError.details = ''
                    localState.formValid.details = true
                }
                break
            default:
                break
        }

        if (localState.formValid.details && localState.formValid.discount && localState.formValid.imgsrc && localState.formValid.price && localState.formValid.stock) {
            localState.submitActive = true
        }
        this.setState({})
    }

    componentDidMount = () => {
        if (this.props.location.state === undefined) {

        } else {

        }
    }

    render() {

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
                    <div className='container'>
                        <div className='form-container faint-border col-xl-5 col-md-8 col-sm-12 col-xs-12 mt-5'>
                            <div>
                                <form className='col' onSubmit={this.handleSubmit}>
                                    <Headline6 className='text-center'>Update Product</Headline6>
                                    <Subtitle2 className='text-center mb-5'></Subtitle2>
                                    <Subtitle2 className='text-danger text-center mt-3'>{this.state.errorMessage}</Subtitle2>

                                    <TextField
                                        outlined
                                        label='Product Name*'
                                        className='width-100 mr-3'
                                    >
                                        <Input
                                            type='text'
                                            id='pname'
                                            name='pname'
                                            value={this.state.formData.pname}
                                            disabled />
                                    </TextField>

                                    <span className='d-flex mt-3 align-items-center justify-content-between'>
                                        <TextField
                                            outlined
                                            label='Main Category*'
                                            className='width-100 mr-3'
                                        >
                                            <Input
                                                type='text'
                                                id='main'
                                                name='main'
                                                value={this.state.formData.category.main}
                                                disabled />
                                        </TextField>

                                        <TextField
                                            outlined
                                            label='Sub Category*'
                                            className='width-100'
                                        >
                                            <Input
                                                type='text'
                                                id='sub'
                                                name='sub'
                                                value={this.state.formData.category.sub}
                                                disabled />
                                        </TextField>
                                    </span>
                                    <FileBase64
                                        multiple={true}
                                        onDone={this.getFiles.bind(this)} />
                                    <img src={this.state.formData.imgsrc} height='100px' width='100px' alt='' />
                                    <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.imgsrc}</small>
                                    <TextField
                                        outlined
                                        label='Price*'
                                        className='width-100 mt-3'
                                    >
                                        <Input
                                            type='number'
                                            id='price'
                                            name='price'
                                            value={this.state.formData.price}
                                            onChange={this.handleChange}
                                            onBlur={this.getData} />
                                    </TextField>
                                    <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.price}</small>
                                    <TextField
                                        outlined
                                        label='Discount*'
                                        className='width-100 mt-3'
                                    >
                                        <Input
                                            type='number'
                                            id='discount'
                                            name='discount'
                                            value={this.state.formData.discount}
                                            onChange={this.handleChange}
                                            onBlur={this.getData} />
                                    </TextField>
                                    <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.discount}</small>
                                    <TextField
                                        outlined
                                        label='Stock*'
                                        className='width-100 mt-3'
                                    >
                                        <Input
                                            type='number'
                                            id='stock'
                                            name='stock'
                                            value={this.state.formData.stock}
                                            onChange={this.handleChange}
                                            onBlur={this.getData} />
                                    </TextField>
                                    <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.stock}</small>
                                    <TextField
                                        outlined
                                        label='Details*'
                                        className='width-100 mt-3'
                                    >
                                        <Input
                                            type='textarea'
                                            id='details'
                                            name='details'
                                            value={this.state.formData.details}
                                            onChange={this.handleChange}
                                            onBlur={this.getData} />
                                    </TextField>
                                    <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.details}</small>

                                    <span className='d-flex align-items-center justify-content-center mt-3'>
                                        <Button unelevated type='submit' className='primaryColor normalCase'>Update Product</Button>
                                    </span>
                                </form>
                            </div>
                        </div>
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
                {
                    this.state.errorMessage === ''
                        ? null
                        : <SnackBar message={this.state.errorMessage} />
                }
                {
                    this.state.successMessage === ''
                        ? null
                        : <SnackBar message={this.state.successMessage} />
                }
                {
                    this.state.redirect === true
                        ? setTimeout(() => { this.props.history.push('/nile/') }, 2000)
                        : null
                }
            </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => ({
    visitorData: state.loginReducer
})

export default compose(
    withRouter,
    connect(mapStateToProps)
)(UpdateProd)
