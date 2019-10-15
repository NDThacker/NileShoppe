import React, { Component } from 'react'
import axios from 'axios'
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import '../../stylesheets/global.css'
import { Headline6, Subtitle2, } from '@material/react-typography';
import 'bootstrap-4-react'
import NavBar from '../NavBar'
import SnackBar from '../SnackBar'
import LinearProgress from '@material/react-linear-progress';

export default class Login extends Component {


	state = {
		formData: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			phoneNumber: '',
			accountNumber: '',
			tan: '',
			gst: ''
		},
		formValid: {
			firstName: false,
			lastName: false,
			email: false,
			password: false,
			phoneNumber: false,
			accountNumber: false,
			tan: false,
			gst: false
		},
		formError: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			phoneNumber: '',
			accountNumber: '',
			tan: '',
			gst: ''
		},
		submitActive: false,
		errorMessage: '',
		successMessage: '',
		redirect: false,
		postData: {},
		clicked: false
	}

	handleSubmit = (e) => {
		e.preventDefault()

		let localState = this.state

		if (localState.submitActive) {

			let postData = {
				...localState.formData
			}

			this.setState({ clicked: true }, () => {
				let localState = this.state
				axios.post('http://localhost:1000/seller/signup', postData).then(
					response => {
						localState.errorMessage = ''
						localState.redirect = true
						localState.postData = response.data
						localState.successMessage = 'Profile created successfully'
						localState.clicked = false
						this.setState({})
					}
				).catch(err => {
					if (err.response) {
						if (err.response.data.message.match("E11000 duplicate key error"))
							localState.errorMessage = "Email ID already Registered";
						else
							localState.errorMessage = err.response.data.message;
						localState.redirect = false
						localState.successMessage = ''
						localState.clicked = false
						this.setState({})
					} else {
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
			case 'email':
				if (fieldValue === '') {
					localState.formError.email = 'Please provide your email'
					localState.formValid.email = false
				}
				else if (!(/([a-z.0-9]+)(@)([a-z]+)([.])([a-z]{2,3})/gi).test(fieldValue)) {
					localState.formError.email = 'Please enter a valid email'
					localState.formValid.email = false
				} else {
					localState.formError.email = ''
					localState.formValid.email = true
				}
				break

			case 'password':
				if (fieldValue === '') {
					localState.formError.password = 'Please enter password'
					localState.formValid.password = false
				}
				else if (!(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!*$%]).{8,20}/).test(fieldValue)) {
					localState.formError.password = 'Password should contain at least one uppercase, at least one lowercase, at least one digit. It should also contain a special character amongst - !, @, #, $, %, ^, &, *'
					localState.formValid.password = false
				}
				else {
					localState.formError.password = ''
					localState.formValid.password = true
				}
				break
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
			case 'tan':
				if (fieldValue === '') {
					localState.formError.tan = 'Please fill the above field'
					localState.formValid.tan = false
				} else if (!(/(AAAA)([0-9]{5})([A-Z])/gi).test(fieldValue)) {
					localState.formError.tan = 'Invalid value'
					localState.formValid.tan = false
				} else {
					localState.formError.tan = ''
					localState.formValid.tan = true
				}
				break;
			case 'gst':
				if (fieldValue === '') {
					localState.formError.gst = 'Please fill the above field'
					localState.formValid.gst = false
				} else if (!(/([0-9]{2})([a-z]{5})([0-9]{4})([a-z]{1})([0-9]{1})([a-z]{1})([0-9]{1})/gi).test(fieldValue)) {
					localState.formError.gst = 'Invalid value'
					localState.formValid.gst = false
				} else {
					localState.formError.gst = ''
					localState.formValid.gst = true
				}
				break;
			default:
				break
		}
		if (localState.formValid.firstName && localState.formValid.lastName && localState.formValid.email && localState.formValid.password && localState.formValid.phoneNumber && localState.formValid.accountNumber && localState.formValid.tan && localState.formValid.gst) {
			localState.submitActive = true
		} else {
			localState.submitActive = false
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
								<Headline6 className='text-center'>Sign Up</Headline6>
								<Subtitle2 className='text-center mb-5'>to start selling</Subtitle2>
								<Subtitle2 className='text-danger text-center mt-3'>{this.state.errorMessage}</Subtitle2>

								<span className='d-flex align-items-center justify-content-between'>
									<TextField
										outlined
										label='First Name*'
										className='width-100 mr-3'>
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
										label='Last Name*'
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
								{this.state.formError.firstName != '' && <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.firstName}</small>}
								{this.state.formError.firstName == '' && <small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.lastName}</small>}
								<TextField
									outlined
									label='Email*'
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
									label='Password*'
									className='width-100 mt-3'
								>
									<Input
										type='password'
										id='password'
										name='password'
										value={this.state.formData.password}
										onChange={this.handleChange}
										onBlur={this.getData} />
								</TextField>
								<small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.password}</small>
								<TextField
									outlined
									label='Phone Number*'
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
									label='Account Number*'
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

								<TextField
									outlined
									label='TAN*'
									className='width-100 mt-3'
								>
									<Input
										type='text'
										id='tan'
										name='tan'
										value={this.state.formData.tan}
										onChange={this.handleChange}
										onBlur={this.getData} />
								</TextField>
								<small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.tan}</small>
								<TextField
									outlined
									label='GST*'
									className='width-100 mt-3'
								>
									<Input
										type='text'
										id='gst'
										name='gst'
										value={this.state.formData.gst}
										onChange={this.handleChange}
										onBlur={this.getData} />
								</TextField>
								<small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.gst}</small>
								<span className='d-flex align-items-center justify-content-center mt-3'>
									<Button unelevated type='submit' className='primaryColor normalCase'>Sign Up</Button>
								</span>
								<Subtitle2 className='d-flex align-items-center justify-content-center mt-3'>all &nbsp; <span className="text-danger">*</span> &nbsp; fields are required</Subtitle2>
							</form>
						</div>
					</div>
				</div>
				{
					this.state.errorMessage === ''
						? null
						: <SnackBar message={this.state.errorMessage} />
				}{
					this.state.successMessage === ''
						? null
						: <SnackBar message={this.state.successMessage} />
				}
				{
					this.state.redirect === true
						? setTimeout(() => { this.props.history.push('/nile/seller/login') }, 2000)
						: null
				}
			</React.Fragment>
		)
	}
}
