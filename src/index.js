import express from "express"
import 'dotenv/config'
import fs from "fs"

import { findOrCreateImageRecord, initialization } from "./main.js"

const app = express()
const port = 3009

async function main() {
    await initialization()

    app.get('/', (req, res) => {
        const numberOfImages = fs.readdirSync(`${process.env.DATA_PATH}/images/`).length

        res.send(`Image Proxy Server online. Proxying ${numberOfImages} images`)
    })

    app.get('/pic', async (req, res) => {
        const url = req.query.url;

        try {
            const imageRecord = await findOrCreateImageRecord(url);
            res.sendFile(`${process.env.DATA_PATH}/images/${imageRecord.fileId}`);
        } catch (e) {
            console.log(e)
            res.status(404).send(`Could not retrieve ${url}`)
        }
    })

    app.use(express.json());

    app.post("/prepare", async (req, res) => {
        if (req.body.access_token !== process.env.ACCESS_TOKEN) {
            res.status(401).send(`Unauthorized`);
            return
        }

        try {
            const imageRecord = await findOrCreateImageRecord(req.body.url);
            res.status(200).send(`Success`);
        } catch (e) {
            console.log(e)
            res.status(404).send(`Could not retrieve ${url}`)
        }
    })

    app.listen(port, () => {
        console.log(`Image proxy listening on port ${port}`)
    })
}

main()