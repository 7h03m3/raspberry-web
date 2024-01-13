#pragma once

#include <napi.h>

Napi::Boolean doesFileExist(const Napi::CallbackInfo &info);

Napi::String readFile(const Napi::CallbackInfo &info);

void writeFile(const Napi::CallbackInfo &info);