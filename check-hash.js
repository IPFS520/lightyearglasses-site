const bc = require("bcryptjs");
bc.hash("admin123", 10).then((h) => {
  console.log("NEW_HASH:", h);
  return bc.compare("admin123", process.env.CURRENT_HASH || "");
}).then((r) => console.log("COMPARE_CURRENT:", r));
