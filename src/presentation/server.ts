import express, { Router } from "express";
import path from "path";
import compression from "compression";

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, publicPath, routes } = options;
    this.port = port;
    this.publicPath = publicPath ?? "public";
    this.routes = routes;
  }

  async start() {
    // middleware
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(compression());

    // routes
    this.app.use(this.routes);

    // public folder
    this.app.use(express.static(this.publicPath));

    this.app.get("*", (req, res) => {
      console.log(req.url);

      const indexPath = path.join(
        __dirname,
        "..",
        "..",
        this.publicPath,
        "index.html"
      );
      res.sendFile(indexPath);
      return;
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
