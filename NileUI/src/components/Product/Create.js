import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../NavBar'
import FileBase64 from 'react-file-base64';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import '../../stylesheets/global.css'
import { Headline6, Subtitle2, } from '@material/react-typography';
import 'bootstrap-4-react'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getMainCategories, getSubCategories } from '../../utils/api'
import Select, { Option } from '@material/react-select';
import SnackBar from '../SnackBar'
import LinearProgress from '@material/react-linear-progress';
import EmptyCart from '../Error/EmptyCart'
import Error406 from '../Error/Error406'

class Create extends Component {

    state = {
        formData: {
            pname: '',
            category: {
                main: '',
                sub: ''
            },
            sid: this.props.visitorData.userData.id,
            imgsrc: '',
            price: '',
            discount: 0,
            stock: '',
            details: ''
        },
        formValid: {
            pname: false,
            category: {
                main: false,
                sub: false
            },
            sid: true,
            imgsrc: false,
            price: false,
            discount: true,
            stock: false,
            details: false
        },
        formError: {
            pname: '',
            category: {
                main: '',
                sub: ''
            },
            sid: '',
            imgsrc: '',
            price: '',
            discount: '',
            stock: '',
            details: ''
        },
        submitActive: false,
        errorMessage: '',
        successMessage: '',
        redirect: false,
        postData: {},
        mCategories: [],
        sCategory: { sub: [] },
        clicked: false
    }


    componentDidMount = () => {
        getMainCategories().then(res => {
            let localState = this.state
            localState.mCategories = res
            this.setState({})
        })
    }

    onEnhancedChange = (index, item) => {
        let selM = this.state.formData;
        let fvalid = this.state.formValid
        fvalid.category.main = true;
        selM.category.main = item.getAttribute('data-value')
        selM.category.sub = '';
        this.setState({ formData: selM, formValid: fvalid }, () => {
            this.validate('main', this.state.formData.category.main)
            getSubCategories(this.state.formData.category.main).then(subCat => {
                let localState = this.state
                localState.sCategory = subCat
                this.setState({})
            })
        })

    };

    onEnhancedSubChange = (index, item) => {
        let selectedSub = this.state.formData;
        let fvalid = this.state.formValid
        fvalid.category.sub = true;
        selectedSub.category.sub = item.getAttribute('data-value')
        this.setState({ formData: selectedSub, formValid: fvalid }, () => {
            this.validate('sub', this.state.formData.category.sub)
        })

    };

    handleSubmit = (e) => {
        e.preventDefault()

        let localState = this.state

        if (localState.submitActive) {

            let postData = {
                pname: localState.formData.pname,
                main: localState.formData.category.main,
                sub: localState.formData.category.sub,
                sid: this.props.visitorData.userData.id,
                imgsrc: localState.formData.imgsrc,
                price: localState.formData.price,
                discount: localState.formData.discount,
                stock: localState.formData.stock,
                details: localState.formData.details
            }

            this.setState({ clicked: true }, () => {
                axios.post('http://localhost:3001/products/addproduct', postData).then(
                    response => {
                        let localState = this.state
                        localState.errorMessage = ''
                        localState.successMessage = response.data.message
                        localState.redirect = true
                        localState.postData = response.data
                        localState.clicked = false
                        this.setState({})
                    }
                ).catch(err => {
                    if (err.response) {
                        let localState = this.state
                        localState.errorMessage = err.response.data.message
                        localState.redirect = false
                        localState.successMessage = ''
                        localState.clicked = false
                        this.setState({})
                    } else {
                        let localState = this.state
                        localState.errorMessage = 'Server Error'
                        localState.redirect = false
                        localState.successMessage = ''
                        localState.clicked = false
                        this.setState({})
                    }
                })
            })
        } else {
            localState.errorMessage = 'Please fill all the fields'
            localState.clicked = false
            this.setState({})
        }
    }

