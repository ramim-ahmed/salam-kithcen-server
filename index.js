const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
const port = 5000





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kcswx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {

  const foodCollection = client.db("salam").collection("products");
  const ordersCollection = client.db("salam").collection("orders");

  app.post('/product', (req, res) => {
      const item = req.body;
      foodCollection.insertOne(item)
      .then( result => {
         res.send(result.insertedCount > 0);
         console.log(result.insertedCount > 0);
      })

  })

  app.get('/menuItem/:id', (req, res) => {
      foodCollection.find({_id : ObjectId(req.params.id)})
      .toArray( (err, result) => {
          res.send(result[0])
      })
  })
  
  app.get('/breakfast', (req, res) => {

      foodCollection.find({type: req.query.type})
      .toArray( (err, result) => {
          res.send(result)
      })
  })

  app.get('/lunch', (req, res) => {
      foodCollection.find({type: req.query.type})
      .toArray( (err, result) => {
          res.send(result)
      })
  })

  app.get('/dinner', (req, res) => {
      foodCollection.find({type: req.query.type})
      .toArray( (err, result) => {
          res.send(result)
      })
  })

  app.post('/order', (req, res) => {
      const userOrder = req.body;
      ordersCollection.insertOne(userOrder)
      .then(result => {
          res.send(result.insertedCount > 0)
          console.log(result.insertedCount > 0);
      })
  })
  
  app.get('/cartItem', (req, res) => {
      ordersCollection.find({email : req.query.email})
      .toArray( (err, result) => {
          res.send(result)
      })
  })
  
  app.get('/manageProduct', (req, res) => {
      foodCollection.find()
      .toArray( (err, result) => {
          res.send(result)
      })
  })

  app.get('/delete/:id', (req, res) => {
      foodCollection.deleteOne({_id : ObjectId(req.params.id)})
      .then( result => {
          res.send(result.deletedCount > 0)
      })
  })
    

  app.get('/singleProduct/:id', (req, res) => {
      foodCollection.find({_id : ObjectId(req.params.id)})
      .toArray( (err, documents) => {
          res.send(documents[0])
      })
  })

 

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})