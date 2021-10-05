playlistRouter = require('./playlists')

const setupRoutes = app => {
    app.use('/playlists', playlistRouter)
}

module.exports = { setupRoutes }