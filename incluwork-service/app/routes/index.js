import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import ratingsRouter from './ratingsRoutes.js';

const initializeRoutes = (app) => {
    app.use('/incluwork', authRouter);
    app.use('/incluwork', userRouter);
    app.use('/incluwork',ratingsRouter);
}

export default initializeRoutes;