const express  = require('express');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello")
})

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})