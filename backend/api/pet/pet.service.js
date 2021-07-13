const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy = '') {
    // console.log("🚀 ~ file: pet.service.js ~ line 7 ~ query ~ filterBy", filterBy)
    // console.log("🚀 ~ file: pet.service.js ~ line 7 ~ query ~ filterBy", filterBy)
    // if(filterBy.sort!=='undefined'){
    //     console.log(filterBy.sort);
    // }
    let { sortBy } = filterBy
   
    // console.log("🚀 ~ file: pet.service.js ~ line 12 ~ query ~ sortBy", sortBy)
    let sort = {}
    if (sortBy === 'name') {
        sort.name = 1
    if (sortBy === 'createdAt') {
        sort.name = -1
    }
    } else if (sortBy === 'likes') {
        sort.likes = -1
    }

    const criteria = _buildCriteria(filterBy)

    try {
        const collection = await dbService.getCollection('pet')
        const pets = await collection.find(criteria).sort(sort).toArray()
        return pets
    } catch (err) {
        logger.error('cannot find pets', err)
        throw err
    }
}

async function save(pet) {
    let savedPet = { ...pet }
    const collection = await dbService.getCollection('pet')
    try {
        if (pet._id) {
            //update
            savedPet.updatedAt = Date.now()
            await collection.updateOne({ _id: pet._id }, { $set: savedPet })
        } else {
            //create
            savedPet.createdAt = Date.now()
            await collection.insertOne(savedPet)
        }
    } catch (err) {
        logger.error('cannot save pet', err)
        throw err
    }
    return savedPet
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function _buildCriteria(filterBy) {
    // console.log("🚀 ~ file: pet.service.js ~ line 79 ~ _buildCriteria ~ filterBy", filterBy)

    if (!filterBy) return {}

    const { type, age, location, gender, size } = filterBy

    const criteria = {}
    // if (filterBy.type === type ) {


    if (size) {
        criteria.size = { $regex: new RegExp(filterBy.size, 'ig') }
        // criteria.size.find({ $text: { $search: size } })
    }
    if (type) {
        criteria.type = { $regex: new RegExp(filterBy.type, 'ig') }
    }
    if (age) {
        criteria.age = { $regex: new RegExp(filterBy.age, 'ig') }
    }
    if (gender) {
        criteria.gender = gender
    }
    if (location) {
        criteria.location.include(location)
    }

    return criteria
}

module.exports = {
    query, get, save
}