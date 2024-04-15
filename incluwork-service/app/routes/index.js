import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';

const initializeRoutes = (app) => {
    app.use('/incluwork', authRouter);
    app.use('/incluwork', userRouter);
}

export default initializeRoutes;