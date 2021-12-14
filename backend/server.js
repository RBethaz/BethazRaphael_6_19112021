// Import du package http
const http = require("http");
// Import de l'application
const app = require("./app");
const cors = require("cors");

// Renvoie un port valide
const normalizePort = (val) => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.PORT || "3000");

  // On indique a express sur quel port elle va tourner
  app.set("port", port);

// Recherche des différentes erreurs puis gestion de manière appropriée
  const errorHandler = (error) => {
  if (error.syscall !== "listen") {
      throw error;
    }
    const address = server.address();
    const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
      case "EACCES":
      console.error(bind + " requires elevated privileges.");
        process.exit(1);
        break;
        case "EADDRINUSE":
          console.error(bind + " is already in use.");
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
  app.use(cors());

  // Appel de la methode createServer du package http --> A chaque requete au serveur, cette fonction sera appelee 
  const server = http.createServer(app);
  
  server.on("error", errorHandler);
  server.on("listening", () => {
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
  });

server.listen(port); 