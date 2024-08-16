
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express') ;
const cors = require('cors') ;
const app = express() ;
const port = process.env.PORT || 5555

app.use(cors({
    origin : [
        'http://localhost:5173'
    ] ,
    credentials : true ,
})) ;
app.use(express.json()) ;
require("dotenv").config() ;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w0yjihf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const booksCollection = client.db("PH-Task2").collection("Books") ;

    app.get('/products' , async (req , res) =>{
      const {currentPage , search , category , brand , price} = req.query ;
      let query = {} ;
      
      if(search){
        query.bookTitle = { $regex: search , $options: 'i' };
      }
      if(category){
        query.category = category ;
      }
      if(brand){
        query.brandName = brand ;
      }
      if(category && brand){
        query = { $and : [ { brandName : brand } , { category : category } ] } ;
      }
      if(price){
        query.price = { $gte : parseFloat(price.slice(0,2)) , $lte : parseFloat(price.slice(4)) }
      }
      if(category && brand && price){
        query = { $and : [ { brandName : brand } , { category : category } , { price : { $gte : parseFloat(price.slice(0,2)) , $lte : parseFloat(price.slice(4)) } } ] } ;
      }

      const result = await booksCollection.find(query)
      .skip((parseInt(currentPage) - 1) * 8).limit(8)
      .sort({creationDate : -1})
      .toArray() ;
      res.send(result) ;
    })

    app.get('/productsCount' , async (req , res) => {
      const count = await booksCollection.estimatedDocumentCount() ;
      res.send({count}) ;
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/' , async (req , res) => {
    res.send(`The task server is running`)
})

app.listen(port , () => {
    console.log(`Server is running at port : ${port}`)
})
