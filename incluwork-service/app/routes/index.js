import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import ratingsRouter from './ratingsRoutes.js';
import jobRouter from './jobRoutes.js';
import adminRouter from './adminRoutes.js';
import jobApplicationRouter from './jobApplicationRoutes.js';
<<<<<<< Updated upstream
import uploadRouter from './uploadRoutes.js';
=======
import internalEndpointsRouter from './internalRoutes.js';

// import uploadRouter from './uploadRoutes.js';
>>>>>>> Stashed changes

const initializeRoutes = (app) => {
    app.use('/incluwork', authRouter);
    app.use('/incluwork', userRouter);
    app.use('/incluwork', ratingsRouter);
    app.use('/incluwork', jobRouter);
    app.use('/incluwork', adminRouter);
    app.use('/incluwork', jobApplicationRouter);
<<<<<<< Updated upstream
    app.use('/incluwork', uploadRouter);
=======
    app.use('/incluwork', internalEndpointsRouter);
    // app.use('/incluwork', uploadRouter);
>>>>>>> Stashed changes
}

export default initializeRoutes;