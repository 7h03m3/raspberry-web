#include "i2c.h"
#include <fcntl.h>
#include <unistd.h>
#include <sys/ioctl.h>
#include <stdint.h>
#include <linux/i2c.h>
#include <linux/i2c-dev.h>

using namespace Napi;

static int i2c_openBus(int busNumber) {
    std::string busPath = "/dev/i2c-";
    busPath += std::to_string(busNumber);

    return ::open(busPath.c_str(), O_RDWR);
}

static bool i2c_setSlaveAddress(int fd, int address) {
    return (::ioctl(fd, I2C_SLAVE, address) != -1);
}

static inline int i2c_smbus_access(int file, char read_write, uint8_t command, int size, union i2c_smbus_data *data) {
    struct i2c_smbus_ioctl_data args;

    args.read_write = read_write;
    args.command = command;
    args.size = size;
    args.data = data;
    return ioctl(file, I2C_SMBUS, &args);
}

static inline int i2c_smbus_read_byte_data(int file, uint8_t command) {
    union i2c_smbus_data smbusData;

    if (i2c_smbus_access(file, I2C_SMBUS_READ, command, I2C_SMBUS_BYTE_DATA, &smbusData)) {
        return -1;
    } else {
        return 0x0FF & smbusData.byte;
    }
}

static inline bool i2c_smbus_write_byte_data(int file, uint8_t command, uint8_t value) {
    union i2c_smbus_data smbusData;

    smbusData.byte = value;

    if (i2c_smbus_access(file, I2C_SMBUS_WRITE, command, I2C_SMBUS_BYTE_DATA, &smbusData)) {
        return false;
    } else {
        return true;
    }
}

Napi::Number i2c_read_byte(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    if ((info.Length() != 3) || (!info[0].IsNumber()) || (!info[1].IsNumber()) || (!info[2].IsNumber())) {
        Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
        return Napi::Number::New(env, -1);
    }

    const int busNumber = info[0].ToNumber().Int32Value();
    const int slaveAddress = info[1].ToNumber().Int32Value();
    const int registerOffset = info[2].ToNumber().Int32Value();
    const int fd = i2c_openBus(busNumber);
    if (i2c_openBus(busNumber) == -1) {
        Napi::TypeError::New(env, "Failed to open the i2c bus").ThrowAsJavaScriptException();
        return Napi::Number::New(env, -1);
    }

    if (!i2c_setSlaveAddress(fd, slaveAddress)) {
        Napi::TypeError::New(env, "Failed to set i2c slave address").ThrowAsJavaScriptException();
        return Napi::Number::New(env, -1);
    }

    int ret = i2c_smbus_read_byte_data(fd, registerOffset);

    if (ret == -1) {
        Napi::TypeError::New(env, "Failed to read from i2c slave").ThrowAsJavaScriptException();
        return Napi::Number::New(env, -1);
    }

    ::close(fd);

    return Napi::Number::New(env, ret);
}

void i2c_write_byte(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    if ((info.Length() != 4) || (!info[0].IsNumber()) || (!info[1].IsNumber()) || (!info[2].IsNumber()) ||
        (!info[3].IsNumber())) {
        Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
        return;
    }

    const int busNumber = info[0].ToNumber().Int32Value();
    const int slaveAddress = info[1].ToNumber().Int32Value();
    const int registerOffset = info[2].ToNumber().Int32Value();
    const int valueToWrite = info[3].ToNumber().operator int32_t();
    const int fd = i2c_openBus(busNumber);
    if (i2c_openBus(busNumber) == -1) {
        Napi::TypeError::New(env, "Failed to open the i2c bus").ThrowAsJavaScriptException();
        return;
    }

    if (!i2c_setSlaveAddress(fd, slaveAddress)) {
        Napi::TypeError::New(env, "Failed to set i2c slave address").ThrowAsJavaScriptException();
        return;
    }

    if (!i2c_smbus_write_byte_data(fd, registerOffset, valueToWrite)) {
        Napi::TypeError::New(env, "Failed to read from i2c slave").ThrowAsJavaScriptException();
        return;
    }

    ::close(fd);
}