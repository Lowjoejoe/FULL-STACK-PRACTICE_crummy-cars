//set up dependencies 
const express = require('express');
const app = express(); 
const PORT = 5000; 
const { Client } = require('pg'); 
const config = require('./config.js')[process.env.NODE_ENV||"dev"]
const cors = require('cors'); 

const client = new Client ({
    connectionString: config.connectionString,
});

client.connect(); 

//set up middleware
app.use(express.json());
app.use(cors()); 

//set up routes//
app.get('/', (req,res)=>{
    res.send("Welcome to Crummy Cars.com")
})

//route to all vehicle data 
app.get('/api/vehicles', (req,res,next)=>{
    client.query(`SELECT * FROM vehicles`)
    .then(results=>{
        res.status(200)
        res.send(results.rows);
    })
    .catch(next);
});

//route to all vehicle by ID 
app.get('/api/vehicles/:id', (req,res,next)=>{
    client.query(`SELECT * FROM vehicles WHERE vehicle_id = ${req.params.id}`)
    .then(results=>{
        if(results.rows.length == 0){
            res.status(404);
            res.send('VEHICLE ID NOT FOUND IN DATABASE you idiot');
            return;
        }
        res.status(200)
        res.send(results.rows); 
    })
    .catch(next); 
});

//route to post new vehicle to database
app.post('/api/vehicles', (req,res)=>{
    let newVehicle = req.body; 
    console.log(newVehicle); 
    if(newVehicle.make && newVehicle.model && newVehicle.color && newVehicle.type && newVehicle.year && typeof newVehicle.year == 'number' && newVehicle.make.length != 0 && newVehicle.model.length !=0 && newVehicle.color.length !=0 && newVehicle.type.length !=0 && newVehicle.year.length !=0){
    client.query(`INSERT INTO vehicles (make,model,color,type,year) VALUES ('${newVehicle.make}','${newVehicle.model}','${newVehicle.color}','${newVehicle.type}',${newVehicle.year})`,
    (err)=>{
        if(err){
            console.error(err);
        }else{
            let newVehicleString = JSON.stringify(newVehicle);
            res.status(200);
            res.send(`Vehicle information added to database: ${newVehicleString}`);
             }
        });
    }else{
        res.status(404);
        res.send(`404 ERROR: bad input please provide vehicle: make | model | color | type | year (as integer)`);
    }
});

//route to delete vehicle from database by id
app.delete('/api/vehicles/:id', (req,res)=>{
    client.query(`SELECT FROM vehicles WHERE vehicle_id = ${req.params.id}`)
    .then(result=>{
        if(result.rows.length == 0){
            res.status(404);
            res.send(`vehicle doesn't exist in the database`);
            return;
        }else{
            let deletedVehicle = JSON.stringify(result.rows);
            res.status(200);
            res.send(`Vehicle data deleted from database: ${deletedVehicle}`);// returning empty object need to troubleshoot further to return selected data
            client.query(`DELETE FROM vehicles WHERE vehicle_id = ${req.params.id}`)
        }
    })
});

// route to patch vehicle in database
app.patch('/api/vehicles/:id', (req,res)=>{
    let vehicleUpdate = req.body;
    if(vehicleUpdate.make && vehicleUpdate.model && vehicleUpdate.color && vehicleUpdate.type && vehicleUpdate.year && typeof vehicleUpdate.year == 'number' && vehicleUpdate.make.length != 0 && vehicleUpdate.model.length !=0 && vehicleUpdate.color.length !=0 && vehicleUpdate.type.length !=0 && vehicleUpdate.year.length !=0){
        client.query(`UPDATE vehicles SET make = '${vehicleUpdate.make}', model = '${vehicleUpdate.model}', color = '${vehicleUpdate.color}', type = '${vehicleUpdate.type}', year = ${vehicleUpdate.year} WHERE vehicle_id = ${req.params.id}`);
        res.status(200);
        let vehicleString = JSON.stringify(vehicleUpdate);
        res.send(`Vehicle at ID ${req.params.id} updated to ${vehicleString}`);
    }else{
        res.status(404);
        res.send(`404 ERROR: bad input please provide vehicle: make | model | color | type | year (as integer)`);
    }
});

//set up listen on server 
app.listen(PORT, ()=>{
    console.log(`server running on port: ${PORT}`)
});

