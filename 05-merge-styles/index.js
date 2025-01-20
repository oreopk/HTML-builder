const fs = require('fs');
const path = require('path');

const mergeStyles = async () => {
  try {
    const stylesDir = path.join(__dirname, 'styles');
    const outputDir = path.join(__dirname, 'project-dist');
    const outputFile = path.join(outputDir, 'bundle.css');

    await fs.promises.mkdir(outputDir, { recursive: true });
    const output = fs.createWriteStream(outputFile);

    const files = await fs.promises.readdir(stylesDir, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(stylesDir, file.name);

      if (file.isFile() && path.extname(file.name) === '.css') {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        output.write(data + '\n');
      }
    }

    console.log('Styles merged successfully!');
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
};

mergeStyles();
