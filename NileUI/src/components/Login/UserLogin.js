import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import { handleCustomerLogin } from '../../actions'
import '../../stylesheets/global.css'
import { Headline6, Subtitle2 } from '@material/react-typography';
import 'bootstrap-4-react'
import { Link, Redirect } from "react-router-dom";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'
import NavBar from '../NavBar'
import SnackBar from '../SnackBar'
import LinearProgress from '@material/react-linear-progress'

class Login extends Component {

    state = {
        sessionEmail: '',
        sessionPassword: '',
        emailError: '',
        passwordError: '',
        formError: '',
        redirect: false,
        clicked: false
    }

    handleSubmit = (e) => {
        e.preventDefault()

        let localState = this.state
        let postData = {
            email: localState.sessionEmail,
            password: localState.sessionPassword
        }

        localState.formError = ''
        localState.redirect = false
        localState.clicked = true
        this.setState({}, () => {
            handleCustomerLogin(this.props.dispatch, postData).then(
                status => {
                    let localState = this.state
                    if (this.props.message.errorMessage === '') {
                        bake_cookie('visitorData', this.props.visitorData)
                        localState.redirect = true;
                        this.setState({})

                    } else {
                        localState.formError = this.props.message.errorMessage
                        localState.redirect = false
                        localState.clicked = false
                        this.setState({})
                    }
                }
            ).catch(err => {
                if (err.response) {
                    localState.formError = err.response.data.message
                    this.setState({})

                } else {
                    localState.formError = err.message
                    this.setState({})
                }
            })
        })
    }

    getData = (event) => {
        const fieldName = event.target.name
        const fieldValue = event.target.value

        this.validate(fieldName, fieldValue)
    }

    validate = (fieldName, fieldValue) => {

        let localState = this.state
        const emailPattern = /([a-z.0-9]+)(@)([a-z]+)([.])([a-z]{2,3})/gi

        switch (fieldName) {
            case 'email':
                if (fieldValue === '') {
                    localState.emailError = 'Please provide your email'
                }
                else if (!(emailPattern).test(fieldValue)) {
                    localState.emailError = 'Please enter a valid email'
                } else {
                    localState.emailError = ''
                }
                break

            case 'password':
                if (fieldValue === '') {
                    localState.passwordError = 'Please enter password'
                }
                else {
                    localState.passwordError = ''
                }
                break
            default:
                break
        }

        this.setState({})

    }

    render() {
        return (
            <React.Fragment>
                <NavBar />
                {
                    this.state.clicked === true
                        ? <LinearProgress indeterminate buffer={0.9} progress={0.8} />
                        : null
                }
                <div className='container'>
                    <div className='form-container faint-border col-xl-5 col-md-8 col-sm-12 col-xs-12 mt-5'>
                        <div>
                            <form className='col' onSubmit={this.handleSubmit}>
                                <Headline6 className='text-center mb-5'>Sign In</Headline6>
                                <Subtitle2 className='text-danger text-center mt-3'>{this.state.formError}</Subtitle2>
                                <TextField
                                    outlined
                                    label='Email'
                                    className='width-100 rm-border'
                                >
                                    <Input
                                        type='email'
                                        id='email'
                                        name='email'
                                        value={this.state.sessionEmail}
                                        onChange={(e) => this.setState({ sessionEmail: e.target.value })}
                                        onBlur={this.getData} />
                                </TextField>
                                <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.emailError}</small>
                                <TextField
                                    outlined
                                    label='Password'
                                    className='width-100 mt-3'
                                >
                                    <Input
                                        type='password'
                                        id='password'
                                        name='password'
                                        value={this.state.sessionPassword}
                                        onChange={(e) => this.setState({ sessionPassword: e.target.value })}
                                        onBlur={this.getData} />
                                </TextField>
                                <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.passwordError}</small>
                                <span className='d-flex align-items-center justify-content-center mt-3'>
                                    <Button unelevated type='submit' className='primaryColor normalCase'>Login</Button>
                                </span>
                            </form>
                        </div>
                        <div>
                            <Subtitle2 className='text-center'>or</Subtitle2>
                            <Link to='/nile/user/signup'><Subtitle2 className='text-center'>Create an acoount</Subtitle2></Link>
                        </div>
                    </div>
                </div>

                {
                    this.state.formError === ''
                        ? null
                        : <SnackBar message={this.state.formError} />
                }
                {
                    this.state.redirect === true
                        ? this.props.history.push('/nile/')
                        : null
                }
            </React.Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visitorData: state.loginReducer,
        message: state.messageReducer
    }
}

export default connect(mapStateToProps)(Login)
