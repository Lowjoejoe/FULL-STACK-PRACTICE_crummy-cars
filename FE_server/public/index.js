const ENV = "production";
//const ENV = "dev";


var resultArea = document.querySelector('.vehicle');
let ApiUrl = 'http://localhost:5000';

// let ApiUrl = ENV == "dev" ? 'http://localhost:5001': 'copy in path from render'
// console.log("API:", ApiUrl);

//Define global variables for adding vehicle 
let vehicleMake = document.querySelector('.make').value;
let vehicleModel = document.querySelector('.model').value;
let vehicleColor = document.querySelector('.color').value;
let vehicleType = document.querySelector('.type').value;
let vehicleYear = document.querySelector('.year').value; 


//set up fetch to API 
function pullAPIdata() {
// var URL = 'http://localhost:5000/api/vehicles';
fetch(`${ApiUrl}/api/vehicles`)
.then((response)=>response.json())
.then((data)=>{
    addResultsToDOM(data); 
    })
.catcher(err=> console.log(err));
}

//need to add ability to search and have results returned
document.querySelector(".search button").addEventListener("click",()=>{
let searchValue = document.getElementsByClassName("search").value
    if(searchValue = 'search'){
    pullAPIdata(); 
    }else{
    console.log("have some more feature to make");
    }
})

//adds event listener to add vehicle button to pull input fields and create new vehicle to the database
document.querySelector("#add_vehicle").addEventListener("click", ()=>{
    let vehicleMake = document.querySelector('.make').value;
    let vehicleModel = document.querySelector('.model').value;
    let vehicleColor = document.querySelector('.color').value;
    let vehicleType = document.querySelector('.type').value;
    let vehicleYear = document.querySelector('.year').value;
  
    let newVehicle = {
        'make': vehicleMake,
        'model': vehicleModel,
        'color': vehicleColor, 
        'type': vehicleType,
        'year': Number(vehicleYear)
    }
   
    if(vehicleMake == '' && vehicleModel == "" && vehicleColor == "" && vehicleType == '' && vehicleYear == ''){
        console.error("error"); 
    }else{
        fetch(`${ApiUrl}/api/vehicles`, {
            method:'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newVehicle)
        })
        .then(response =>{
            if(response.status == 200){
                var vehicleElement = document.createElement('li'); 
                vehicleElement.innerHTML = `make: ${newVehicle.make}, model: ${newVehicle.model}, color: ${newVehicle.color}, type: ${newVehicle.type}, year: ${newVehicle.year}`;
                resultArea.appendChild(vehicleElement);
            }else{
                alert("something went wrong!", response);
                } 
            })

        }
    
    })



//Add data to the DOM
function addResultsToDOM(data){
     $('.vehicle').empty(); 
    for (let i=0; i <data.length; i++){
        var vehicleDiv = document.createElement('li')
        vehicleDiv.innerHTML = `make: ${data[i].make}, model: ${data[i].model}, color: ${data[i].color}, type: ${data[i].type}, year: ${data[i].year}`;
        resultArea.appendChild(vehicleDiv); 
    }
}
pullAPIdata();