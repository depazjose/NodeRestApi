// ===============================
//  Puerto
// ===============================
process.env.PORT = process.env.PORT || 3001;

// ===============================
//  Ambiente
// ===============================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ===============================
//  jwt
// ===============================
process.env.JWT_CADUCIDAD = 60 * 60 * 48 * 15;
process.env.JWT_SEED = process.env.JWT_SEED || 'my-jwt-token'

// ===============================
//  Google Auth
// ===============================

process.env.GOOGLE_ID = process.env.GOOGLE_ID || '164913549780-hnj8e59reqcksuuojjlrqhs30kglh6v2.apps.googleusercontent.com'

// ===============================
//  Base de datos
// ===============================

let urlDb;

if (process.env.NODE_ENV === "dev") {
    urlDb = "mongodb://localhost:27017/cafe";
    console.log("Conectado a dev local");
} else {
    urlDb = process.env.MONGO_URI;
}
process.env.URL_DATABASE = urlDb;

module.exports = process;