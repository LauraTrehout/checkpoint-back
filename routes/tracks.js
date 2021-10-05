const express = require("express");
const mysql = require("../config/db");
const trackRouter = express.Router();

//Get all tracks

trackRouter.get("/", (req, res) => {
  const sql = `SELECT * FROM track`;
  mysql.query(sql, (err, result) => {
    if (err) res.status(500).send("Error retrieving tracks");
    else res.status(200).json(result);
  });
});

// Create

trackRouter.post("/", (req, res) => {
  const { title, artist, image, link, playlist } = req.body;
  const sql = `INSERT INTO track 
    (title, artist, album_picture, youtube_url, playlist_id) VALUES(?,?,?,?,?)`;
  const values = [title, artist, image, link, playlist];
  mysql.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send("Error posting track");
    } else {
      const trackId = result.insertId;
      createdTrack = { ...req.body, trackId };
      res.status(201).json(createdTrack);
    }
  });
});

module.exports = trackRouter;
