const express = require("express");
const cors = require("cors");
const multer = require('multer');
const _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: _storage })
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;
const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");
const portfolioRouter = require("./routes/portfolio");
const accCheck = require("./routes/tokenCheck");
const refreshingToken = require("./routes/refreshingToken");
const models = require("./models");
const { stack, project, project_stack, image } = models;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://localhost:3000",
      "https://joinus.colorfilter.cloud",
      "https://joinus.fun",
      "https://test.joinus.fun"
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(cookieParser());
app.use('/img', express.static('uploads'))
app.use("/", (req, res, next) => {
  if (!req.headers.authorization || accCheck(req, res)) {
    next();
  } else {
    res.status(403).json({ data: null, message: "need to renewal" });
  }
});

app.get("/refresh", refreshingToken);
app.post("/upload", upload.single('imgFile') ,async (req, res)=> {
const {
        userId,
        projectName,
        projectDesc,
        attendExpired,
        projectStacks,
      } = req.body;
const projectData = await project.create({
        projectName: projectName,
        projectDesc: projectDesc,
        attendExpired: attendExpired,
        userId: userId,
        
      });

  res.send()
})
app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/portfolio", portfolioRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
