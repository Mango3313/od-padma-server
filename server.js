let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./db/database');
    require('dotenv').config();
const jwt = require('jsonwebtoken');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
}).then(() => {
        console.log('Database connected')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)
// Setting up express
const app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors({credentials:true,origin:true}));

// Api root
const doctorRoute = require('./routes/doctor.route')
const userRoute = require('./routes/login.route')
const medicamentosRoute = require('./routes/medicamentos.route')
const pacienteRoute = require('./routes/paciente.route')
const peticionesRoute = require('./routes/peticiones.route')
const talleresRoute = require('./routes/talleres.route')
const trabajadoresRoute = require('./routes/trabajadores.route')

app.use('/doctores', doctorRoute)
app.use('/usuarios', userRoute)
app.use('/medicamentos', medicamentosRoute)
app.use('/paciente', pacienteRoute)
app.use('/peticiones', peticionesRoute)
app.use('/talleres', talleresRoute)
app.use('/trabajadores', trabajadoresRoute)

// Create port
const port = process.env.PORT || 8080;

// Conectting port
const server = app.listen(port, () => {
    console.log('Port connected to: ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(()=>{
        res.status(404).json({message:"No se encontro la ruta solicitada :c"})
    });
});

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

// Static build location
app.use(express.static(path.join(__dirname, 'dist')));