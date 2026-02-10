import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
const SECRET_KEY = "mysecretkey";

/* function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
}
 */
// ✅ CORS before routes
app.use(cors({
   origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://social-media-analytics-frontend-three.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
/* =====================
   ROOT + HEALTH ROUTES
===================== */
app.get("/", (req, res) => {
  res.send("🚀 Social Media Analytics API is running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend running"
  });
});
// Dummy user
const user = {
  id: 1,
  email: "admin@gmail.com",
  password: bcrypt.hashSync("admin123", 10)
};



// LOGIN API
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== user.email) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

/* function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
}
 */

// ✅ KPI Summary API (MOVE IT HERE)
app.get("/api/analytics/summary", (req, res) => {
  res.json({
    totalPosts: 443,
    totalLikes: 30700,
    totalComments: 7300,
    engagementRate: 7.4,
    changes: {
      posts: 12.5,
      likes: 18.2,
      comments: -3.8,
      engagement: 5.6
    }
  });
});

// Engagement chart API
app.get("/api/analytics/engagement", (req, res) => {
  res.json([
    { date: "Mon", engagement: 120 },
    { date: "Tue", engagement: 180 },
    { date: "Wed", engagement: 150 },
    { date: "Thu", engagement: 220 },
    { date: "Fri", engagement: 260 },
    { date: "Sat", engagement: 300 },
    { date: "Sun", engagement: 280 }
  ]);
});
// Platform comparison API
app.get("/api/analytics/platform-comparison", (req, res) => {
  res.json([
    { platform: "Twitter", engagement: 5200 },
    { platform: "Instagram", engagement: 6800 }
  ]);
});
// Engagement share pie chart API
app.get("/api/analytics/engagement-share", (req, res) => {
  res.json([
    { name: "Twitter", value: 45 },
    { name: "Instagram", value: 55 }
  ]);
});


// ✅ START SERVER (ALWAYS LAST)
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
