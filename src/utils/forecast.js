const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=de5a9d9a1b1e9ce16e1846e195317a87&query=' + latitude + ',' + longitude;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + response.body.current.temperature + ' degrees out.')
        }
    })
}

module.exports = forecast