import React, { Component } from 'react'
import { petService } from '../services/petService'
import { utilService } from '../services/utilService'
import { socketService } from '../services/socketService'
import { connect } from 'react-redux'
import { toggleLike, loadPets } from '../store/actions/petActions'
import { loadUsers, newAdoptRequest, onExplore } from '../store/actions/userActions'
import { LongTxt } from '../cmps/LongTxt'
import { CommentsCmp } from '../cmps/CommentsCmp'
import { HeartLike } from '../cmps/HeartLike'
import { GoogleMap } from '../cmps/GoogleMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.min.css';
// import CheckIcon from '@material-ui/icons/Check';
// import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
// import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import { faVenusMars, faCat, faSyringe, faStethoscope, faCalendar } from '@fortawesome/free-solid-svg-icons';
import SportsIcon from '@material-ui/icons/Sports';
import ShareIcon from '@material-ui/icons/Share';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { ReactComponent as Binoculars } from '../assets/img/svg/binoculars.svg'
import { ReactComponent as Paw } from '../assets/img/svg/paw.svg'
// import PetsIcon from '@material-ui/icons/Pets';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import userIcon from '../assets/img/loaders/loader_2.svg' // relative path to image


import Slider from "react-slick";
// import socket from 'socket.io-client/lib/socket'


class _PetDetails extends Component {
    state = {
        pet: null,
        owner: null,
        loggedInUser: null,
        isEditMode: false,
        isOpanModal: false,
        isAttend: false,
        isMobileScreen: null
    }

    componentDidMount() {
        // window.addEventListener("resize", this.screenWidth);
        this.checkScreenWidth()
        window.scroll(0, 0)
        this.props.onExplore()
        const id = this.props.match.params.petId;
        this.props.loadPets()
            .then(() => {
                const pet = this.props.pets.find(pet => pet._id === id)
                this.props.loadUsers()
                    .then(() => {
                        const user = this.props.users.find(user => user._id === pet.owner._id)
                        this.setState({ pet, owner: user, loggedInUser: this.props.loggedInUser })
                    })
            })
    }


    componentWillUnmount() {
        //     window.removeEventListener('resize', this.screenWidth)
    }

    checkScreenWidth = () => {
        if (window.innerWidth > 500) {
            this.setState({ isMobileScreen: false });
        } else {
            this.setState({ isMobileScreen: true });
        }
    }

    onShare = () => {
        //TODO: build the modal.
        // this.setState({ isOpanModal: !this.state.isOpanModal })
    }

    handleChange = ({ target }) => {
        //Future TODO: Pet editor for OWNER
        const { name } = target
        const { value } = target
        this.setState({ pet: { ...this.state.pet, [name]: value } })
    }


    onUpdatePet = () => {
        //Future TODO: Pet editor for OWNER
        this.props.updatePet(this.state.pet)
        this.toggleEditMode()
    }

