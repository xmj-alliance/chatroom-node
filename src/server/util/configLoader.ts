import * as fs from 'fs';
import * as path from "path";

const file: string = path.join(__dirname, 'config/chatroom-node.json');
const siteConfig = JSON.parse(fs.readFileSync(file, 'utf8'));

export const chatroomNodeConfig = siteConfig[0];