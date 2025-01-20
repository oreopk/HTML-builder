const fs = require('fs');
const path = require('path');

const copyDir = async (src, dest) => {
  try {
    await fs.promises.mkdir(dest, { recursive: true });

    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }
  } catch (err) {
    console.error(`Error copying directory: ${err.message}`);
  }
};

const srcFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');

copyDir(srcFolder, destFolder).then(() => {
  console.log('Directory copied successfully!');
});
