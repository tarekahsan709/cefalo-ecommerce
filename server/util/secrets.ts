
// export const MONGODB_URI = process.env["MONGODB_URI"];
export const MONGODB_URI = 'mongodb://localhost:27017/cefalolab-ecommerce';

if (!MONGODB_URI) {
    console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}

// export const JWT_SECRET = process.env["JWT_SECRET"];
export const JWT_SECRET = 'cefalolabecommerce';
console.log(JWT_SECRET);

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}