var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/test",(req,res)=>{
res.sendFile(__dirname + '/public/test.html');
})
app.get("*",(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
    })
io.on('connection', (socket) => {
 socket.broadcast.emit('hi');
 socket.on('chat message', (msg) => {

    io.emit('chat message', msg+"|"+req.url);
  });
});
http.listen(process.env.PORT || 3000,()=>{
    console.log("server listening");
})