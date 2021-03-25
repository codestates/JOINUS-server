const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const portfolioRouter = require("./routes/portfolio");
const accCheck = require("./routes/tokenCheck");
const refreshingToken = require("./routes/refreshingToken");
const create = require("./controller/project/create")
const multer = require("multer");
const _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: _storage });

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://localhost:3000",
      "https://joinus.fun",
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(cookieParser());

app.use("/", (req, res, next) => {
  if (!req.headers.authorization || accCheck(req, res)) {
    next();
  } else {
    res.status(403).json({ data: null, message: "need to renewal" });
  }
});
app.use('/img', express.static('uploads'))

app.get("/refresh", refreshingToken);
app.post("/upload", upload.single('imgFile'), async (req, res) => {
  req.imgPath = req.file.originalname
  create.post(req, res)
})
app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/portfolio", portfolioRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
