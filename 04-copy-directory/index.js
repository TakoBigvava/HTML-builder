const fs = require('fs');
const path = require ('path');
const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');
fs.mkdir(dest, {recursive: true},(err)=>{
  if(err){
    return console.log(err);
  }
});
async function copyFolder(dest, src) {
  const destDir = await fs.promises.readdir(dest);
  for await (const file of destDir) { 
    const filePath = path.join(dest, path.basename(file));
    fs.unlink(filePath, (err)=>{if(err)throw err;}); 
  }
  // fs.mkdir(dest, {recursive: true},(err)=>{
  //   if(err){
  //     return console.log(err);
  //   }
  // });
  const dir = await fs.promises.readdir(src);
  for await (const file of dir) { 
    const filePath = path.join(dest, path.basename(file));
    fs.copyFile(path.join(src, file), filePath, (err)=>{
      if(err){
        return console.log(err);
      } 
    });
  }
}
copyFolder(dest, src);