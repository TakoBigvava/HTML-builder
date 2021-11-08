const fs = require ('fs');
const path = require ('path');
const src = path.join(__dirname, 'styles');
const dest = path.join(__dirname, 'project-dist');

const writeStream = fs.createWriteStream(path.join(dest, 'bundle.css'), 'utf8');

async function copyCss(src){
  const dir = await fs.promises.readdir(src);
  for await(const file of dir){
    const filePath = path.join(src, file);
    if (path.parse(file).ext === '.css') {
      const readStream = fs.createReadStream(filePath, 'utf-8');
      readStream.on('data', (chunk)=>{
        writeStream.write(`${chunk}\n`);
      });
    }
  }
}
copyCss(src);
