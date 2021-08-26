const router = require('express').Router()
require('dotenv').config();
const axios = require("axios").default;
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const { id } = req.query;
        const options = {
            method: 'GET',
            url: process.env.STREAM_URL,
            params: {country: 'us', imdb_id: id},
            headers: {
            'x-rapidapi-host': process.env.STREAM_HOST,
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