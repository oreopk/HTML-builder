const fs = require('fs');
const path = require('path');

const buildPage = async () => {
  const projectDistPath = path.join(__dirname, 'project-dist');
  const stylesPath = path.join(__dirname, 'styles');
  const componentsPath = path.join(__dirname, 'components');
  const assetsPath = path.join(__dirname, 'assets');
  const outputAssetsPath = path.join(projectDistPath, 'assets');
  const templatePath = path.join(__dirname, 'template.html');
  const outputHtmlPath = path.join(projectDistPath, 'index.html');
  const outputCssPath = path.join(projectDistPath, 'style.css');

  await fs.promises.mkdir(projectDistPath, { recursive: true });

  let template = await fs.promises.readFile(templatePath, 'utf-8');
  const componentFiles = await fs.promises.readdir(componentsPath, {
    withFileTypes: true,
  });

  for (const file of componentFiles) {
    if (file.isFile() && path.extname(file.name) === '.html') {
      const componentName = path.basename(file.name, '.html');
      const componentContent = await fs.promises.readFile(
        path.join(componentsPath, file.name),
        'utf-8',
      );
      template = template.replace(
        new RegExp(`{{${componentName}}}`, 'g'),
        componentContent,
      );
    }
  }

  await fs.promises.writeFile(outputHtmlPath, template);

  const styleFiles = await fs.promises.readdir(stylesPath, {
    withFileTypes: true,
  });
  const cssStream = fs.createWriteStream(outputCssPath);

  for (const file of styleFiles) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      const filePath = path.join(stylesPath, file.name);
      const fileContent = await fs.promises.readFile(filePath, 'utf-8');
      cssStream.write(fileContent + '\n');
    }
  }

  cssStream.end();

  const copyDirectory = async (src, dest) => {
    await fs.promises.mkdir(dest, { recursive: true });
    const entries = await fs.promises.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }
  };

  await copyDirectory(assetsPath, outputAssetsPath);

  console.log('Build complete!');
};

buildPage();
