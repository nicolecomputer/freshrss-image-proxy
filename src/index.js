import express from "express"
import 'dotenv/config'

import { findOrCreateImageRecord, initialization } from "./main.js"

const app = express()
const port = 3000

async function main() {
    await initialization()

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })

    app.get('/pic', async (req, res) => {
        const url = req.query.url;

        try {
            const imageRecord = await findOrCreateImageRecord(url);
            console.log(imageRecord)
        } catch {
            res.status(404).send(`Could not retrieve ${url}`)
        }

        res.send(url)
    })

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

main()