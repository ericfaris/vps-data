require('dotenv').config()
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('VPS Data Service is up and running...');
});

router.get('/tables', async (req, res) => {
    const vpsData = req.vpsData;
    let tables = vpsData;
    let id = null;
    let name = null;

    if (!(req.query && Object.keys(req.query).length === 0 && Object.getPrototypeOf(req.query) === Object.prototype)) {
        id = req.query?.id;
        name = req.query?.name;

        if (id) {
            tables = tables.filter(t => t.id === id);
        } else if (name) {
            const regex = new RegExp(`.*${name.toLowerCase()}.*`, 'i');
            tables = tables.filter(t => t.name.toLowerCase().match(regex));
        }
    }

    res.send(tables);
});

module.exports = router;