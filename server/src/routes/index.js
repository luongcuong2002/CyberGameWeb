const authRouter = require('./auth.routes');
const adminRouter = require('./admin.routes');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/api/admin', adminRouter);
}

module.exports = route;