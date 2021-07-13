import { PetPreview } from '../cmps/PetPreview.jsx'
import { connect } from 'react-redux'
import React from 'react'
import { loadPets, addPet } from '../store/actions/petActions'

class _HomepagePreview extends React.Component {

    state = {
        likedPets: [],
        mostWaitingPets: []
    }

    async componentDidMount() {
        await this.props.loadPets()
        this.setLikedPets()
        this.setMostWaitingPets()
    }

    setLikedPets = () => {
        let likedPets = [...this.props.pets]
        likedPets.sort((a, b) => {
            if (a.likes > b.likes) {
                return -1
            }
            if (a.likes < b.likes) {
                return 1
            }
        })
        likedPets.splice(4)
        this.setState({ likedPets })
    }

    setMostWaitingPets = () => {
        let mostWaitingPets = [...this.props.pets]
        mostWaitingPets.sort((a, b) => {
            if (b.addedAt > a.addedAt) {
                return -1
            }
            if (a.addedAt < b.addedAt) {
                return 1
            }
        })
        mostWaitingPets.splice(4)
        this.setState({ mostWaitingPets })
    }

    render() {
        const { likedPets, mostWaitingPets } = this.state
        if (!likedPets.length) return <h1>loading</h1>
        if (!mostWaitingPets.length) return <h1>loading</h1>

        return (
            <>
                <section className="type-cards preview-homepage">
                    <h2 className="type-cards-title">Waiting long time to adopt</h2>
                    <div className="preview-cards">
                        { mostWaitingPets.map(previewPet => {
                            return <PetPreview pet={ previewPet } key={ previewPet._id } />
                        }) }
                    </div>
                </section>

                <section className="type-cards preview-homepage">
                    <h2 className="type-cards-title">Most Liked Pets</h2>
                    <div className="preview-cards">
                        { likedPets.map(previewPet => {
                            return <PetPreview pet={ previewPet } key={ previewPet._id } />
                        }) }
                    </div>
                </section>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        homePreviewPets: state.petModule.homePreviewPets
    }
}


const mapDispatchToProps = {
    loadPets,
    addPet,
}

export const HomepagePreview = connect(mapStateToProps, mapDispatchToProps)(_HomepagePreview)