import React from 'react'
import { connect } from 'react-redux'
import { PetFilter } from './PetFilter'
import { showSearch, hideSearch } from '../store/actions/userActions'

export class _FilterDynamic extends React.Component {
    state = {
        isFilterShown: true
    }

    async componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll',this.handleScroll)
    }

    handleScroll = () => {
        if (window.pageYOffset > 50) {
            this.props.showSearch()
            if (this.state.isFilterShown) {
                this.setState({ isFilterShown: false })
            }
        } else {
            if (!this.state.isFilterShown) {
                this.props.hideSearch()
                this.setState({ isFilterShown: true })
            }
        }
    }

    onToggleFilter = () => {
        this.setState({ isFilterShown: !this.state.isFilterShown }
        )
    }

    render() {
        const { isFilterShown } = this.state
        return (
            <>
                {isFilterShown && <PetFilter />}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = {
    showSearch, hideSearch
}

export const FilterDynamic = connect(mapStateToProps, mapDispatchToProps)(_FilterDynamic)