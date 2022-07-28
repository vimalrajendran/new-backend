const axios = require("axios");

const api_key = '11ad6e69e841d133c8f824d0ebfd6fdd';
const api_id = 'cd959ef9';
const baseurl = 'https://api.edamam.com/api/food-database/v2/parser';


const getSearch = async(req)  => {
    const ingridient = req.query.ingr;
    const url = `${baseurl}?app_key=${api_key}&app_id=${api_id}&ingr=${ingridient}&nutrition-type=cooking`;
    const response = await axios.get(url);
    // res.send(response.data);
    return response.data;
}


module.exports = {getSearch};