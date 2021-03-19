const express = require("express");
const app = express();
const port = 3000;

const userRouter = require("./routes/user");
const projectRouter = require("./routes/project");

app.use(express.json());

app.use("/user", userRouter);
app.use("/project", projectRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
