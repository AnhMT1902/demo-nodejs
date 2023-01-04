const CONNECTION = require('../model/connection');
CONNECTION.connecting();

class CityService {
    getCity() {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select city.id as id, city.name as city, c.name as country
                              from city
                                       join country c on city.id_country = c.id`, (err, citys) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(citys);
                }
            });
        })
    }

    showCity() {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select *
                              from country`, (err, homestays) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestays);
                }
            });
        })
    }

    findByID(id) {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select city.name,
                                     c.name as country,
                                     city.id_country,
                                     city.area,
                                     city.population,
                                     city.GDP,
                                     city.description
                              from city
                                       join country c on c.id = city.id_country
                              where city.id = ${+id}`, (err, homestays) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestays);
                }
            });
        })
    }

    deleteCity(id) {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`DELETE
                              FROM city
                              WHERE ID = ${+id}`, (err, homestays) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestays);
                }
            });
        })
    }

    saveCity(homestay) {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`insert into city(name, id_country, area, population, GDP, description) value ('${homestay.name}', ${+homestay.city}, ${+homestay.bedroom},${+homestay.wc},${+homestay.price}, '${homestay.description}')`, (err, homestays) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestays);
                }
            });
        })
    }

    editCity(product, id) {
        let connection = CONNECTION.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`update city
                              set name        = '${product.name}',
                                  id_country  = ${+product.city},
                                  area        = ${+product.bedroom},
                                  population  = ${+product.wc},
                                  GDP         = ${+product.price},
                                  description = '${product.description}'
                              where id = ${+id}`, (err, homestays) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(homestays);
                }
            });
        })
    }


}

module.exports = new CityService;