import db from './database.js';

class DatabaseTest {
    static async run() {
        try {
            const result = await db.query('SELECT NOW()');
            console.log("Connected to Database! Time:", result[0]);
        } catch (err) {
            console.error("Database connection error:", err);
        } finally {
            await db.close();
        }
    }
}

DatabaseTest.run();
