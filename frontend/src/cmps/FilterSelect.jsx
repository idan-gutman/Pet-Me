import React from 'react'
import { connect } from 'react-redux'
// import { PetFilter } from './PetFilter'


export class _FilterSelect extends React.Component {
    componentDidMount() {
    }
    render() {
        const { options, name, handleChange } = this.props

        return (
            <div  className={'select-modal'} >
                {options.map((option,idx) => {
                    return <option key={idx} onClick={() => handleChange(option, name)} >{option}</option>
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = {

}

export const FilterSelect = connect(mapStateToProps, mapDispatchToProps)(_FilterSelect)