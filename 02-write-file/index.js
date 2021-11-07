const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath, 'utf8');
const readLine = require('readline');
const rl = readLine.createInterface({input: process.stdin, output: process.stdout});
rl.question('Enter your text \n', (userText)=>{
  writeStream.write(`${userText}\n`);
  if(process.exitCode || userText.trim().toLowerCase() === 'exit'){
    rl.close();
  }
});
rl.on('line', (newLine)=>{
  fs.appendFile(filePath, `${newLine}\n`,(err)=>{
    if(err){
      console.log('Something Wrong');
    }
    if(newLine.trim().toLowerCase() ==='exit'){
      rl.close();
    }
  });
});
rl.on('close', ()=>{
  console.log('Thank you for your Text');
  process.exit();
});