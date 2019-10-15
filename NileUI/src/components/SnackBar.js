import React, { Component } from 'react'
import { Snackbar } from '@material/react-snackbar';

export default class SnackBar extends Component {
    render() {
        return (
            <React.Fragment>
                <Snackbar message={
                    this.props.message
                } actionText="dismiss" className='normalCase' />
            </React.Fragment>
        )
    }
}
