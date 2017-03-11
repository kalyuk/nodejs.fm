import path from 'path';
import {Application} from '../../core/Application';

export const application = new Application(path.join(__dirname, '..', 'config', 'console.js'));
application.runCommand();
