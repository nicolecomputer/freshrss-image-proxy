export default class Images {
    constructor(db) {
        this.db = db
    }

    createTable(db) {
        const sql = `
            CREATE TABLE IF NOT EXISTS images (
                url TEXT PRIMARY KEY NOT NULL,
                fileId TEXT NOT NULL,
                contentType TEXT NOT NULL,
                addedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            );
        `
        return this.db.run(sql)
    }

    insert(url, fileId, contentType) {
        return this.db.run(
            'INSERT INTO images (url, fileId, contentType) VALUES (?, ?, ?)',
            [url, fileId, contentType])
    }

    findByUrl(url) {
        return this.db.get(
            `SELECT * FROM images WHERE url = ?`,
            [url])
    }
}