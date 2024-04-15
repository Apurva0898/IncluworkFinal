import authRouter from './authRoutes.js';

const initializeRoutes = (app) => {
    app.use('/incluwork', authRouter);
}

export default initializeRoutes;