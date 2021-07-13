const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null
var gSocketBySessionIdMap = {}

function connectSockets(http, session) {
    gIo = require('socket.io')(http);

    const sharedSession = require('express-socket.io-session');


    gIo.use(sharedSession(session, {
        autoSave: true
    }));
    gIo.on('connection', socket => {
        // console.log('New socket - socket.handshake.sessionID', socket.handshake.sessionID)
        gSocketBySessionIdMap[socket.handshake.sessionID] = socket
        if (socket.handshake?.session?.user) {
            socket.join(socket.handshake.session.user._id)
            // console.log(socket.handshake.session.user._id)
        }
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
            if (socket.handshake) {
                gSocketBySessionIdMap[socket.handshake.sessionID] = null
            }
        })

        socket.on('user-join', id => {
            if (socket.myTopic === id) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
                console.log('user-leave topic', id)
            }
            socket.join(id, function () {
                console.log('user-join topic', id)
            })
            socket.myTopic = id
        })

        socket.on('adopt-request', data => {
            console.log('im in socket on in backend', data.owner._id, data.newRequest.userId)

            //sent to SocketsNotification - msg to owner
            emitToUser({ type: 'adopt-request-owner', data: data.msgToOwner, userId: data.owner._id })

            //sent to SocketsNotification - msg to requester
            emitToUser({ type: 'adopt-request-requester', data: data.msgToRequester, userId: data.newRequest.userId })

            //sent to Profile - render live data
            emitToUser({ type: 'adopt-request-owner-data', data: data, userId: data.owner._id })

            // //sent to header - update localUser everywhere
            // emitToUser({ type: 'adopt-request-owner-data', data: data, userId: data.owner._id })
        })

        socket.on('update-new-owner', newOwner => {
            emitToUser({ type: 'sending-new-owner-to-save', data: newOwner, userId: newOwner._id })
        })

        socket.on('already-requested-msg', data => {
            emitToUser({ type: 'already-requested', data: data.msg, userId: data.userId })
        })

        socket.on('approve-requested', data => {
            emitToUser({ type: 'approve-requested', data: data, userId: data.req.userId })
            emitToUser({ type: 'approve-requested-msg', data: data.msg, userId: data.req.userId })
        })
        socket.on('alert', msg => {
            console.log('!alerting guess!')
            gIo.emit('alert-to-notify', msg)
        })
        socket.on('alert-user', data => {
            console.log('!alerting user! userId = ',data.userId)
            emitToUser({ type: 'alert-to-notify', data: data.msg, userId: data.userId })
        })
    })
}

function emitToAll({ type, data, room = null }) {
    if (room) gIo.to(room).emit(type, data)
    else gIo.emit(type, data)
}
//here is the problem
// TODO: Need to test emitToUser feature
function emitToUser({ type, data, userId }) {
    // console.log('socket.service.js ~line75~, Message: ' + data, ', To: user-id: ' + userId)
    gIo.to(userId).emit(type, data)
}


// Send to all sockets BUT not the current socket 
function broadcast({ type, data, room = null }) {
    const store = asyncLocalStorage.getStore()
    const { sessionId } = store
    if (!sessionId) return logger.debug('Shoudnt happen, no sessionId in asyncLocalStorage store')
    const excludedSocket = gSocketBySessionIdMap[sessionId]
    if (!excludedSocket) return logger.debug('Shouldnt happen, No socket in map')
    if (room) excludedSocket.broadcast.to(room).emit(type, data)
    else excludedSocket.broadcast.emit(type, data)
}


module.exports = {
    connectSockets,
    emitToAll,
    broadcast,
}



