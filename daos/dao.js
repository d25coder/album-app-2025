// creat a file where all files can meet up
// create one spot where all Dao can meet 
//5-1
const daoCommon = require('./common/daoCommon')
//5-2
const albumDao = {
    ...daoCommon,
    ...require('./api/albumDao')
}

const artistDao = {
    ...daoCommon,
    ...require('./api/artistDao')
}

const bandDao = {
    ...daoCommon,
    ...require('./api/bandDao')
}

const labelDao = {
    ...daoCommon,
    ...require('./api/labelDao')
}

//5-3 pulling from albumDao
module.exports = {
    albumDao,
    artistDao,
    bandDao,
    labelDao
}

