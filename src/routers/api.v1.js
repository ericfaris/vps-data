require('dotenv').config()
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('up and running');
});

router.get('/tables', async (req, res) => {
    const vpsData = req.vpsData;
    let tables = vpsData;
    let name = null;
    let author = null;
    let version = null;

    if (!(req.query && Object.keys(req.query).length === 0 && Object.getPrototypeOf(req.query) === Object.prototype)) {
        name = req.query?.name;
        author = req.query?.author;
        version = req.query?.version;

        const regex = new RegExp(`.*${name.toLowerCase()}.*`, 'i');
        tables = tables.filter(t => t.name.toLowerCase().match(regex));
    }

    res.send(tables);
});

module.exports = router;