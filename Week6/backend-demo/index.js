// imported the express & dotenv libraries
const express = require("express");
require('dotenv').config();
const app = express();

app.use(express.json());

// fake database
const tweets = [
    {
        id: 1,
        user: 'Vincent',
        tweet: "I'm voting for Joe Biden!"
    },
    {
        id: 2, 
        user: "Zara",
        tweet: "I'm voting for Mike Pence"
    }
]


app.get("/tweets", (req, res) => {
    res.send(tweets);
})

app.get("/tweets/:user", (req, res) => {
    let index = tweets.find(t => t.user === req.params.user); 
    if (index) {
        res.send(index)
    } else {
        res.status(404).send("TWEET NOT FOUND");
    }
})

app.get("/", (req, res) => {
    console.log("Hello to server!")
    res.send("Hello to client!")
})

app.post("/tweets", (req, res) => {
    let tweet = {
        id: tweets.length + 1,
        user: req.body.user,
        tweet: req.body.tweet,
    }

    tweets.push(tweet);
    res.send(tweet);
})


const port = process.env.PORT;
console.log(`http://localhost:${port}`);
app.listen(port, () => console.log(`Server is up and running on port ${port}!`));

