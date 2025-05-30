const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Client } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const db = new Client({
  host: 'localhost',
  user: 'postgres',
  port: 3001,
  password: '123',
  database: 'Chartly'
});
db.connect();

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing username or password' });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO public."Users" (username, password) VALUES ($1, $2) RETURNING *',
      [username, hash]
    );
    console.log('New user:', result.rows[0]);
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('rror inserting user:', err.message);
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
        if (!user) return res.status(401).json({error: 'user not found'});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    
        res.json({ message: 'Login successful', user: { id: user.user_id, username: user.username} });
    
      } catch (err) {
        console.error('error login user:', err.message);
        res.status(500).json({ error: err.message });
      }
});

app.post('/songs', async (req, res) => {

  try {
    const { indexSong } = req.body;
    const result = await db.query(
      'SELECT * FROM public."Songs" WHERE song_id = $1', [indexSong]
    );
    console.log('Song playing:', result.rows[0]);
    res.json({ song: result.rows[0] });
  } catch (err) {
    console.error('error playing song:', err.message);
  }
});

app.post('/searchsongs', async (req, res) => {
  try {
    const {songQuery} = req.body;
    const result = await db.query('SELECT * FROM public."Songs" WHERE title ILIKE $1', [`%${songQuery}%`]);
    res.json({songSearch: result.rows});
  } catch (err) {}
});

app.post('/playlistadd', async (req, res) => {
  try {
    const {playlistName} = req.body;
    const result = await db.query('INSERT INTO public."Playlists" (name) VALUES ($1) RETURNING *', [playlistName]);
    res.json({newPlaylist: result.rows[0]});
  } catch (err) {}
});

app.get ('/playlistsync', async (req, res) => {
  try {
    const result = await db.query('SELECT playlist_id, name FROM public."Playlists" ORDER BY playlist_id DESC');
    res.json({playlists: result.rows})
  } catch (err) {}
});

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});

