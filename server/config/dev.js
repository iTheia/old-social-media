const dev = {
    port: process.env.PORT || 5000,
    database: 'mongodb://127.0.0.1:27017/social-media',
    secret:{
        token:'secret token'
    }
}

export default dev