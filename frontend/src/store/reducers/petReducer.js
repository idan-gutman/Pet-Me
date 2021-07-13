const initialState = {
    pets: [],
    homePreviewPets: [],
    pet: null,
    filter: null
}

export function petReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PETS':
            return { ...state, pets: action.pets }
        case 'ADD_PET':
            return { ...state, pets: [...state.pets, action.pet] }
        case 'UPDATE_PET':
            return {
                ...state,
                pets: state.pets.map(pet => {
                    if (pet._id === action.pet._id) {
                        return action.pet; //swap the relevant pet with updatedPet (action.pet)
                    }
                    return pet;
                })
            }
        case 'REMOVE_PET':
            return { ...state, pets: state.pets.filter(pet => pet._id !== action.petId) }
        case 'ADD_LIKE':
            return {
                ...state,
                pets: state.pets.map(pet => {
                    if (pet._id === action.petId) {
                        pet.likes++
                        pet.likedBy.push(action.userId)
                        return pet;
                    }
                    return pet;
                })
            }
        case 'REMOVE_LIKE':
            return {
                ...state,
                pets: state.pets.map(pet => {
                    if (pet._id === action.petId) {
                        pet.likes--
                        pet.likedBy.splice(action.idx, 1)
                        return pet;
                    }
                    return pet;
                })
            }
        case 'ADD_COMMENT':
            return {
                ...state,
                pets: state.pets.map(pet => {
                    if (pet._id === action.petId) {
                        pet.comments.push(action.newComment)
                        return pet;
                    }
                    return pet;
                })
            }
        case 'SET_FILTER':
            return { ...state, filter: action.filter }
        default:
            return state
    }
}