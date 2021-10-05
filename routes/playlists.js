
const express = require('express')
const mysql = require('../config/db')
const playlistRouter = express.Router()

// Get al lplaylists

playlistRouter.get('/', (req, res) => {
const sql = `SELECT * FROM playlist`
    mysql.query(sql, (err, result) => {
        if (err) res.status(500).send('Error retrieving playlists')
        else res.status(200).json(result)
    })  
})

playlistRouter.post('/', (req, res) => {
    const { title, genre } = req.body
    const sql = `INSERT INTO playlist
    (title, genre) VALUES (?,?)`
    const values = [title, genre]
    mysql.query(sql, values, (err, result) => {
        if (err) {res.status(500).send('Error posting playlist')
    } else {
        const playlistId = result.insertId
        const createdPlaylist = { ...req.body }
        res.status(201).json(createdPlaylist)
    }
    })
})

module.exports = playlistRouter