
const { Router } = require('express');
const { getTypeApi } = require('../Controller/typeController');
const axios = require('axios');


const router = Router()

router.get('/', async (req, res) => {
    const resultType = await getTypeApi()
    res.json(resultType)
})

module.exports = router;


