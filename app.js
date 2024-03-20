const express = require('express')
const mongoose = require('mongoose')
const Customer = require('./models/Customer.model.js');
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("API response Updates");
});


// display every customer
app.get('/api/customers', async (req, res) => {
    try {        
        const customers = await Customer.find({});
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// record customer
app.post('/api/customers', async (req, res) => {
    try {
         const customer = await Customer.create(req.body);
         res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// display single customer based on  id
app.get('/api/customers/:id', async (req, res) =>{
    try{
        const { id } = req.params
        const customer = await Customer.findById(id);
        res.status(200).json(customer);
    }
    catch (error){
        res.status(500).json({message: error.message});
    }
});

// update customer info
app.put('/api/customers/:id', async (req, res)=>{
    try{
        const { id } = req.params;
        const customer = await Customer.findByIdAndUpdate(id, req.body);
        if(!customer){
            return res.status(404).json({message: "Customer not found"});
        }

        const updatedCustomer = await Customer.findById(id);
        res.status(200).json(updatedCustomer);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

app.delete('/api/customers/:id', async (req, res) =>{
    try{
        const { id } = req.params;
        const customer = await Customer.findByIdAndDelete(id);
        if(!customer){
            res.status(404).json({message: "Customer not found"});
        }

        res.status(200).json({message: "Customer deleted Successfully"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});




mongoose.connect("mongodb+srv://nsabimanapeter2000:admin@nodebackend.0spj8ja.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NodeBackend")
.then(()=>{
    console.log("Connected to database");
    app.listen(3000, () =>{
        console.log('Server is running on port 3000');
    });
})
.catch(()=>{
    console.log("connection failed");
});