require("dotenv").config();
const express = require("express");
const app = express();
const axios = require("axios");
const schedule = require("node-schedule");
const moment = require("moment-jalaali");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sendData = schedule.scheduleJob("* 20 * * *", async function() {
    const res = await axios.get(process.env.API_URL);
    const date = moment().format("jYYYY/jM/jD HH:mm");
    const price = Number(res.data.data.priceUsd).toFixed(2);
    const data = {
        chat_id: "1261111418",
        text: `${date} - ${price} $`,
    };
    await axios.post(`${process.env.TELEGRAM_API}/sendMessage`, data);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on localhost:${port} ...`);
});