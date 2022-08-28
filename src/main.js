import Crypto from "crypto";
import fs from "fs"
import fetch from 'node-fetch';
import mime from "mime-types"

import Images from "./db/image.js"
import Database from "./db/index.js";

const db = new Database(`${process.env.DATA_PATH}/main.sqlite`)
const images = new Images(db);
const imagesPath = `${process.env.DATA_PATH}/images`

export async function initialization() {
    await images.createTable()
    if (!fs.existsSync(imagesPath)) {
        fs.mkdirSync(imagesPath);
    }
}

export async function findOrCreateImageRecord(url) {
    var imageRecord = await images.findByUrl(url)

    if (!imageRecord) {
        const downloadedImage = await downloadImage(imagesPath, url);
        await images.insert(
            url,
            downloadedImage.filename,
            downloadedImage.contentType)

        var imageRecord = await images.findByUrl(url)
    }

    return imageRecord
}

async function downloadImage(basePath, url) {
    const response = await fetch(url);
    const data = await response.buffer();

    const contentType = response.headers.get("content-type");
    const filename = `${Crypto.randomUUID()}.${mime.extension(contentType)}`

    fs.writeFileSync(`${basePath}/${filename}`, data)

    return {
        filename: filename,
        contentType: contentType
    }
}