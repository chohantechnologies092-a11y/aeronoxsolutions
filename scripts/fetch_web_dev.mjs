import * as https from "https";
import * as fs from "fs";

https.get("https://aeronoxsolutions.com/web-design-development/", (res) => {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    fs.writeFileSync("raw_web_dev.html", data);
    console.log("HTML saved to raw_web_dev.html");
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
