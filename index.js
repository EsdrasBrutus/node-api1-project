const server = require('./api/server');

const port = 5000;

// START YOUR SERVER HERE
console.log("Hello World")

server.listen(port, ()=>{
    console.log("server up at port:", port)
})