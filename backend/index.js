const express = require('express');
require('dotenv').config();
const cors = require('cors');
var bcrypt = require('bcryptjs');
const { Client } = require('pg');
let loggedInUser = 0;

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect(err => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('DB connected successfully');
  }
});

app.post('/register', async (req, res) => {
  const { username, password} = req.body;

  if (!username || !password) {
    return;
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO public."Users" (username, password) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING RETURNING *',
      [username, hash]
    );
    console.log('New user:', result.rows[0]);
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('error inserting user:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  try {
    const usernameQuery = await db.query('SELECT  * FROM public."Users" WHERE username = $1', [username]);
    const user = usernameQuery.rows[0];
    if (!user) return res.status(401).json({ error: 'user not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    loggedInUser = user.user_id;

    res.json({ message: 'Login successful', user: { id: user.user_id, username: user.username }
  });

  } catch (err) {
    console.error('error login user:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/songs', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM public."Songs"');
    res.json({ songs: result.rows });
  } catch (err) {
    console.error('error playing song:', err.message);
  }
});

app.post('/searchsongs', async (req, res) => {
  try {
    const { songQuery } = req.body;
    const result = await db.query('SELECT * FROM public."Songs" WHERE title ILIKE $1', [`%${songQuery}%`]);
    res.json({ songSearch: result.rows });
  } catch (err) { }
});

app.post('/playlistadd', async (req, res) => {
  try {
    const { playlistName } = req.body;
    const result = await db.query('INSERT INTO public."Playlists" (name) VALUES ($1) RETURNING *', [playlistName]);
    res.json({ newPlaylist: result.rows[0] });
  } catch (err) { }
});

app.get('/playlistsync', async (req, res) => {
  try {
    const result = await db.query('SELECT playlist_id, name FROM public."Playlists" WHERE user_id = $1', [loggedInUser]);
    res.json({ playlists: result.rows })
  } catch (err) { }
});

app.post('/playlistdetails', async (req, res) => {
  try {
    const { playlistId } = req.body
    const result = await db.query('SELECT * FROM public."Songs" as s JOIN public."Playlist_songs" as ps ON s.song_id = ps.song_id WHERE playlist_id = $1', [playlistId]);
    res.json({ songsPlaylist: result.rows })
  } catch (err) { }
});

app.post('/addtoplaylist', async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const result = await db.query('INSERT INTO public."Playlist_songs"(playlist_id, song_id) VALUES ($1, $2)', [playlistId, songId]);
    res.json({ addedSong: result.rows[0] });
  } catch (err) { }
})

app.get('/getusername', async (req, res) => {
  try {
    const result = await db.query('SELECT username FROM public."Users" WHERE user_id = $1', [loggedInUser]);
    res.json({username: result.rows[0]?.username});
  } catch (err) {}
})

app.listen(5432, () => {
  console.log('Backend running');
});

