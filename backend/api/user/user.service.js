
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const reviewService = require('../review/review.service')
// const gUsers = require('../../data/user.json')


module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add,
    updateRequest,
    save
}

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find({}).toArray()
        users = users.map(user => {
            delete user.password
            // user.createdAt = ObjectId(user._id).getTimestamp()
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId) {
    // console.log('userId', userId)
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ "_id": userId })
        // const user = await collection.findOne({ '_id': ObjectId(userId) })
        // console.log('~~~~updated user from db~~~~ : ' , user)
        delete user.password
        return user
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        logger.error(`while finding user ${username}`, err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function updateRequest(request) {
    try {
        const entities = await gUsers
        // let user = entities.find(user => user._id === request.userId)
        // console.log("🚀 ~ file: user.service.js ~ line 75 ~ updateRequest ~ user", user)
        // user.pets.find((pet)=> {pet._id===petId})

        return request
    }
    catch (err) {
        logger.error(`cannot add req `, err)
        throw err
    }
}


async function update(user) {
    try {
        // peek only updatable fields!
        const userToSave = {
            _id: ObjectId(user._id),
            username: user.username,
            fullname: user.fullname,
            score: user.score
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ '_id': userToSave._id }, { $set: userToSave })
        return userToSave;
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function save(user) {
    console.log(user)
    let savedUser = { ...user }
    const collection = await dbService.getCollection('user')
    try {
        if (user._id) {
            //update
            savedUser.updatedAt = Date.now()
            await collection.updateOne({ _id: user._id }, { $set: savedUser })
        } else {
            //create
            savedUser.createdAt = Date.now()
            await collection.insertOne(savedUser)
        }
    } catch (err) {
        logger.error('cannot save user', err)
        throw err
    }
    return savedUser
}


async function add(user) {
    try {
        // peek only updatable fields!
        const userToAdd = {
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            score: user.score || 0
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                username: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.score = { $gte: filterBy.minBalance }
    }
    return criteria
}


