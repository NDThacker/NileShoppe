import React, { Component } from 'react'
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import '../../stylesheets/global.css';
import 'bootstrap-4-react'
import { sellerUpdateById } from '../../utils/api'
import { Headline6, Subtitle2, } from '@material/react-typography';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { handleSellerLogin } from '../../actions'
import NavBar from '../NavBar'
import SnackBar from '../SnackBar'
import LinearProgress from '@material/react-linear-progress';
import Error406 from '../Error/Error406'

class Update extends Component {
    state = {
        formData: this.props.visitor.userData,
        formValid: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
            accountNumber: true,
        },
        formError: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            accountNumber: '',
        },
        submitActive: true,
        errorMessage: '',
        successMessage: '',
        redirect: false,
        clicked: false
    }

    _isMounted = false

    handleSubmit = (e) => {
        e.preventDefault()

        let localState = this.state

        if (localState.submitActive && this._isMounted) {
            this.setState({ clicked: true }, () => {
                sellerUpdateById(this.state.formData.id, this.state.formData).then(
                    response => {
                        let localState = this.state
                        localState.errorMessage = ''
                        handleSellerLogin(this.props.dispatch, { email: localState.formData.email, password: localState.formData.password }).then(
                            status => {
                                localState.postData = response.data
                                if (this.props.message.errorMessage === '') {
                                    localState.redirect = true
                                    localState.successMessage = this.props.message.successMessage
                                    localState.clicked = false
                                    this.setState({})
                                } else {
                                    localState.redirect = false
                                    localState.successMessage = ''
                                    localState.errorMessage = this.props.message.errorMessage
                                    localState.clicked = false
                                    this.setState({})
                                }
                            }
                        )
                    }
                ).catch(err => {
                    if (err.response) {
                        localState.errorMessage = err.response.data.message
                        localState.redirect = false
                        localState.successMessage = ''
                        localState.clicked = false
                        this.setState({})
                    } else {

                        localState.errorMessage = 'Server Error'
                        localState.successMessage = ''
                        localState.redirect = false
                        localState.clicked = false
                        this.setState({})
                    }
                })
            })
        } else {
            let localState = this.state
            localState.errorMessage = 'Please fill all the fields'
            localState.clicked = false
            this.setState({})
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

    validate = (fieldName, fieldValue) => {

        let localState = this.state

        switch (fieldName) {

            case 'firstName':
                if (fieldValue === '') {
                    localState.formError.firstName = 'Please fill both the above fields'
                    localState.formValid.firstName = false
                }
                else if (!fieldValue.match(/^[a-zA-Z]+$/)) {
                    localState.formError.firstName = 'Name must be alphabetical'
                    localState.formValid.firstName = false
                }
                else {
                    localState.formError.firstName = ''
                    localState.formValid.firstName = true
                }
                break;
            case 'lastName':
                if (fieldValue === '') {
                    localState.formError.lastName = 'Please fill both the above fields'
                    localState.formValid.lastName = false
                }
                else if (!fieldValue.match(/^[a-zA-Z]+$/)) {
                    localState.formError.lastName = 'Name must be alphabetical'
                    localState.formValid.lastName = false
                }
                else {
                    localState.formError.lastName = ''
                    localState.formValid.lastName = true
                }
                break;

            case 'phoneNumber':
                if (fieldValue === '') {
                    localState.formError.phoneNumber = 'Please fill the above field'
                    localState.formValid.phoneNumber = false
                } else if (fieldValue.length < 10 || fieldValue.length > 10) {
                    localState.formError.phoneNumber = 'Invalid value'
                    localState.formValid.phoneNumber = false
                } else {
                    localState.formError.phoneNumber = ''
                    localState.formValid.phoneNumber = true
                }
                break;
            case 'accountNumber':
                if (fieldValue === '') {
                    localState.formError.accountNumber = 'Please fill the above field'
                    localState.formValid.accountNumber = false
                } else if (fieldValue.length < 9 || fieldValue.length > 18) {
                    localState.formError.accountNumber = 'Invalid value'
                    localState.formValid.accountNumber = false
                } else {
                    localState.formError.accountNumber = ''
                    localState.formValid.accountNumber = true
                }
                break;

            default:
                break
        }

        if (localState.formValid.firstName && localState.formValid.lastName && localState.formValid.phoneNumber && localState.formValid.accountNumber) {
            localState.submitActive = true
        } else {
            localState.submitActive = false
        }

        this.setState({})

    }

    componentDidMount = () => {
        this._isMounted = true
    }

    componentWillUnmount = () => {
        this._isMounted = false
    }

    render() {

        const accessValidator = () => {
            if (this.props.visitor.userType === 'seller') {
                return true
            } else {
                return <Error406 />
            }
        }

        let mainJsx = () => {
            return (
                <div className='container'>
                    <div className='form-container faint-border col-xl-5 col-md-8 col-sm-12 col-xs-12 mt-5'>
                        <div>
                            <form className='col' onSubmit={this.handleSubmit}>
                                <Headline6 className='text-center'>Update Profile</Headline6>
                                <span className='d-flex align-items-center justify-content-between'>
                                    <TextField
                                        outlined
                                        label='First Name'
                                        className='width-100 mr-3'
                                    >
                                        <Input
                                            type='text'
                                            id='firstName'
                                            name='firstName'
                                            value={this.state.formData.firstName}
                                            onChange={this.handleChange}
                                            onBlur={this.getData} />
                                    </TextField>
                                    <TextField
                                        outlined
                                        label='Last Name'
                                        className='width-100'
                                    >
                                        <Input
                                            type='text'
                                            id='lastName'
                                            name='lastName'
                                            value={this.state.formData.lastName}
                                            onChange={this.handleChange}
                                            onBlur={this.getData} />
                                    </TextField>
                                </span>
                                {(this.state.errorMessage === "") && <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.firstName}</small>}

                                <TextField
                                    outlined
                                    label='Email'
                                    className='width-100 mt-3'
                                >
                                    <Input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={this.state.formData.email}
                                        onChange={this.handleChange}
                                        onBlur={this.getData} />
                                </TextField>
                                <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.email}</small>
                                <TextField
                                    outlined
                                    label='Phone Number'
                                    className='width-100 mt-3'
                                >
                                    <Input
                                        type='number'
                                        id='phoneNumber'
                                        name='phoneNumber'
                                        value={this.state.formData.phoneNumber}
                                        onChange={this.handleChange}
                                        onBlur={this.getData} />
                                </TextField>
                                <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.phoneNumber}</small>

                                <TextField
                                    outlined
                                    label='Account Number'
                                    className='width-100 mt-3'
                                >
                                    <Input
                                        type='number'
                                        id='accountNumber'
                                        name='accountNumber'
                                        value={this.state.formData.accountNumber}
                                        onChange={this.handleChange}
                                        onBlur={this.getData} />
                                </TextField>
                                <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.accountNumber}</small>
                                <span className='d-flex align-items-center justify-content-center mt-3'>
                                    <Button unelevated type='submit' className='primaryColor normalCase'>Update Profile</Button>
                                </span>
                            </form>
                        </div>

                        <Subtitle2 className='text-danger text-center mt-3'>{this.state.errorMessage}</Subtitle2>
                    </div>
                </div>
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
                }{
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
        visitor: state.loginReducer,
        message: state.messageReducer
    }
}

export default connect(mapStateToProps)(Update)
