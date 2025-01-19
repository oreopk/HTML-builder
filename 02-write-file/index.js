const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'output.txt');

const output = fs.createWriteStream(filePath, { flags: 'a' });

console.log(
  'Введите текст для записи в файл. Для выхода введите "exit" или нажмите Ctrl + C:',
);

process.stdin.on('data', (data) => {
  const input = data.toString().trim();

  if (input.toLowerCase() === 'exit') {
    console.log('Спасибо за использование программы. До свидания!');
    process.exit();
  }
  output.write(input + '\n');
});

process.on('SIGINT', () => {
  console.log('\nСпасибо за использование программы. До свидания!');
  process.exit();
});
