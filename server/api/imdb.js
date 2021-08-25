const router = require('express').Router()
require('dotenv').config();
const axios = require("axios").default;
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const { title, type } = req.query;
        const options = {
            method: 'GET',
            url: process.env.IMDB_URL,
            params: {type: type, title: title},
            headers: {
            'x-rapidapi-host': process.env.IMDB_HOST,
            'x-rapidapi-key': process.env.API_KEY
            }
        };
        const response = await axios.request(options);
        const results = response.data;
        res.send(results);
    }
    catch(err) {
        console.error(err);
    };
})