const fs = require('fs');
const path = require('path');
const templateHtml = [];
const srcHtml = {};
const template = path.join(__dirname, 'template.html');
const srcDir = path.join(__dirname, 'components');
const destDirPath = path.join(__dirname, 'project-dist');
const destAssets  = path.join(__dirname, 'project-dist/assets');
const srcAssets = path.join(__dirname, 'assets');
const srcCss = path.join(__dirname, 'styles');

fs.mkdir(destDirPath, {recursive: true}, (err) => {
  if (err) {
    throw err;
  }
});

fs.mkdir(srcAssets, {recursive: true},(err)=>{
  if(err){
    return console.log(err);
  }
});

fs.mkdir(destAssets, {recursive: true},(err)=>{
  if(err){
    return console.log(err);
  }
});

fs.readFile(template, 'utf8', (err, tempContent) => {
  if (err) {
    throw err;
  }
  templateHtml.push(tempContent);
});

fs.readdir(srcDir, (err, dir) => {
  if (err) throw err;
  for (const file of dir) {
    const secTitle = path.parse(file).name;
    fs.readFile(path.join(srcDir, file), 'utf8', (err, content) => {
      if (err) throw err;
      srcHtml[secTitle] = content;
    });
  }
});

setTimeout(() => {
  for (const item in srcHtml) {
    const sectionCode = `{{${item}}}`;
    const newString = templateHtml[0].replace(sectionCode, srcHtml[item]);
    templateHtml.shift();
    templateHtml.push(newString);
  }
}, 100);

setTimeout(() => {
  fs.writeFile(path.join(destDirPath, 'index.html'), templateHtml[0], (err) => {
    if (err) throw err;
  });
}, 200);


async function copyDir(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  let entries = await fs.promises.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory() ?
      await copyDir(srcPath, destPath) :
      fs.copyFile(srcPath, destPath,(err)=>{
        if(err){
          return console.log(err);
        } 
      });
  }
}

async function copyCss(src, destDirPath){
    
  const dir = await fs.promises.readdir(src);
  const writeStream = fs.createWriteStream(path.join(destDirPath, 'style.css'), 'utf8');
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

setTimeout(() => {
  copyDir(srcAssets, destAssets);
}, 200);


setTimeout(() => {
  copyCss(srcCss, destDirPath);
}, 1200);