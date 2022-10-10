
module.exports = {
    dev:{
        connectionString:"postgresql://postgres:docker@127.0.0.1:5432/carsdb",
        port:'5001'
    },
    production:{
        connectionString: process.env.POSTGRES_CONNECTION_STRING ,

        ssl: {resolveObjectURL:false},
        port: process.env.PORT

    }
}