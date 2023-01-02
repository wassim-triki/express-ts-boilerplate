import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

export const compileEmailTemplate = (
  relativeFilePath: string,
  data: object
) => {
  // Read the HTML template file
  const html = fs.readFileSync(
    path.resolve(__dirname, relativeFilePath),
    'utf8'
  );

  // Compile the HTML template with Handlebars
  return Handlebars.compile(html)(data);
};
