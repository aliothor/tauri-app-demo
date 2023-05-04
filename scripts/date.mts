import { createRequire } from "module";
import fs from "fs";
import dayjs from "dayjs";
// import installJson from "../install.json";

const require = createRequire(import.meta.url);

const installJson = require("../install.json");

const current_time = dayjs().format("YYYY-MM-DD HH:mm:ss");

installJson.pub_date = current_time;

fs.writeFileSync("./install.json", JSON.stringify(installJson, null, 2));

console.log(installJson);

