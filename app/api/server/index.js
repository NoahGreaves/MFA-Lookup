import express from 'express';
import db from './database.js';

const app = express();
const PORT = process.env.PORT || 3000;

// API route to fetch server time from database
app.get('/time', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');
        res.json({ server_time: result[0] });
    } catch (err) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Gracefully close database connection on shutdown
process.on('SIGINT', async () => {
    await db.close();
    process.exit(0);
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
