import { petService } from '../../services/petService.js'

export function loadPets(filterBy = null) { // Action Creator
    return async dispatch => {
        try {
            const pets = await petService.query(filterBy)
            dispatch({ type: 'SET_PETS', pets })
        }
        catch (err) {
            console.log('unable to query pets', err);
        }
    }
}
// CREATE
export function addPet(pet) {
    return dispatch => {
        return petService.add(pet)
            .then(pet => {
                const action = {
                    type: 'ADD_PET', pet
                }
                dispatch(action)
            })
    }
}
// UPDATE
export function updatePet(pet) { // Action Creator
    return dispatch => {
        return petService.update(pet)
            .then(pet => {
                const action = {
                    type: 'UPDATE_PET', pet
                }
                dispatch(action)
            })
    }
}

// Delete
export function removePet(petId) { // Action Creator
    return dispatch => {
        return petService.remove(petId)
            .then((petId) => {
                const action = {
                    type: 'REMOVE_PET', petId: petId + ''
                }
                dispatch(action)
            })
    }
}
// From here: use the CRUDL to 
export function toggleLike(pet, likedInfo) { // Action Creator
    return dispatch => {
        return petService.toggleLike(pet, likedInfo)
            .then((updatedPet) => {
                const action = {
                    type: 'UPDATE_PET',
                    pet: updatedPet
                }
                dispatch(action)
            })
    }
}


export function addComment(ev, newComment, pet) { // Action Creator
    ev.preventDefault()
    // const { txt, petId, loggedInUser } = newComment
    return dispatch => {
        return petService.addComment(newComment, pet)
            .then((updatedPet) => {
                const action = {
                    type: 'UPDATE_PET',
                    pet: updatedPet
                }
                dispatch(action)
            })
    }
}



