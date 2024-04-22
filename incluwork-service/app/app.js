import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import initializeRoutes from "./routes/index.js";
import passportConfig from "./lib/passportConfig.js";
import passport from "passport";

const initialize = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(passport.initialize());
    mongoose.connect("mongodb+srv://incluwork:fXgu5sojq3Zy6aKf@incluworkcluster.gui16wl.mongodb.net/incluworkdb?retryWrites=true&w=majority&appName=IncluWorkCluster");
    initializeRoutes(app);
}

export default initialize;