    toggleEditMode = () => {
        //Future TODO: Pet editor for OWNER
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    onAdopt = () => {
        const { pet, owner, loggedInUser } = this.state
        if (!this.props.loggedInUser) {
            return socketService.emit('alert', "Please login in order to adopt this pet")
        }
        if (loggedInUser.pets.find(loggedInUserPet => loggedInUserPet._id === pet._id)) {
            return socketService.emit('alert', "You cannot adopt you own pet")
        }
        this.setState({ isAttend: true })
        const data = {
            owner: owner,
            petId: pet._id,
            msgToOwner: `${loggedInUser.fullname} would like to adopt ${pet.name} \n Click here to view`,
            msgToRequester: `${owner.fullname} recived your adopt request \n Click here to view`,
            newRequest: {
                date: Date.now(),
                fullname: loggedInUser.fullname,
                userId: loggedInUser._id,
                message: `${loggedInUser.fullname} would like to adopt ${pet.name}`,
                chatId: 'c' + utilService.makeId(7),
            }
        }
        // socketService.emit('send-new-request-to-owner' ,data)
        this.props.newAdoptRequest(data)
    }


    //if the user clicked attend let the user reclick to undo
    toggleAdopted = () => {
        this.setState({ isAttend: true })
    }

    onRemovePet = () => {
        petService.remove(this.state.pet._id)
        this.props.history.push('/')
    }

    render() {
        const { isMobileScreen } = this.state
        if (isMobileScreen === null) return <img src={userIcon} alt="loading" />

        const id = this.props.match.params.petId
        const pet = this.props.pets.find(pet => pet._id === id)
        // const { pet } = this.props
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        if (!pet) return  <img src={userIcon} alt="loading" />

        return (
            <section className="pet-details-section main-container">
                <header className="details-header flex column">
                    <div className="details-title flex column">
                        <h1 className="pet-name">{ pet.name }</h1>
                    </div>
                    <div className="details-header-btns">
                        {/* TODO: add icons +actions btns */ }
                        <HeartLike pet={ pet } />
                        <span className="pet-likes">{ pet.likes }</span>

                        <span className="share-pet" onClick={ () => this.onShare }><ShareIcon />
                            <div className={ 'share-modal' + this.state.isOpanModal ? 'hide' : '' }>
                            </div>
                        </span>
                    </div>
                </header>
                {!isMobileScreen &&
                    <div className="details-imgs-container grid">
                        { pet.imgUrls.map((imgUrl, idx) => {
                            return <img key={ pet._id + idx } src={ imgUrl } alt="skeleton" />
                        }) }
                    </div> }
                {isMobileScreen &&
                    <div className="details-imgs-container grid">
                        <Slider { ...settings }>
                            { pet.imgUrls.map((imgUrl, idx) => {
                                return <img key={ pet._id + idx } src={ imgUrl } alt="skeleton" />
                            }) }
                        </Slider>
                    </div>
                }
                <div className="details-main-section flex">

                    <div className="details-info-container">
                        <div className="info-header flex ">
                            <img src={ pet.owner.imgUrl } alt="" />
                            <div className="info-header-txt flex column">
                                <h3>{ pet.name + ', owned by ' + pet.owner.name }</h3>
                                <span>{ pet.title }</span>
                            </div>
                        </div>

                        <div className="info-body">
                            <LongTxt className="pet-desc" txt={ pet.desc } />
                            {/* <p className="pet-desc">{ pet.desc }</p> */ }
                            <ul className="pet-info-list clean-list">
                                <section className="left-info-list">
                                    <li className="flex align-center">
                                        <FontAwesomeIcon icon={ faCalendar } />
                                        <p>
                                            {/* Age: {(pet.age === 1) ? pet.age + ' year old' : pet.age + ' years old'} */ }
                                            { pet.age + ' ' + pet.type }
                                        </p>
                                    </li>
                                    <li className="flex align-center">
                                        <FontAwesomeIcon icon={ faVenusMars } />
                                        <p>
                                            Gender: { pet.gender }
                                        </p>
                                    </li>
                                    <li className="flex align-center">
                                        <FontAwesomeIcon icon={ faCat } />
                                        <p>
                                            Breed: { pet.breed }
                                        </p>
                                    </li>
                                </section>
                                <section className="right-info-list">
                                    <li className="flex align-center">
                                        <FontAwesomeIcon icon={ faSyringe } />
                                        <p>
                                            Vaccinated: { pet.vaccine ? 'yes' : 'no' }
                                        </p>
                                    </li>
                                    <li className="flex align-center">
                                        <FontAwesomeIcon icon={ faStethoscope } />
                                        <p>
                                            Spayed/Neutered: { pet.neuterSpayed ? 'yes' : 'no' }
                                        </p>
                                    </li>
                                    <li className="flex align-center">
                                        <SportsIcon />
                                        <p>
                                            Trained: { pet.trained ? 'yes' : 'no' }
                                        </p>
                                    </li>
                                </section>
                            </ul>
                        </div>
                    </div>
                    <div className="adopt-modal-container flex column">
                        <div className="flex align-center">
                            <Binoculars className="binoculars" />
                            <span className="adoption-time adopt-sign">{ 'Looking for    a home for ' + utilService.timeSince(pet.addedAt) }</span>
                        </div>
                        <div className="flex align-center">
                            <ThumbUpIcon className="thumb-up" />
                            <span className="adoption-likes adopt-sign">{ 'Liked by ' + pet.likes + ' people!' }</span>
                        </div>
                        <div className="flex align-center">
                            <Paw className="paw" />
                            <span className="adoption-time adopt-sign paw-last">{pet.name} is waiting for you</span>
                        </div>
                        <button className="adopt-btn el-btn" onClick={ () => this.onAdopt() }>{ (this.state.isAttend) ? 'Request sent' : 'Adopt Me' }</button>
                        {/* <span><FontAwesomeIcon icon={faEnvelope} /> {pet.owner.name.split(' ')[0].toLowerCase() + '@gmail.com'}</span> */ }
                        {/* <span><FontAwesomeIcon icon={faWhatsapp} /> 054-2312993</span> */ }
                    </div>
                </div>
                <div className="comments-section">
                    <CommentsCmp pet={ pet } key={ pet._id } />
                </div>
                {/* <button onClick={ () => this.onRemovePet() }>Delete</button> */ }
                <section className="google-map section">
                    <h3 className="pet-loc">Where to find me</h3>
                    <div className="pet-location">
                        <RoomOutlinedIcon />
                        { pet.owner.loc.address }
                    </div>
                    {/* <span>{ pet.owner.loc.address }</span> */ }
                    <GoogleMap loc={ pet.owner.loc } />
                </section>
            </section>
        )
    }
}


const mapStateToProps = state => {
    return {
        users: state.userModule.users,
        pets: state.petModule.pets,
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    toggleLike,
    loadPets,
    loadUsers,
    newAdoptRequest,
    onExplore
}

export const PetDetails = connect(mapStateToProps, mapDispatchToProps)(_PetDetails)

