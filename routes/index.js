playlistRouter = require('./playlists')
trackRouter = require('./tracks')

const setupRoutes = app => {
    app.use('/playlists', playlistRouter)
    app.use('/tracks', trackRouter)
}

module.exports = { setupRoutes }