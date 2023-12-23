const dotenv = require('dotenv'); 
dotenv.config(); 
const http = require('http'); 

const mongoose = require("mongoose");

const connectionString = process.env.MONGO_URL; 

// 1) MongoDB ulanadi
mongoose.connect( 
    connectionString, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }, 
    (err, client) => { 

        if(err) console.log('ERROR: Failed to connect to MongoDB!'); 
        
        else{ 

            console.log('MongoDB successfully connect'); 
            const app = require('./app'); 

            const server = http.createServer(app); 
            let PORT = process.env.PORT || 3003; 

            server.listen(PORT, function() { 
                console.log(`server is running successfully on port ${PORT}, http://localhost:${PORT}`);
            });
        }
    }
);