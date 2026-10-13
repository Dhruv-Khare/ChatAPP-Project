const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://patrachar.netlify.app",
].filter(Boolean);

export const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

  export const PATRACHAR="Patrachar";