    handleChange = (event) => {
        const fieldName = event.target.name
        const fieldValue = event.target.value
        let localState = this.state

        if (fieldName === 'main') {
            localState.formData.category.main = fieldValue
        }
        else if (fieldName === 'sub') {
            localState.formData.category.sub = fieldValue;

        } else {
            localState.formData[fieldName] = fieldValue
        }
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

        if (localState.formValid.category.main && localState.formValid.category.sub && localState.formValid.details && localState.formValid.discount && localState.formValid.imgsrc && localState.formValid.pname && localState.formValid.price && localState.formValid.sid && localState.formValid.stock) {
            localState.submitActive = true
        }

        this.setState({})
    }

    validate = (fieldName, fieldValue) => {

        let localState = this.state

        switch (fieldName) {

            case 'pname':
                if (fieldValue === '') {
                    localState.formError.pname = 'Please fill the above field'
                    localState.formValid.pname = false
                } else {
                    localState.formError.pname = ''
                    localState.formValid.pname = true
                }
                break;
            case 'main':
                if (fieldValue === '') {
                    localState.formError.category.main = 'Please fill in both the fields'
                    localState.formValid.category.main = false
                } else {
                    localState.formError.category.main = ''
                    localState.formValid.category.main = true
                }
                break
            case 'sub':
                if (fieldValue === '') {
                    localState.formError.category.main = 'Please fill in both the fields'
                    localState.formValid.category.sub = false
                } else {
                    localState.formError.category.main = ''
                    localState.formValid.category.sub = true
                }
                break

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
                break
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
                break
            default:
                break
        }

        if (localState.formValid.category.main && localState.formValid.category.sub && localState.formValid.details && localState.formValid.discount && localState.formValid.imgsrc && localState.formValid.pname && localState.formValid.price && localState.formValid.sid && localState.formValid.stock) {
            localState.submitActive = true
        }

        this.setState({})

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
                                    <Headline6 className='text-center'>Add Product</Headline6>
                                    <Subtitle2 className='text-center mb-5'></Subtitle2>
                                    <Subtitle2 className='text-danger text-center mt-3'>{this.state.errorMessage}</Subtitle2>

                                    <TextField
                                        outlined
                                        label='Product Name'
                                        className='width-100 mr-3'
                                    >
                                        <Input
                                            type='text'
                                            id='pname'
                                            name='pname'
                                            value={this.state.formData.pname}
                                            onChange={this.handleChange}
                                            onBlur={this.getData} />
                                    </TextField>
                                    <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.pname}</small>
                                    <span className='d-flex mt-3 align-items-center justify-content-between mb-3'>
                                        <Select
                                            outlined
                                            enhanced
                                            label='Main Categories*'
                                            id='main'
                                            className='width-100 mr-3'
                                            name='main'
                                            value={this.state.formData.category.main}
                                            onEnhancedChange={this.onEnhancedChange}
                                            onBlur={this.getData}
                                        >
                                            <Option value='' disabled>-- Select Main categories --</Option>

                                            {this.state.mCategories.map((ele, key) => {
                                                return <Option key={key} value={ele.main} > {ele.main} </Option>
                                            })}

                                        </Select>
                                        <Select
                                            outlined
                                            enhanced
                                            label='Sub Categories*'
                                            id='sub'
                                            name='sub'
                                            className='width-100'
                                            value={this.state.formData.category.sub}
                                            onEnhancedChange={this.onEnhancedSubChange}
                                            onBlur={this.getData}
                                        >
                                            <Option value='' disabled>-- Select sub categories --</Option>
                                            {
                                                this.state.sCategory === {} ? null :
                                                    (this.state.sCategory.sub.map((ele, key) => {
                                                        return <Option key={key} value={ele} > {ele} </Option>
                                                    }))}
                                        </Select>
                                    </span>
                                    <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.category.main}</small>
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
                                        <Button unelevated type='submit' className='primaryColor normalCase'>Add Product</Button>
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
                    this.state.successMessage === ''
                        ? null
                        : <SnackBar message={this.state.successMessage} />
                }
                {
                    this.state.errorMessage === ''
                        ? null
                        : <SnackBar message={this.state.errorMessage} />
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

const mapStateToProps = (state) => {
    return {
        visitorData: state.loginReducer
    }
}

export default compose(
    connect(mapStateToProps)
)(Create)
