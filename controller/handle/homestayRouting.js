const fs = require('fs');
const qs = require('qs');
const CITY_SERVICE = require('C:\\Users\\adnin\\Desktop\\CodeGym\\MĐ3\\thiMD3\\service\\cityService.js');

// const CategoryService = require('D:\\JavaScript\\Module3\\Module3DemoDatabase\\service\\categoryService.js');

class CityRouting {
    static getHtmlHomestay(products, indexHtml) {
        let tbody = '';
        products.forEach((product, index) => {
            tbody += `<tr>
            <td>${index + 1}</td>
            <td><a href="/home/info/${product.id}"">${product.city}</a></td>
            <td>${product.country}</td>
            <td><a href="/home/edit/${product.id}" class="btn btn-danger">Edit</a></td>
            <td><a href="/home/delete/${product.id}" class="btn btn-danger">Delete</a></td>
        </tr>`
        });
        indexHtml = indexHtml.replace('{homestay}', tbody);
        return indexHtml;
    }

    showHome(req, res) {
        fs.readFile('./views/home.html', 'utf-8', async (err, indexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let homestays = await CITY_SERVICE.getCity();
                indexHtml = CityRouting.getHtmlHomestay(homestays, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(indexHtml);
                res.end();
            }
        });
    }

    showInfo(req, res, id) {
        fs.readFile('./views/info.html', 'utf-8', async (err, indexHtml) => {
            if (err) {
                console.log(err);
            } else {
                let homestays = await CITY_SERVICE.findByID(id);
                let arrCity = await CITY_SERVICE.showCity();
                let editDataHtml = await CityRouting.getHtmlEdit(homestays, arrCity, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(editDataHtml);
                res.end();
            }
        });
    }

    static getHtmlEdit(homestay, arrCity, editHtml) {
        let selCity = ''
        arrCity.forEach((item) => {
            selCity += `<option value="${item.id}">${item.name}</option>`
        })
        editHtml = editHtml.replaceAll('{name}', homestay[0].name);
        editHtml = editHtml.replace('{city}', selCity);
        editHtml = editHtml.replace('{bedroom}', homestay[0].area);
        editHtml = editHtml.replace('{wc}', homestay[0].population);
        editHtml = editHtml.replace('{price}', homestay[0].GDP);
        editHtml = editHtml.replace('{aaa}', homestay[0].description);
        return editHtml;
    }

    static getHtmlInfo(homestay, editHtml) {
        editHtml = editHtml.replaceAll('{name}', homestay[0].name);
        editHtml = editHtml.replace('{city}', homestay[0].id);
        editHtml = editHtml.replace('{bedroom}', homestay[0].area);
        editHtml = editHtml.replace('{wc}', homestay[0].population);
        editHtml = editHtml.replace('{price}', homestay[0].GDP);
        editHtml = editHtml.replace('{aaa}', homestay[0].description);
        return editHtml;
    }

    static getHtmlCreat(arrCity, editHTML) {
        let selCity = ''
        arrCity.forEach((item) => {
            selCity += `<option value="${item.id}">${item.name}</option>`
        })
        editHTML = editHTML.replace('{city}', selCity);
        return editHTML;
    }

    editCity(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/edit.html', 'utf-8', async (err, editHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let homestays = await CITY_SERVICE.findByID(id);
                    console.log(homestays)
                    let arrCity = await CITY_SERVICE.showCity();
                    let editDataHtml = await CityRouting.getHtmlEdit(homestays, arrCity, editHtml);
                    res.writeHead(200, 'text/html');
                    res.write(editDataHtml);
                    res.end();
                }
            });
        } else {
            let homeChuck = '';
            req.on('data', chunk => {
                homeChuck += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    let homestay = qs.parse(homeChuck);
                    console.log(homestay)
                    if (homestay.name.length > 10 || homestay.wc === 'null' || homestay.bedroom === 'null' || homestay.price === 'null') {
                        res.writeHead(301, {'location': `/home/edit/${+id}`});
                        res.end();
                    } else {
                        CITY_SERVICE.editCity(homestay, id);
                        res.writeHead(301, {'location': '/home'});
                        res.end();
                    }

                }
            });
        }
    }

    deleteCity(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/delete.html', 'utf-8', (err, indexHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(indexHtml);
                    res.end();
                }
            });
        } else {
            let homeChuck = '';
            req.on('data', chunk => {
                homeChuck += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    CITY_SERVICE.deleteCity(id)
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            });
        }
    }

    creatCity(req, res) {
        if (req.method ==="GET") {
            fs.readFile('./views/creat.html', 'utf-8', async (err, indexHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let arrCity = await CITY_SERVICE.showCity();
                    indexHtml = await CityRouting.getHtmlCreat(arrCity, indexHtml)
                    res.writeHead(200, 'text/html');
                    res.write(indexHtml);
                    res.end();
                }
            });
        } else {
            let homeChuck = '';
            req.on('data', chunk => {
                homeChuck += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    let homestay = qs.parse(homeChuck);
                    console.log(homestay)
                    if (homestay.name.length > 10 || homestay.wc === 'null' || homestay.bedroom === 'null' || homestay.price === 'null') {
                        res.writeHead(301, {'location': '/creat'});
                        res.end();
                    } else {
                        CITY_SERVICE.saveCity(homestay);
                        res.writeHead(301, {'location': '/home'});
                        res.end();
                    }

                }
            });
        }
    }
}

module.exports = new CityRouting();