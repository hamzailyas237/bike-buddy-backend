
const express = require('express')
const { mongoose } = require('mongoose')
const router = require('./routers/router')

require('dotenv').config()
const PORT = process.env.PORT || 5500
const app = express()
const cors = require('cors')


mongoose.connect(process.env.URI)
    .then(res => {
        console.log('MongoDB Connected');
    })
    .catch(err => console.log('MongoDB Connection Error', err))


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Bike Buddy APIs');
});

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})