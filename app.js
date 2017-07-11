const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');

app.get('/', function(req, res){ 
    res.render('index');
});

port=8000;
var server = app.listen(port, function() {
    console.log("Listening on Port: ", port);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    console.log('connected socket', socket.id);
        socket.on('socket_button_clicked', function (data){
            console.log('Someone clicked a button!  Reason: '  + data.reason);
            socket.emit('server_response', {response:  "sockets are the best!"});
        });
        socket.on('form_data', function (data){
            console.log('inbound form data ' + data.yourname);
            console.log('inbound form data ' + data.location);
            console.log('inbound form data ' + data.language);
            console.log('inbound form data ' + data.comments);
            socket.emit('server_response', {response:  "got your data!"});
        });
        socket.on('disconnect', function(){
        console.log('disconnected socket', socket.id)
        });
});
