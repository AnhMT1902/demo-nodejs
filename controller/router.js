const CITY_ROUTING = require('./handle/homestayRouting');
const handler = {
    "home": CITY_ROUTING.showHome,
    "home/info": CITY_ROUTING.showInfo,
    "home/edit": CITY_ROUTING.editCity,
    "home/delete": CITY_ROUTING.deleteCity,
    'creat': CITY_ROUTING.creatCity
}

module.exports = handler;