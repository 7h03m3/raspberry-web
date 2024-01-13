#pragma once

#include <napi.h>

Napi::Number i2c_read_byte(const Napi::CallbackInfo &info);

void i2c_write_byte(const Napi::CallbackInfo &info);