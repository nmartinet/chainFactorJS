const fs = require("fs"); // https://www.npmjs.com/package/pn 
const path = require("path")
const exce = require("child_process").exec;

const inkscapePath = `C:\\Program Files\\Inkscape\\inkscape.exe`;
const assetsPath = path.join(__dirname, "./../src/assets/");

const svgToPng = (file) => {
  var input = path.join(assetsPath, file);
  var output = path.join(assetsPath, path.basename(file, ".svg") + ".png");

  var renderCommand = `"${inkscapePath}" -z -f ${input} -e ${output}`;

  exce(renderCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
    return;
    }
    if (stdout) console.log(`stdout: ${stdout}`);
    if (stderr) console.log(`stderr: ${stderr}`);
  })

}

fs.readdirSync(assetsPath)
  .filter( (file) => (file.substr(-4) === ".svg") )
  .forEach(svgToPng)