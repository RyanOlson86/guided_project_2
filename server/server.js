import express from 'express';
import { MongoClient, ObjectId } from "mongodb";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express()
app.use(cors())
app.use(express.json())
const PORT = 3000;
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.get('/api/planets', async (req, res)=>{
    try{
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection('planets')
        const planets = await collection.find({}).toArray();
        console.log(planets)
        res.json(planets)
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("You got an error.")
    }
})

app.get('/api/films', async (req, res)=>{
    try{
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection('films')
        const films = await collection.find({}).toArray();
        res.json(films)
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("You got an error.")
    }
})

app.get('/api/characters', async (req, res)=>{
    try{
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection('characters')
        const characters = await collection.find({}).toArray();
        res.json(characters)
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("You got an error.")
    }
})

app.get('/api/characters/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection('characters')
        const characters = await collection.find({id : +id}).toArray();
        res.json(characters[0])
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("You got an error.")
    }
})

app.get('/api/films/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection('films')
        const films = await collection.find({id : +id}).toArray();
        res.json(films[0])
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("You got an error.")
    }
})

app.get('/api/planets/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection('planets')
        const planets = await collection.find({id : +id}).toArray();
        res.json(planets[0])
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("You got an error.")
    }
})

app.get('/api/films/:id/characters', async (req, res)=>{
    try{
        const id = req.params.id
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection('films_characters')
        const data = await collection.find({film_id : +id}).toArray();
        res.json(data)
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("You got an error.")
    }
})

app.get('/api/films/:id/planets', async (req, res)=>{
    try{
        const id = req.params.id
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection('films_planets')
        const data = await collection.find({film_id : +id}).toArray();
        res.json(data)
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("You got an error.")
    }
})

app.get('/api/characters/:id/films', async (req, res)=>{
    try{
        const id = req.params.id
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection('films_characters')
        const data = await collection.find({character_id : +id}).toArray();
        res.json(data)
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("You got an error.")
    }
})

app.get('/api/planets/:id/films', async (req, res)=>{
    try{
        const id = req.params.id
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection('films_planets')
        const data = await collection.find({planet_id : +id}).toArray();
        res.json(data)
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("You got an error.")
    }
})

app.get('/api/planets/:id/characters', async (req, res)=>{
    try{
        const id = req.params.id
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection('characters')
        const data = await collection.find({homeworld : +id}).toArray();
        res.json(data)
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("You got an error.")
    }
})