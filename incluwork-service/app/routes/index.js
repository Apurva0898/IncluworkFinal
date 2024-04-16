import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import ratingsRouter from './ratingsRoutes.js';
import jobRouter from './jobRoutes.js';

const initializeRoutes = (app) => {
    app.use('/incluwork', authRouter);
    app.use('/incluwork', userRouter);
    app.use('/incluwork',ratingsRouter);
    app.use('/incluwork',jobRouter);
}

export default initializeRoutes;