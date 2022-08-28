import Crypto from "crypto";
import fs from "fs"
import fetch from 'node-fetch';
import mime from "mime-types"

import Images from "./db/image.js"
import Database from "./db/index.js";


const basePath = "/Users/nicolewatts/workspace/freshrss-image-proxy/images"

async function X() {
    const db = new Database("./main.sqlite")
    const images = new Images(db);
    await images.createTable()

    const url = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
    var imageRecord = await images.findByUrl(url)

    if (!imageRecord) {
        const downloadedImage = await downloadImage(basePath, url);
        await images.insert(
            url,
            downloadedImage.filename)

        var imageRecord = await images.findByUrl(url)
    }

    console.log(imageRecord)
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

X()