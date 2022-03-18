const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o0i8x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(uri);


async function run() {
    try {
        await client.connect();
        const database = client.db('orange-toolz');

        const newsCollection = database.collection('news');
        // Post data

        app.post('/news', async (req, res) => {
            const user = req.body;

            const result = await newsCollection.insertOne(user);
            console.log('news saved');
            res.json(result);
        })

        // get data
        app.get('/news', async (req, res) => {
            const cursor = newsCollection.find({});
            const users = await cursor.toArray();
            console.log('News found');
            res.send(users);
        })



        console.log('database connected');
    }
    finally {
        // await client.close();

    }
}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Orange Toolz')
})

app.listen(port, () => {
    console.log(`Port :${port}`)
})