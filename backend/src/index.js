const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

// const io = require('socket.io')(server, {
//     cors: {
//       origin: "http://localhost:3000",
//       credentials: true,
//       methods: ["GET", "POST"]
//     }
//   });
mongoose.connect(
    'mongodb+srv://rocha:123@cluster0.s3sgd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3000, () => {
    console.log('Serviço iniciado na porta 3000')
})
