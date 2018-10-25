const pkg = require("../package.json");
module.exports = `/*
Copyright (c) 2018 ${pkg.author}
Dependencies : ${Object.keys(pkg.dependencies).join(", ")}
homepage: https://daybrush.com
*/`;