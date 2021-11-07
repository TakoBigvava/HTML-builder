const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

async function showFolder(x) {
  const dir = await fs.promises.readdir(x);
  for await (const file of dir) { 
    fs.stat(path.join(folderPath, file), (err, stats) => {
      if (err) {
        return console.log(err);
      }
      if (stats.isFile()) {
        console.log(path.parse(file).name +
                    ' - ' +
                    path.parse(file).ext.replace('.', '') +
                    ' - ' +
                    stats.size / 1000 +'kb'
        );
      }
    });
  }
}

showFolder(folderPath);
console.log(folderPath);