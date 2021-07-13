// import { addComment } from '../store/actions/petActions';
import { storageService } from './asyncStorageService'
import { httpService } from '../services/httpService'
import { utilService } from './utilService';
window.storageService = storageService;

export const petService = {
    query,
    getPetByid,
    add,
    update,
    remove,
    toggleLike,
    addComment
}
const STORAGE_KEY = 'pets'

async function query(filterBy = '') {
    var queryStr = (!filterBy) ? '' : `?gender=${filterBy.gender}&age=${filterBy.age}&type=${filterBy.type}&location=${filterBy.location}&size=${filterBy.size}&sortBy=${filterBy.sort}`
    try {
        return httpService.get(`pet${queryStr}`)
    } catch (err) {
        throw err
    }
}

async function add(pet) {
    if (pet._id) {

    }
    let addPet = await storageService.post(STORAGE_KEY, pet)
    return addPet
}
async function update(pet) {
    let updatedPet = await httpService.put(`pet/${pet._id}`, pet)
    return updatedPet
}

async function addComment(newComment, pet) {
    console.log(newComment)
    const updatedPet = { ...pet }
    const { loggedInUser, txt } = newComment
    newComment = {
        id: 'c' + utilService.makeId(6),
        txt,
        created: Date.now(),
        _id:utilService.makeId(),
        by: {
            id: loggedInUser._id,
            fullname: loggedInUser.fullname,
            imgUrl: loggedInUser.imgUrl
        }
    }
    updatedPet.comments.push(newComment)

    return await update(updatedPet)

}
function remove(petId) {
    storageService.remove(STORAGE_KEY, petId)
}

async function getPetByid(petId) {
    let pet = await httpService.get(`pet/${petId}`)
    return pet
}



async function toggleLike(pet, likedInfo) {
    const { userId, act, idx } = likedInfo
    const updatedPet = { ...pet }
    switch (act) {
        case 1:
            updatedPet.likedBy.push(userId)
            break;
        case -1:
            updatedPet.likedBy.splice(idx, 1)
            break;
        default:
            break;
    }
    updatedPet.likes = +updatedPet.likes
    updatedPet.likes += act

    return await update(updatedPet)
}


