import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import ratingsRouter from './ratingsRoutes.js';
import jobRouter from './jobRoutes.js';
import adminRouter from './adminRoutes.js';
import jobApplicationRouter from './jobApplicationRoutes.js';
// import uploadRouter from './uploadRoutes.js';

const initializeRoutes = (app) => {
    app.use('/incluwork', authRouter);
    app.use('/incluwork', userRouter);
    app.use('/incluwork', ratingsRouter);
    app.use('/incluwork', jobRouter);
    app.use('/incluwork', adminRouter);
    app.use('/incluwork', jobApplicationRouter);
    // app.use('/incluwork', uploadRouter);
}

export default initializeRoutes;