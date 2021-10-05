const express = require("express");
const mysql = require("../config/db");
const playlistRouter = express.Router();

// Get all playlists

playlistRouter.get("/", (req, res) => {
  const sql = `SELECT * FROM playlist`;
  const values = []
  if (req.query.genre) {
      sql += 'WHERE genre = ?'
      values.push(req.query.genre)
  }
  mysql.query(sql, values, (err, result) => {
    if (err) res.status(500).send("Error retrieving playlists");
    else res.status(200).json(result);
  });
});

// Get one

playlistRouter.get("/:id", (req, res) => {
  const playlistId = req.params.id;
  const sql = `SELECT * FROM playlist WHERE id = ?`;
  const value = [playlistId];
  mysql.query(sql, value, (err, result) => {
    if (err) res.status(500).send("Error retrieving playlist");
    else res.status(200).json(result);
  });
});

// Get one with associated tracks

playlistRouter.get("/:id/tracks", (req, res) => {
  const playlistId = req.params.id;
  mysql.query(
    `SELECT p.*, t.track_title, t.artist, t.album_picture, t.youtube_url
    FROM playlist AS p
    LEFT JOIN track AS t 
    ON t.playlist_id = p.id
    WHERE p.id = ?`,
    [playlistId],
    (err, result) => {
      if (err) {
        res.status(500).send("Error retrieving playlist data");
      } else {
        if (result.length === 0) res.status(404).send("NOT_FOUND");
        let playlistEntity = {
          id: result[0].id,
          playlist: result[0].playlist_title,
          tracks: [],
        };
        for (let i = 0; i < result.length; i++) {
          if (result[i].id) {
            playlistEntity.tracks.push({
              id: result[i].id,
              title: result[i].track_title,
              artist: result[i].artist,
              image: result[i].album_picture,
              lien: result[i].youtube_url,
            });
          }
        }
        res.status(200).json(playlistEntity);
      }
    }
  );
});

// Create

playlistRouter.post("/", (req, res) => {
  const { title, genre } = req.body;
  const sql = `INSERT INTO playlist
    (playlist_title, genre) VALUES (?,?)`;
  const values = [title, genre];
  mysql.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send("Error posting playlist");
    } else {
      const playlistId = result.insertId;
      const createdPlaylist = { ...req.body, playlistId };
      res.status(201).json(createdPlaylist);
    }
  });
});

// Update 

playlistRouter.put('/:id', (req, res) => {
    const playlistId = req.params.id
    const sql = `UPDATE playlist SET ? WHERE id = ?`
     const values = [req.body, playlistId]
     mysql.query(sql, values, (err, result) => {
         if (err) res.status(500).send('Error updating playlist')
         else res.status(200).json(result)
     })
})

// Delete 

playlistRouter.delete('/:id', (req, res) => {
    const playlistId = req.params.id
    mysql.query(`DELETE FROM playlist WHERE id = ?`, [playlistId], (err) => {
        if (err) res.status(500).send('Error deleting playlist')
        else res.status(200).send('Playlist deleted')
    })
})

module.exports = playlistRouter;
