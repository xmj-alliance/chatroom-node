import * as fs from 'fs';
import * as path from "path";

// used as a temp solution, because currently no database has been implemented.

const cPath: string = path.join(__dirname, 'config/characters.json');

let cFile: string;

try {
  cFile = fs.readFileSync(cPath, 'utf8');
} catch (error) {
  console.error(error);
  console.error("Failed to load characters.");
  // cFile = fs.readFileSync(devfilePath, 'utf8');
}

const exampleCharacters: any[] = JSON.parse(cFile);

export const characters = exampleCharacters;