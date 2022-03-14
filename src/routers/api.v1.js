require('dotenv').config()
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(`in default`);
    res.send('VPS Data Service is up and running...');
});

router.get('/games', async (req, res) => {
    let games = req.vpsData;
    res.send(games);
});

router.get('/games/:name', async (req, res) => {
    let games = req.vpsData;
    const name = req.params.name;

    const regex = new RegExp(`.*${name?.toLowerCase()}.*`, 'i');
    games = games.filter(g => g.name?.toLowerCase().match(regex));

    res.send(games);
});

router.get('/games/tables/:vpsId', async (req, res) => {
    let games = req.vpsData;
    const vpsId = req.params.vpsId;

    games = games.filter(g => g.tableFiles?.some(t => t?.id === vpsId));
    res.send(games);
});


module.exports = router;