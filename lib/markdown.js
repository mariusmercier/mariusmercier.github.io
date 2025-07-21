import fs from 'fs';
import path from 'path';

function getMarkdownContent(filename) {
  const filePath = path.join(process.cwd(), 'src', 'data', filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return fileContents;
}

export default getMarkdownContent;
