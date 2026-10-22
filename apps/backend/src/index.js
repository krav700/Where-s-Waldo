require("dotenv").config();
const express = require("express");
const path = require("node:path");
const app = express();
const indexRouter = require("./routes/indexRouter.js");

const cors = require("cors");

const assetsPath = path.join(__dirname, "public");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
app.use(cors());

app.use("/api", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", (error) => {
    if (error) {
        throw error;
    }
    console.log(`Where's Waldo - listening on port ${PORT}!`);
});
