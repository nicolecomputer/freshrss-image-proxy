const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/pic', (req, res) => {
    const url = req.query.url;

    res.send(url)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})