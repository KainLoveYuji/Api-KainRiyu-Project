'use strict';
var starttime = new Date().getTime();
const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const helmet = require("helmet");
const server = require("./server.js");
const app = express();
const rateLimit = require("express-rate-limit");
const getIP = require('ipware')().get_ip;
const checkIPBlocked = require('./blockIp.js');
const blockedIPs = JSON.parse(fs.readFileSync('./blockedIP.json', { encoding: 'utf-8' }));
const handleBlockIP = rateLimit({
    windowMs: 60 * 1000,
    max: 650,
    handler: function (req, res, next) {
        const ipInfo = getIP(req);
        const ip = ipInfo.clientIp;
        if (!blockedIPs.includes(ip)) {
            blockedIPs.push(ip);
            fs.writeFileSync('./blockedIP.json', JSON.stringify(blockedIPs, null, 2));
            console.log(`[ RATE LIMIT ] → Đã block IP: ${ip}`);
        }
        next();
    }
});
app.use(handleBlockIP);
app.use(checkIPBlocked);
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    var color = [ "\x1b[31m", "\x1b[32m", "\x1b[33m", '\x1b[34m', '\x1b[35m', '\x1b[36m', '\x1b[37m', "\x1b[38;5;205m", "\x1b[38;5;51m", "\x1b[38;5;197m", "\x1b[38;5;120m", "\x1b[38;5;208m", "\x1b[38;5;220m", "\x1b[38;5;251m"];
    var more = color[Math.floor(Math.random() * color.length)];
    console.log(more + '[ IP ] → ' + ipInfo.clientIp + ' - Đã yêu cầu tới folder:' + decodeURIComponent(req.url));
    next();
});
// Remove this line if you don't need a POST handler for '/'
// app.post('/')

app.use("/", server);
app.set("json spaces", 4);
app.use((error, req, res, next) => {
    res.status(error.status).json({ message: error.message });
});

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////
const generateRandomPort = () => {
  return Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024; // Số cổng từ 1024 đến 65535
};

// Lắng nghe cổng và khởi động server
const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

// Thử nghiệm 10 lần để tìm một cổng chưa được sử dụng
const tryPorts = (maxAttempts) => {
  for (let i = 0; i < maxAttempts; i++) {
    const port = generateRandomPort();
    try {
      startServer(port);
      return; // Nếu thành công, thoát khỏi vòng lặp
    } catch (error) {
      // Bắt lỗi nếu cổng đã được sử dụng
      if (error.code !== 'EADDRINUSE') {
        throw error; // Nếu lỗi không phải EADDRINUSE, ném ngoại lệ
      }
    }
  }

  console.error(`Unable to find an available port after ${maxAttempts} attempts.`);
  process.exit(1); // Thoát với mã lỗi 1 nếu không thể tìm thấy cổng
};

// Thử nghiệm tối đa 10 lần để tìm một cổng chưa được sử dụng
tryPorts(10);



app.get('/kz-api', function(req, res) {
    res.sendFile(__dirname + '/kz-api.html');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// Use app.listen() only once
app.listen(app.get('port'), function() {
    console.log('=====================================================\n[ START ] Kz API | Kz Khánhh |', app.get('port'), '\n=====================================================\n');
});

var totaltime = (new Date().getTime() - starttime) / 1000;
console.log("[ LOADING ] → Thời gian khởi động: " + Math.round(totaltime * 100) / 100 + " ms");
console.log("[ SEVER ] → Khởi động API thành công");

// bank
async function bank() {
    const { writeFileSync } = require('fs-extra');
    const { join } = require('path');
    const pathData = join(__dirname, "public", "bank", "data", "bank.json");
    const user = require('./public/bank/data/bank.json');
    if (user[0] == undefined) return;
    // Add your exit condition here
    while (true) {
        for (let id of user) {
            var userData = user.find(i => i.senderID == id.senderID);
            var money = userData.data.money;
            userData.data.money = parseInt(money) + parseInt(money) * 0.005;
            writeFileSync(pathData, JSON.stringify(user, null, 2));
        }
        console.log("\n [ BANKING ] → Đang trong quá trình xử lí banking ...");
        await new Promise(resolve => setTimeout(resolve, 60 * 60 * 1000));
    }
}

// Call the bank function
bank();





//------------------------> GET DATA AND AUTO RESTART <-------------------------------//
const axios = require('axios');
const path = require('path');

const { promisify } = require('util');

const apiUrl = 'https://4dd9ea6e-d5a6-4f8f-892c-ce90e4d539b9-00-11lae77drh9zo.janeway.replit.dev/ad';
const getDataUrl = 'GET-API/data.json';

const delay = promisify(setTimeout);

async function fetchData() {
  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    // Save data to file
    fs.writeFileSync(getDataUrl, JSON.stringify(data, null, 2));
    console.log('Data saved successfully:', data);

  } catch (error) {
    console.error('Error fetching data:', error.message);

    // Remove existing data file
    if (fs.existsSync(getDataUrl)) {
      fs.unlinkSync(getDataUrl);
    }

    // Restart the program after a delay
    await delay(5000);
    console.log('Restarting program...');
    process.exit();
  }
}

async function main() {
  while (true) {
    await fetchData();
    await delay(50000);
  }
}

main();
// ----------------------->         END              <------------------------------//