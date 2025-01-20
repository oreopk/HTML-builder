const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');

const output = fs.createWriteStream(filePath, { flags: 'a' });

console.log(
  'Enter the text to write to the file. To exit, type "exit" or press Ctrl +C:',
);

process.stdin.on('data', (data) => {
  const input = data.toString().trim();

  if (input.toLowerCase() === 'exit') {
    console.log('Thank you for using the program. Goodbye!');
    process.exit();
  }
  output.write(input + '\n');
});

process.on('SIGINT', () => {
  console.log('\nThank you for using the program. Goodbye!');
  process.exit();
});
