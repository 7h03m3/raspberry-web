import fs from 'fs';
import { promisify } from 'util';

export class Sysfs {
  constructor() {}

  protected static async writeStringToFile(value: string, filePath: string): Promise<unknown> {
    console.log('writeStringToFile');
    console.log(value);
    console.log(filePath);
    const writeFile = promisify(fs.writeFile);
    console.log('promisify');
    console.log(writeFile);
    return await writeFile(filePath, value, 'ascii');
  }
}
