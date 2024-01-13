const cFunctions = require('../../build/Release/c-module-native');

export class CBinding {
  static writeFile(path: string, value: string) {
    cFunctions.writeFile(path, value);
  }

  static readFile(path: string): string {
    return cFunctions.readFile(path);
  }

  static doesFileExist(path: string): boolean {
    return cFunctions.doesFileExist(path);
  }

  static i2c_read_byte(bus: number, deviceAddress: number, register: number): number {
    return cFunctions.i2c_read_byte(bus, deviceAddress, register);
  }

  static i2c_write_byte(bus: number, deviceAddress: number, register: number, value: number) {
    cFunctions.i2c_write_byte(bus, deviceAddress, register, value & 0xff);
  }
}
