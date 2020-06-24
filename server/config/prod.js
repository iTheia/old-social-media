const prod = {
    port: process.env.PORT || 8080,
    database:process.env.DATABASE,
    secret:{
        token:process.env.TOKEN
    }
}

export default prod