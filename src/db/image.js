export default class Images {
    constructor(db) {
        this.db = db
    }

    createTable(db) {
        const sql = `
            CREATE TABLE IF NOT EXISTS images (
                url TEXT PRIMARY KEY NOT NULL,
                fileId TEXT NOT NULL,
                addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            );
        `
        return this.db.run(sql)
    }

    insert(url, fileId) {
        return this.db.run(
            'INSERT INTO images (url, fileId) VALUES (?, ?)',
            [url, fileId])
    }

    findByUrl(url) {
        return this.db.get(
            `SELECT * FROM images WHERE url = ?`,
            [url])
    }
}