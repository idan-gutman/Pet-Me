import { storageService } from './asyncStorageService'
import { httpService } from '../services/httpService'
import { socketService } from '../services/socketService'



export const userService = {
  login,
  logout,
  signup,
  getUsers,
  getById,
  remove,
  update,
  getLoggedinUser,
  saveNewRequest,
  saveNewApprove,
  updateLoggedInUser
}

// window.userService = userService p

function getUsers() {
  return httpService.get(`user`)
}

function getById(userId) {
  return httpService.get(`user/${userId}`)
}

function remove(userId) {
  return httpService.delete(`user/${userId}`)
}

async function update(user) {
  let updatedUser = await httpService.put(`user/${user._id}`, user)
  return updatedUser
}

async function login(userCred) {

  const user = await httpService.post('auth/login', userCred)
  if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
  const user = await storageService.post('user', userCred)
  // const user = await httpService.post('auth/signup', userCred)
  return _saveLocalUser(user)
}

async function logout() {
  sessionStorage.clear()
  // return await httpService.post('auth/logout')
}

async function updateLoggedInUser(userId) {
  const user = await getById(userId);
  return _saveLocalUser(user);
}

function _saveLocalUser(user) {
  sessionStorage.setItem('loggedinUser', JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem('loggedinUser'))
}


async function saveNewRequest(data) {
  const { newRequest, owner, petId } = data
  const petIdx = owner.pets.findIndex(pet => pet._id === petId)


  if (owner.pets[petIdx].adoptQue) {
    //finding if the user(owner) already got the request
    const isAlreadyRequested = owner.pets[petIdx].adoptQue.some(pet => pet.userId === newRequest.userId)

    if (!isAlreadyRequested) { // if user(owner) already got the request - do no push the request again.
      owner.pets[petIdx].adoptQue.push(newRequest)
      const updatedOwner = await update(owner)
      socketService.emit('adopt-request', data) 
      return updatedOwner
      // return owner
    }
    //future socket - for the requester {}

    else {
      const alreadyReqInfo = {
        msg: 'You had already requested the owner, please wait for him to response',
        userId: newRequest.userId
      }
      socketService.emit('already-requested-msg', alreadyReqInfo)
      return owner
    }
  }
}

async function saveNewApprove(data) { // CREATING NEW USERS 
  const { pet, req, loggedInUser, idx } = data
  let newOwner = await getById(req.userId)

  console.log('newOwner', newOwner, 'loggedInUser', loggedInUser)
  //create new pet for the new owner
  const newOwnerPet = {
    _id: pet._id,
    isAdopted: true,
    formerOwnerId: loggedInUser._id,
    adoptQue: []
  }

  //create old pet for the old owner
  const oldOwnerPet = {
    _id: pet._id,
    isAdopted: true,
    newOwner: req._id,
    formerOwnerId: loggedInUser._id,
    adoptQue: []
  }

  // creating new owner - the one who got the approve
  newOwner = {
    ...newOwner,
    pets: (newOwner.pets > 0) ? [...newOwner.pets, newOwnerPet] : [newOwnerPet]
  }


  //creating old owner - the one who approve the request
  loggedInUser.pets.splice(idx, 1)
  const newLoggedInUser = {
    ...loggedInUser,
    oldPets: (loggedInUser.oldPets) ?
      (!loggedInUser.oldPets.some(oldPet => oldPet._id === pet._id) ?
        [...loggedInUser.oldPets, oldOwnerPet] : [...loggedInUser.oldPets])
      : [oldOwnerPet],
  }
// ON (back-end enable)
const updatedOwner = await update(newOwner)
const updatedLoggedInUser = await update(newLoggedInUser)
const newUsers = { updatedOwner, updatedLoggedInUser }

// OFF (back-end off)
// const newUsers = { newOwner, newLoggedInUser }

return newUsers
}