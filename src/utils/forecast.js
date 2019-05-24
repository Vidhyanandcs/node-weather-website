const request = require('request')

const forecast = (longitude,latitude,callback) => {

    const url = 'https://api.darksky.net/forecast/8d14ae32ad21bb84c1288eb2dba0e219/'+longitude+','+latitude+'?units=si'

    request({url, json:true}, (error, {body}) => {
        if (error){
                 callback('Something went wrong. Please try after sometime',undefined)
           } else if (body.error){
                 callback('Unable to find location',undefined)
           } else {
               callback(undefined,` ${body.daily.data[0].summary} It feels like ${body.currently.apparentTemperature} degrees. But it is currently ${body.currently.temperature} degrees out. There is ${body.currently.precipProbability} chance for rain.`)
           }  
    })
}

module.exports = forecast