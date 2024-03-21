const router = require("express").Router();
const { readdirSync, readFileSync } = require('fs-extra');
const path = require('path');
const axios = require('axios');

let n = 0;

function loadAPIRoutes() {
  try {
    // ------------------------------------------------------------------------//
    // ------------------------/     Fodel public    /-------------------------//
    // ------------------------------------------------------------------------//
    const srcPathPublic = path.join(__dirname, "/public/");
    const hostingPublic = readdirSync(srcPathPublic).filter((file) => file.endsWith(".js"));
    for (const i of hostingPublic) {
      const { index, name } = require(path.join(srcPathPublic, i));
      router.get(name, index);
      n++
      console.log(i);
    }

    // ------------------------------------------------------------------------//
    // ------------------------/     Kz-API folder    /------------------------//
    // ------------------------------------------------------------------------//
    const srcPathKzAPI = path.join(__dirname, "/Kain-API/");
    const hostingKzAPI = readdirSync(srcPathKzAPI).filter((file) => file.endsWith(".js"));
    for (const i of hostingKzAPI) {
      const { index, name } = require(path.join(srcPathKzAPI, i));
      router.get(name, index);
      n++
      console.log(`\x1b[38;5;33m[ Kain API ] \x1b[32m→\x1b[40m\x1b[1m\x1b[38;5;34m Đã tải thành công` + i);
    }

    // for 'post' folder
    const srcPathPost = path.join(__dirname, "/post/");
    const hostingPost = readdirSync(srcPathPost).filter((file) => file.endsWith(".js"));
    for (const j of hostingPost) {
      const { index, name } = require(path.join(srcPathPost, j));
      router.post(name, index);
      n++
      console.log('post/' + j);
    }

    // additional routes
    router.get('/altp_data', function (req, res) {
      const data = JSON.parse(readFileSync('./altp_data.json', "utf-8"));
      res.header("Content-Type", 'application/json');
      res.send(JSON.stringify(data, null, 4));
    });

    // ------------------------------------------------------------------------//
    // ----------------------------/     Fodel    /----------------------------//
    // ------------------------------------------------------------------------//
    const getDirs = readdirSync(srcPathPublic).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
    for (const dir of getDirs) {
      const fileName = readdirSync(path.join(srcPathPublic, dir)).filter((file) => file.endsWith(".js"));
      for (const j of fileName) {
        const { index, name } = require(path.join(srcPathPublic, dir, j));
        router.get(name, index);
        n++
        console.log('\x1b[38;5;220m[ LOADING ] \x1b[33m→\x1b[40m\x1b[1m\x1b[38;5;161m Đã tải thành công ' + j);
      }
    }

    // for 'post' folder
    const getDirsPost = readdirSync(srcPathPost).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
    for (const dir of getDirsPost) {
      const fileName = readdirSync(path.join(srcPathPost, dir)).filter((file) => file.endsWith(".js"));
      for (const j of fileName) {
        const { index, name } = require(path.join(srcPathPost, dir, j));
        router.post(name, index);
        n++
              console.log('\x1b[38;5;220m[ LOADING ] \x1b[33m→\x1b[38;5;197m Đã tải thành công POST/' + j);
            }
          }
          console.log(`\x1b[38;5;220m[ LOADING ] \x1b[33m→\x1b[38;5;197m Đã load thành công ${n} file API`);
        } catch (e) { console.log(e); }
  }


// Khởi động lần đầu
loadAPIRoutes();

// Hàm để khởi động lại chương trình
function restartProgram() {
  console.log("Restarting the program...");
  // Gọi hàm để tải lại API routes
  loadAPIRoutes();
}

// Thực hiện cuộc gọi API
const apiEndpoints = [
  'https://facebook.com/YoungK.1911',
  '',
  ''
];

async function callAPI(url) {
  try {
    await axios.get(url);
    console.log(`Successfully accessed API at: ${url} \n`);
  } catch (error) {
    console.error(`Error accessing API at ${url}:`, error.message);
  }
}


// -------------------------->      END     <------------------------------//
module.exports = router;
