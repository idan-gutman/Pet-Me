import magnifyingGlass from '../assets/img/svg/magnifying-glass.svg' // relative path to image 
import { withRouter } from 'react-router-dom'
import React from 'react'
import { FilterSelect } from './FilterSelect'
import SearchIcon from '@material-ui/icons/Search';



class _PetFilter extends React.Component {

    state = {
        filterBy: {
            gender: '',
            type: '',
            age: '',
            size: '',
            location: ''
        },
        toggleSelect: {
            gender: false,
            type: false,
            age: false,
            size: false,
        },

    }

    handleChangeInput = ({ target }) => {
        const { name, value } = target
        const { filterBy } = this.state
        this.setState({ filterBy: { ...filterBy, [name]: value } })
    }

    handleChange = (value, name) => {
        const { filterBy } = this.state
        this.setState({
            filterBy: {
                ...filterBy,
                [name]: value
            }
        })
    }

    onSubmitFilter = () => {
        const query = new URLSearchParams(this.state.filterBy)
        if(this.props.loadPets){
            this.props.loadPets()
        }
        this.props.history.push(`/explore/?${query.toString()}`)
    }

    onToggleSelect = (by) => {
        const { toggleSelect } = this.state
        this.setState({
            toggleSelect: {
                [by]: !toggleSelect[by]
            }
        })
    }

    setOptions = () => {
        const options = {
            size: ['small', 'medium', 'big'],
            type: ['cat', 'dog', 'rabbit', 'parrot', 'hamster'],
            gender: ['male', 'female'],
            age: ['young', 'adult', 'senior']
        }
        return options
    }


    render() {
        const options = this.setOptions()
        // const sizeOptions = ['small', 'medium', 'big']
        const { gender, age, type, location, size } = this.state.filterBy
        const { toggleSelect } = this.state

        return (
            <section className='pet-filter'>
                <div className="filter-select pet-select">
                    <label >Pet</label>
                    <label onClick={() => this.onToggleSelect('type')} className="select-label">
                        <label >{type}{!type && 'any'}</label>
                        {toggleSelect.type && <FilterSelect key={type} handleChange={this.handleChange} options={options.type} name="type" />}
                    </label>
                </div>
                <div className="filter-select gender-select">
                    <label >Gender</label>
                    <label onClick={() => this.onToggleSelect('gender')} className="select-label">
                        <label >{gender}{!gender && 'any'}</label>
                        {toggleSelect.gender && <FilterSelect key={gender} handleChange={this.handleChange} options={options.gender} name="gender" />}
                    </label>
                </div>
                <div className="filter-select age-select">
                    <label >Age</label>
                    <label onClick={() => this.onToggleSelect('age')} className="select-label">
                        <label >{age}{!age && 'any'}</label>
                        {toggleSelect.age && <FilterSelect key={age} handleChange={this.handleChange} options={options.age} name="age" />}
                    </label>

                </div>
                <div className="filter-select size-select">
                    <label >Size</label>
                    <label onClick={() => this.onToggleSelect('size')} className="select-label">
                        <label >{size}{!size && 'any'}</label>
                        {toggleSelect.size && <FilterSelect key={size} handleChange={this.handleChange} options={options.size} name="size" />}
                    </label>
                </div>
                <div className="filter-select location-select">
                    <label className="location-label">Location</label>
                    <input placeholder="Enter location" className='location-select' value={location} onChange={this.handleChangeInput} name="location"  ></input>
                </div>
                <button className="search-btn filter-select" onClick={this.onSubmitFilter}>
                    <SearchIcon className="filter-search"/>
                </button>
            </section>
        )
    }
}

export const PetFilter = withRouter(_PetFilter)