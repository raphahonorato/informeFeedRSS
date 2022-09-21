const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const axios = require('axios').default;

app.use(cors({
    origin: "*"
}))

app.get('/rss', (req, res) =>  {
    axios.get('https://cointelegraph.com.br/rss')
    .then((rss)=>{
        res.send(rss.data);
    })
})

app.listen(port, () => {
    console.log("Example is listening on port " + port);
})