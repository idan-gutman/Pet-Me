import { connect } from 'react-redux'
import React from 'react'
import { loadPets } from '../store/actions/petActions'
import { onExplore, showSearch } from '../store/actions/userActions'
import { PetList } from '../cmps/PetList'
import userIcon from '../assets/img/loaders/loader_2.svg' // relative path to image
import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 

class _Explore extends React.Component {
    state = {
        isFilterShown: false,
        filterBy: null,
        sortBy: ''
    }
    async componentDidMount() {
        window.scroll(0, 0)
        this.props.onExplore()
        this.props.showSearch()
        await this.onSetFilter()
        await this.props.loadPets(this.state.filterBy)
    }

    onSetSort = () => {
        const { filterBy, sortBy } = this.state
        let filter = {
            ...filterBy,
            sort: sortBy
        }
        this.props.loadPets(filter)
    }
    handleChange = (event) => {
        this.setState({ sortBy: event.target.value },
            () => {
                this.onSetSort()
            })
    }

    onSetFilter = () => {
        const search = new URLSearchParams(this.props.location.search)
        let filterBy = {
            gender: search.get('gender'),
            type: search.get('type'),
            age: search.get('age'),
            size: search.get('size'),
            location: search.get('location'),
        }
        this.setState({ filterBy })
    }

    onToggleFilter = () => {
        this.setState({ isFilterShown: !this.state.isFilterShown }
        )
    }

    render() {
        const { pets } = this.props
        const { isFilterShown, filterBy, sortBy } = this.state
        if (!pets) return <img src={userIcon} alt="loading" />
        if (!filterBy) return <img src={userIcon} alt="loading" />
        return (
            <section className="main-container explore-container">

                {/* {!isFilterShown && <div className="explore-search">
                    <span onClick={() => this.onToggleFilter()} > Start your search</span>
                    <div className="search-btn-explore">
                        <img className="filter-search" src={ magnifyingGlass } alt="glass" />
                    </div>
                </div>} */}

                {/* {isFilterShown && <PetFilter />} */}
                {/* <section className="sort-by"> */}
                {/* <FormControl className={classes.formControl}> */}
                {/* </section> */}

                <div className="filter-description">
                    {!filterBy.type && <h1 >Our pets</h1>}
                    {filterBy.type && <h1>Our <span> {filterBy.gender} {filterBy.size}  {filterBy.type}s</span>  </h1>}

                    <div className="sort-form">
                        <label >Sort By</label>
                        <select value={this.state.sortBy} onChange={this.handleChange}>
                            {/* <option value="">Any</option> */}
                            <option value="createdAt">Date</option>
                            <option value="name">Name</option>
                            <option value="likes">Likes</option>
                        </select>
                    </div>
                </div>
                < PetList pets={pets} />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        pets: state.petModule.pets,
        inExplore: state.systemModule.onExplore
    }
}

const mapDispatchToProps = {
    loadPets, onExplore, showSearch
}

export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)
