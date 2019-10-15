import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Headline4, Subtitle1 } from '@material/react-typography'
import Button from '@material/react-button'
import dead from '../../icons/dead.png'

class Error406 extends Component {

    fireClick = () => {
        this.props.history.push('/nile/')
    }

    render() {

        const style = {
            // borderRadius: '5px',
            // backgroundColor: 'rgba(126, 126, 126, .05)',
            padding: '1rem',
            margin: '1rem'
        }

        return (
            <div style={style} className='d-flex flex-column align-items-center'>
                <div className='d-flex flex-column align-items-center pt-5 pb-5'>
                    <img src={dead} width='10%' style={{ opacity: '' }} className='mb-3' />
                    <Headline4 className='mb-5'>Bad Request</Headline4>
                    <Button unelevated className='primaryColor normalCase' onClick={this.fireClick}>Home</Button>
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
)(Error406)
