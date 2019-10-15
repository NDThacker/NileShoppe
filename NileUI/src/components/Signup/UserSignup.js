import React, { Component } from 'react'
import axios from 'axios'
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import '../../stylesheets/global.css'
import { Headline6, Subtitle2, } from '@material/react-typography';
import 'bootstrap-4-react'
import { withRouter } from "react-router-dom";
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
			address: {
				houseNo: '',
				streetName: '',
				landmark: '',
				city: '',
				pincode: '',
				country: ''
			}
		},
		formValid: {
			firstName: false,
			lastName: false,
			email: false,
			password: false,
			phoneNumber: false,
			address: {
				houseNo: false,
				streetName: false,
				landmark: false,
				city: false,
				pincode: false,
				country: false
			}
		},
		formError: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			phoneNumber: '',
			address: {
				houseNo: '',
				streetName: '',
				landmark: '',
				city: '',
				pincode: '',
				country: ''
			}
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
				axios.post('http://localhost:1000/user/signup', postData).then(
					response => {
						localState.errorMessage = ''
						localState.successMessage = 'Profile created successfully'
						localState.redirect = true
						localState.postData = response.data
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
			localState.clicked = false
			this.setState({})
		}
	}

	handleChange = (event) => {
		const fieldName = event.target.name
		const fieldValue = event.target.value
		let localState = this.state

		if (fieldName.includes('address')) {
			if (fieldName.includes('houseNo')) localState.formData['address']['houseNo'] = fieldValue
			else if (fieldName.includes('streetName')) localState.formData['address']['streetName'] = fieldValue
			else if (fieldName.includes('landmark')) localState.formData['address']['landmark'] = fieldValue
			else if (fieldName.includes('city')) localState.formData['address']['city'] = fieldValue
			else if (fieldName.includes('pincode')) localState.formData['address']['pincode'] = fieldValue
			else if (fieldName.includes('country')) localState.formData['address']['country'] = fieldValue
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
			case 'address houseNo':
				if (fieldValue === '') {
					localState.formError.address.houseNo = 'Please enter password'
					localState.formValid.address.houseNo = false
				}
				else {
					localState.formError.address.houseNo = ''
					localState.formValid.address.houseNo = true
				}
				break
			case 'address streetName':
				if (fieldValue === '') {
					localState.formError.address.streetName = 'Please enter password'
					localState.formValid.address.streetName = false
				}
				else {
					localState.formError.address.streetName = ''
					localState.formValid.address.streetName = true
				}
				break

			case 'address landmark':
				if (fieldValue === '') {
					localState.formError.address.landmark = 'Please enter password'
					localState.formValid.address.landmark = false
				}
				else {
					localState.formError.address.landmark = ''
					localState.formValid.address.landmark = true
				}
				break
			case 'address city':
				if (fieldValue === '') {
					localState.formError.address.city = 'Please enter password'
					localState.formValid.address.city = false
				}
				else {
					localState.formError.address.city = ''
					localState.formValid.address.city = true
				}
				break
			case 'address pincode':
				if (fieldValue === '') {
					localState.formError.address.pincode = 'Please enter password'
					localState.formValid.address.pincode = false
				}
				else {
					localState.formError.address.pincode = ''
					localState.formValid.address.pincode = true
				}
				break
			case 'address country':
				if (fieldValue === '') {
					localState.formError.address.country = 'Please enter password'
					localState.formValid.address.country = false
				}
				else {
					localState.formError.address.country = ''
					localState.formValid.address.country = true
				}
				break
			default:
				break
		}

		if (localState.formValid.firstName && localState.formValid.lastName && localState.formValid.email && localState.formValid.password && localState.formValid.phoneNumber && localState.formValid.address.houseNo && localState.formValid.address.streetName && localState.formValid.address.landmark && localState.formValid.address.city && localState.formValid.address.pincode && localState.formValid.address.country) {
			localState.submitActive = true
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
								<Subtitle2 className='text-center mb-5'>to start shopping</Subtitle2>
								<Subtitle2 className='text-danger text-center mt-3'>{this.state.errorMessage}</Subtitle2>

								<span className='d-flex align-items-center justify-content-between'>
									<TextField
										outlined
										label='First Name*'
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
									label='House No*'
									className='width-100 mt-3'
								>
									<Input
										type='text'
										id='houseNo'
										name='address houseNo'
										value={this.state.formData.address.houseNo}
										onChange={this.handleChange}
										onBlur={this.getData} />
								</TextField>
								<small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.address.houseNo}</small>
								<TextField
									outlined
									label='Street Name*'
									className='width-100 mt-3'
								>
									<Input
										type='text'
										id='streetName'
										name='address streetName'
										value={this.state.formData.address.streetName}
										onChange={this.handleChange}
										onBlur={this.getData} />
								</TextField>
								<small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.address.streetName}</small>
								<TextField
									outlined
									label='Landmark*'
									className='width-100 mt-3'
								>
									<Input
										type='text'
										id='landmark'
										name='address landmark'
										value={this.state.formData.address.landmark}
										onChange={this.handleChange}
										onBlur={this.getData} />
								</TextField>
								<small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.address.landmark}</small>
								<TextField
									outlined
									label='Pincode*'
									className='width-100 mt-3'
								>
									<Input
										type='number'
										id='pincode'
										name='address pincode'
										value={this.state.formData.address.pincode}
										onChange={this.handleChange}
										onBlur={this.getData} />
								</TextField>
								<small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.address.pincode}</small>
								<TextField
									outlined
									label='City*'
									className='width-100 mt-3'
								>
									<Input
										type='text'
										id='city'
										name='address city'
										value={this.state.formData.address.city}
										onChange={this.handleChange}
										onBlur={this.getData} />
								</TextField>
								<small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.address.city}</small>
								<TextField
									outlined
									label='Country*'
									className='width-100 mt-3'
								>
									<Input
										type='text'
										id='country'
										name='address country'
										value={this.state.formData.address.country}
										onChange={this.handleChange}
										onBlur={this.getData} />
								</TextField>
								<small className='mdc-typography mdc-typography--subtitle2 text-danger'>{this.state.formError.address.country}</small>

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
						? setTimeout(() => { this.props.history.push('/nile/user/login') }, 2000)
						: null
				}

			</React.Fragment >
		)
	}
}

withRouter(Login)
