import express from "express";
import helmet from "helmet";
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const cors = require("cors");
import passport from "passport";
import 'dotenv/config'
import fs from "fs";
import path from "path";
import router from "./routes/_auth.routes";
import commRouter from './routes/community.routes';
import config from "./app/config/config";
import morgan from "./logger/_morgan";
import jwtStrategy from "./app/middleware/passport";
import authLimiter from "./app/utils/_rateLimiter";
import { errorConverter, errorHandler } from "./errors/_error";
import ApiError from "./errors/_ApiError";
// import methodNotAllowed from "./middleware/methodNotAllowed";
// import allowedMethods from "./config/allowedMethod";
import { StatusCodes } from "http-status-codes";

const env = process.env.NODE_ENV;
let url;
if (env == "production") {
  url = "https://api.mentortower.ng";
}
else {
  url = "http://localhost:8000";
}

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

const whitelist = [
  "http://localhost:3003",
  "http://localhost:8000",
];
const corsOption = {
  origin: function(origin: string, callback: any) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    }
    else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(helmet());
app.use(cors(corsOption))
app.options('*', cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}
app.use('/v1', router);
app.use('/v1/comms', commRouter);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mentor Tower APIs",
      version: "0.1.0",
      description: "API documentation for mentor tower app",
      servers: [
        {
          url: url,
        },
      ],
    },
  },
  apis: [
    `${__dirname}/routes/*.routes.ts`
  ],
};

const css = fs.readFileSync(
  path.resolve(__dirname, '../node_modules/swagger-ui-dist/swagger-ui.css'),
  'utf8'
);

const specs = swaggerjsdoc(options);
app.use(
  "/docs",
  swaggerui.serve,
  swaggerui.setup(specs, {
    customCss: css
  })
);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);


export default app;
