import { connect } from 'react-redux'
import React from 'react'
import { loadPets, addPet } from '../store/actions/petActions'
import { onHome, showSearch, hideSearch } from '../store/actions/userActions'
import { Link } from 'react-router-dom'
import { FilterDynamic } from '../cmps/FilterDynamic'
import { HomepagePreview } from '../cmps/HomepagePreview'
import rightArrow from '../assets/img/svg/arrow-right.png'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { ReactComponent as Loader } from '../assets/img/loaders/loader_3.svg' 
import { ReactComponent as Paw } from '../assets/img/svg/paw.svg'
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

class _PetApp extends React.Component {

    async componentDidMount() {
        window.scroll(0, 0)
        this.props.hideSearch()
        this.props.onHome()
        await this.props.loadPets()
    }

    render() {
        const { pets } = this.props
        if (pets.length === 0) return <Loader />
        return (
            <section className="main-container">
                <section className="hero full">
                    <div className="hero-content">
                        <FilterDynamic />

                        <h1>Find your</h1>
                        <h1> best friend</h1>
                    </div>
                </section>
                <div className="type-cards">
                    <h2 className="type-cards-title">Our sweet pet types</h2>
                    <div className="type-img">
                        <div>
                            <Link to={`/explore/?gender=&age=&type=dog&location=&size=`} >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622205405/dogs/dog3/frnach-dog3_npdovb.jpg" alt="card" />
                                <h4>Dogs</h4>
                            </Link>
                        </div>
                        <div>
                            <Link to={`/explore/?gender=&age=&type=cat&location=&size=`} >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622203804/petMe/cats/cat_nnrk1h.jpg" alt="card" />
                                <h4>Cats</h4>
                            </Link>
                        </div>
                        <div>
                            <Link to={`/explore/?gender=&age=&type=rabbit&location=&size=`} >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622206572/petMe/rabbit/rrabit3/1_2_chadja.jpg" alt="card" />
                                <h4>Rabbits</h4>
                            </Link>
                        </div>
                        <div>
                            <Link to={`/explore/?gender=&age=&type=parrot&location=&size=`} >
                                <img src="https://res.cloudinary.com/dstqymucm/image/upload/v1622213930/petMe/parrot/1_3_s1zdqk.jpg" alt="card" />
                                <h4>Parrots</h4>
                            </Link>
                        </div>
                    </div>
                </div>
                <section className="homepage-section-info">
                    <div className="content">
                        <div>
                            <div className="info-title-icon">
                                <h2>Filter down to your perfect fit</h2>
                                {/* <img className="info-icons" src={magnifyingGlass} alt="glass" /> */}
                                <SearchOutlinedIcon className="info-icons" />
                            </div>
                            <p> Personalize your search with filters like gender,
                            type, size or a pool to get exactly what you want.
                            {/* <img className="arrow-icons" src={rightArrow} alt="" /> */}
                            </p>
                        </div>
                        <div>
                            <div className="info-title-icon">
                                <h2>Dig into the details</h2>
                                <InfoOutlinedIcon className="info-icons"/>
                            </div>
                            <p> Check out the photos and view pet information.
                                Next, read user reviews and comments about the pet and its owner.
                                {/* <img className="arrow-icons" src={rightArrow} alt="" /> */}
                                </p>
                        </div>
                        <div>
                            <div className="info-title-icon">
                                <h2>Contact pet owners</h2>
                                {/* <img className="info-icons" src={contact} alt="glass" /> */}
                                <ContactMailOutlinedIcon className="info-icons"/>
                            </div>
                            <p>  Once you have decided which pet you would like to adopt, contact the pet owners and keep your fingers crossed.
                            {/* <img className="arrow-icons" src={rightArrow} alt="" /> */}
                            </p>
                        </div>
                        <div>
                            <div className="info-title-icon">
                                <h2>Adopt a friend!</h2>
                                {/* <img className="info-icons" src={paw} alt="glass" /> */}
                                <Paw className="info-icons" />
                            </div>
                            <p> In a quick and easy process you can adopt a pet that will become your new companion for life. Join us for a fun journey! 
                            </p>
                        </div>
                    </div>
                </section>
                <HomepagePreview pets={this.props.pets} />
                <section className="homepage-about main-container full">
                    <div className="blur full">
                        <div className="about-content flex column">
                            <h2>Our vision</h2>
                            <p>PetMe is dedicated to saving the lives of animals in need. We improve animal welfare in communities through adoption, education, and providing resources for people and pets.</p>
                            <p>We strive for a world where every companion animal has a safe and loving home and their family has the knowledge and resources needed to give them the life they deserve.</p>
                            <img className="welcome-logo" src="https://petcolove.org/wp-content/uploads/2018/08/welcome-to-the-family-web.png" alt="" />
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        pets: state.petModule.pets
    }
}

const mapDispatchToProps = {
    loadPets,
    addPet,
    onHome,
    showSearch,
    hideSearch
}

export const PetApp = connect(mapStateToProps, mapDispatchToProps)(_PetApp)