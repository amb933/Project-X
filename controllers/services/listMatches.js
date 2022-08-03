const selectAllMatchesQuery = require("../../db/serviceQueries/selectAllMatchesQuery");


const listMatches = async (req, res, next) => {
    try {
        
        const { idMatch } = req.params;

        const matches = await selectAllMatchesQuery(idMatch);

       

        res.send({
            status: 'ok',
            data: {
                matches,
            },
        });

    } catch (err) {
        next(err);
    }
}

module.exports = listMatches;

