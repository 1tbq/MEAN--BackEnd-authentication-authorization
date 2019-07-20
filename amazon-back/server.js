import express from 'express';
const config = require('./config');
const mongoose = require('mongoose');
import { restRouter } from './api';
import { setGlobalMiddleware } from './api/middlewares/global-middleware';
const app = express();

mongoose.connect(config.database, { useNewUrlParser: true }, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log("Connected successfully to databse");
    }
});

//Register global middlewares
setGlobalMiddleware(app);
app.use('/api', restRouter);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message
        },
    })
});

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`))