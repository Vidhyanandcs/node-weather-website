const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

//Set up handlebar engine and views location (express expects a views folder for hbs files, but if we want custamization)
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'VCS'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'VCS'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Contact for Any Help',
        name: 'vcs'
    })
})


app.get('/weather', (req,res)=>{
        if(!req.query.address){
            return res.send({
                error: 'Please provide a location'
            })
        }
        geocode (req.query.address,(error, {latitude,longitude,location}={}) => {
                if(error){
                    return res.send({error}) //used shorthand error 
                }
        
                forecast (latitude,longitude, (error, forecastData) => {
                    if(error){
                        return res.send({error})
                    }
                        return res.send({
                            location,
                            forecastData: forecastData,
                            address: req.query.address
                        })
                    
                })
        })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
       return res.send({
           error: 'You must provide a search term'
       })
    }
})


app.get('/help/*', (req,res)=>{

    res.render('404',{
        title: '404 Error',
        errorMessage: 'Help article not found',
        name: 'vcs'
    })
})

app.get('*',(req,res)=>{

    res.render('404',{
        title: '404 Error',
        name: 'vcs',
        errorMessage: 'Page Not Found'
    })
})


app.listen(3000,()=>{
    console.log('The server is up on port 3000');
})