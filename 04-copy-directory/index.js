const fs = require('fs');
const path = require ('path');
const src = path.join(__dirname, 'files');
const dest = path.join(__dirname, 'files-copy');

async function copyFolder(dest) {
  fs.mkdir(dest, {recursive: true},(err)=>{
    if(err){
      return console.log(err);
    }
  });

  const dir = await fs.promises.readdir(src);

  for await (const file of dir) { 
   
    fs.stat(path.join(src, file), (err) => {
      if (err) {
        return console.log(err);
      }
      const filePath = path.join(dest, path.basename(file));
      fs.copyFile(path.join(src, file), filePath, (err)=>{
        if(err){
          return console.log(err);
        } 
      });

    });
  }
}
copyFolder(dest);
