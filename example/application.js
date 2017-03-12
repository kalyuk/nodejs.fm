import path from 'path';
import {Application} from '../src/core/Application';

export const application = new Application(path.join(__dirname, 'config', 'main.js'));