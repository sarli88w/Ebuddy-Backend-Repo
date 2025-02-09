import path from "path";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

export class ApiClient {
  private static _instance: ApiClient;
  public static get instance() {
    if (!ApiClient._instance) {
      ApiClient._instance = new ApiClient();
    }
    return ApiClient._instance;
  }

  private isReadyResolve: any;
  public isReady = new Promise((resolve) => {
    this.isReadyResolve = resolve;
  });

  public app: any;

  constructor(overrideOptions?: any) {
    const config = Object.assign({
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT || 5000,
      auth: {},
      swagger: {},
    }, overrideOptions || {});

    dotenv.config({
      path: path.join(process.cwd(), '.env'),
      override: true,
    });

    this.app = express();

    this.initReqHandler(this.app, config);
    this.initMiddleware(this.app, config);
    
    this.app.listen({ host: config.host, port: config.port }, () => {
      console.log(`Server is running on port ${config.port}`);
      this.isReadyResolve();
    });
  }

  public async init() {
    console.debug("Api Client init");
    await this.isReady;
    console.debug("Api Client ready");
  }

  public initReqHandler(app: any, config: any) {
    app.use(cors());
    app.use(bodyParser.json());
  }

  public initMiddleware(app: any, config: any) {
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error(`${req.method} ${req.url} - ${err.message}`);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    });

    process.on('uncaughtException', (err: any) => {
      app.log.error(`Uncaught Exception: ${err.message}`);
      process.exit(1);
    });
    
    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      app.log.error(`Unhandled Rejection: ${reason}`);
    });
  }
}
