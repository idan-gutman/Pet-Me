// example for reducer


// case 'ADOPT':

//1.a using find, findIndex and splice
    // const user = state.users.find(user => user._id === action.userId)
    // const userPet = user.pets.find(pet => pet._id)
    // userPet.adoptQue.push({
    //   userId: action.userId,
    //   message: action.message,
    //   //"chatId": "i11"
    // })
    // user.pets = userPet;
    // const idx = state.users.findIndex(user => user._id === action.userId)
    // state.users.splice(idx, 1, user)
    // return { ...state, users: action.users }


//1.b same with reconfigure model 
    //TODO - split the users object to details,pets
    // const _userPets: Array = state.userPets[action.userId]  //mapping: userId->pets
    // const pet = _userPets.find(pet => pet._id)
    // update adoptQue - push...
    // const idx = _userPets.findIndex(per => pet._id)
    // userPets.splice(idx, 1, pet)
    // return { ...state, users: action.users }

//2.a how the store should look like
    //state.users, state.pets userId->pets, pets: petId-> pet
//     const newStore = {
//       userPets: {
//         "user123": {
//           pets: {
//             "pet45": {
//               isAdopted: true,
//               adoptQue: []
//             },
//             "pet23": {
//               adoptQue: []
//             }
//           }
//         },
//         "user13": {}
//       }
//     }

//the new store with new configure model: reduce
//     return {
//       ...state,
//       userPets: {
//         ...state.userPets,
//         [action.userId]: {
//           ...state.userPets[action.userId],
//           pets: {
//             ...state.userPets[action.userId].pets,
//             [action.petId]: {
//               ...state.userPets[action.userId].pets[action.petId],
//               adoptQue: [
//                 ...state.userPets[action.userId].pets[action.petId].adoptQue,
//                 {
//                   userId: action.userId,
//                   message: action.message
//                 }
//               ]
//             }
//           }
//         }
//       }
//     }

//2.b
//     return {
//       ...state,
//       users: state.users.map(user => {
//         switch (user._id) {
//           case action.userId:
//             return {
//               ...user,
//               pets: state.users.pets.map(pet => {
//                 switch (pet._id) {
//                   case action.petId:
//                     return {
//                       ...pet,
//                       adoptQue: [
//                         ...pet.adoptQue,
//                         {
//                           userId: action.userId,
//                           message: action.message
//                           //ChatId
//                         }
//                       ]
//                     };
//                   default:
//                     return pet;
//                 }
//               })
//             };
//           default:
//             return user;
//         }
//       })
//     }
// }
// }
