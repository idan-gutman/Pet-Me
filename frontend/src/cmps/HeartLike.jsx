import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggleLike } from '../store/actions/petActions'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { store } from 'react-notifications-component';




class _HeartLike extends Component {

    state = {
        isLiked: false
    }

    componentDidMount() {
        this.checkUserLike()
    }



    checkUserLike = () => {
        const { loggedInUser, pet } = this.props
        if (!loggedInUser) return
        const userId = pet.likedBy.find(userId => userId === loggedInUser._id)
        const isAlreadyLiked = userId ? true : false;
        this.setState({ isLiked: isAlreadyLiked })
    }

    onLike = () => {
        const { loggedInUser, pet } = this.props

        if (!loggedInUser) {
            store.addNotification({
                title: 'Alert',
                message: 'You are in guest mode, Please logging to like the pet',
                type: 'info',
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__zoomIn"],
                animationOut: ["animate__animated", "animate__zoomOut"],
                dismiss: {  
                    duration: 2000,
                    onScreen: false
                }
            });
            return console.log('You are in guest mode, please logging to like the pet')
        }

        const userId = pet.likedBy.find(userId => userId === loggedInUser._id)
        const isAlreadyLiked = userId ? true : false;
        this.setState({ isLiked: !isAlreadyLiked })
        //add or remove user from likedBy
        const idx = pet.likedBy.findIndex(userId => userId === loggedInUser._id)
        const likeInfo = {
            petId: pet._id,
            userId: loggedInUser._id,
            act: !isAlreadyLiked ? 1 : -1,
            idx
        }
        this.props.toggleLike(pet, likeInfo)
    }


    render() {
        const { isLiked } = this.state
        return (
            <span className="pet-like-btn" onClick={ () => this.onLike() }>
                <FavoriteIcon className={ !isLiked ? 'heart heart-empty' : 'heart heartfill' } />
            </span>
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
    toggleLike
}

export const HeartLike = connect(mapStateToProps, mapDispatchToProps)(_HeartLike)

