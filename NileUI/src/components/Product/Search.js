import React, { Component } from 'react'
import { compose } from 'redux'
import NavBar from '../NavBar'
import { getAllProducts, getProductsByName } from '../../utils/api'
import ProductCard from './ProductCard'
import Button from '@material/react-button'
import LinearProgress from '@material/react-linear-progress';
import EmptySearch from '../Error/EmptySearch'

class Search extends Component {

    state = {
        search: {
            query: '',
            mainCategory: '',
            subCategory: '',
            result: []
        },
        mainCategoryArray: [],
        subCategoryArray: [],
        clicked: false,
        subClicked: false
    }

    handleChange = (event) => {
        const fieldName = event.target.name
        const fieldValue = (event.target.value).trim()
        let localState = this.state

        localState.search[fieldName] = fieldValue
        this.setState({})
    }

    fireSearch = (event) => {

        event.preventDefault()

        let localState = this.state
        localState.search.result = []
        localState.clicked = true
        localState.subClicked = false
        this.setState({}, () => {
            let localState = this.state
            if (localState.search.query === '') {
                getAllProducts().then(
                    response => {
                        localState.search.result = response
                        localState.clicked = false
                        localState.subClicked = true
                        this.setState({})
                    }
                ).catch(
                    err => {
                        this.setState({ clicked: false, subClicked: true })
                        
                    }
                )
            } else {
                getProductsByName(localState.search.query).then(
                    response => {
                        localState.search.result = response
                        localState.clicked = false
                        localState.subClicked = true
                        this.setState({})
                    }
                ).catch(
                    err => {
                        this.setState({ clicked: false, subClicked: true })
                        
                    }
                )
            }
        })
    }

    render() {

        const hasProducts = () => {
            if (this.state.search.result.length === 0) {
                return false
            } else {
                return true
            }
        }

        let mainJsx = () => {
            return (
                <React.Fragment>
                    <form onSubmit={this.fireSearch} className='d-flex align-items-center'>
                        <input className='searchField fs-95' type='text' onChange={this.handleChange} name='query' placeholder='Search Products by category, name' />
                        <Button unelevated className='normalCase' type='submit'> Search </Button>
                    </form>
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
                {mainJsx()}
                {this.state.subClicked === true
                    ? hasProducts() === true
                        ? <ProductCard productArray={this.state.search.result} />
                        : <EmptySearch />
                    : null}
            </React.Fragment>
        )
    }
}

export default compose(
)(Search)
