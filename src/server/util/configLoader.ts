import * as fs from 'fs';
import * as path from "path";

const prodfilePath: string = path.join(__dirname, 'config/chatroom-node.json');
const devfilePath: string = path.join(__dirname, 'config/chatroom-node-default.json');

let confFile: string;

try {
  confFile = fs.readFileSync(prodfilePath, 'utf8');
} catch (error) {
  console.warn("Failed to read production config file, falling to dev config")
  confFile = fs.readFileSync(devfilePath, 'utf8');
}

const siteConfig = JSON.parse(confFile);

export const chatroomNodeConfig = siteConfig[0];