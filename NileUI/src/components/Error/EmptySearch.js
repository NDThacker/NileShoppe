import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Headline4, Subtitle1 } from '@material/react-typography'
import Button from '@material/react-button'
import search from '../../icons/search.png'

class EmptySearch extends Component {

    fireClick = () => {
        if ( this.props.visitorData.userType === 'seller' ) {
            this.props.history.push('/nile/seller/login')
        } else {
            this.props.history.push('/nile/user/login')
        }
    }

    render() {

        const style = {
            padding: '1rem',
            margin: '1rem'
        }

        return (
            <div style={style} className='d-flex flex-column align-items-center'>
                <div className='d-flex flex-column align-items-center pt-5 pb-5'>
                    <img src={search} width='10%' style={{opacity: '.5'}} className='mb-3' />
                    <Headline4 className='mb-5'>No products found</Headline4>
                    <Subtitle1 className='fs-95-black'>
                        Please refine your search
                </Subtitle1>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    visitorData: state.loginReducer
})

export default compose(
    connect(mapStateToProps),
    withRouter
)(EmptySearch)
