const fs = require('fs').promises;
const path = require('path');

async function aggregateCode(dir, outputFile) {
  let content = '';

  async function traverseDir(currentPath) {
    const files = await fs.readdir(currentPath);

    for (const file of files) {
      const filePath = path.join(currentPath, file);
      const stats = await fs.stat(filePath);

      // Skip unwanted directories and files
      if (stats.isDirectory()) {
        if (['node_modules', '.git', 'dist'].includes(file)) {
          continue; // Skip these directories
        }
        await traverseDir(filePath); // Recurse into the directory
      } else if (stats.isFile()) {
        const ext = path.extname(file).toLowerCase();
        // Skip specific files
        if (['package-lock.json', 'yarn.lock', 'npm-shrinkwrap.json'].includes(file)) {
          continue; // Skip package lock and other lock files
        }
        // Include only specific file extensions
        if (['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json', '.md', '.mjs', '.txt'].includes(ext)) {
          content += `\n\n--- ${filePath} ---\n\n`;
          content += await fs.readFile(filePath, 'utf8');
        }
      }
    }
  }

  await traverseDir(dir);
  await fs.writeFile(outputFile, content);
  console.log(`Code aggregated in ${outputFile}`);
}

// Define the directory path
const directoryPath = path.join('C:', 'Users', 'Jimbo', 'Desktop', 'bolt-agent-portal');

// Usage
aggregateCode(directoryPath, 'all_code.txt');
