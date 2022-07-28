const repo = require('../repository/repository');

function getSearch(req,res){
    repo.getSearch(req).then(data => {
    res.status(200).send(data);
});
}

module.exports = { getSearch};