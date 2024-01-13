#include <napi.h>

#include "file.h"
#include "i2c.h"

using namespace Napi;

Napi::String echoSTH(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if(info.Length() != 1) {
      Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
      return Napi::String::New(env, "");
  }

  std::string test;
  test += "Hallo hallo ";

  test += info[0].As<Napi::String>().ToString();

  return Napi::String::New(env, test);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "echoSTH"), Napi::Function::New(env, echoSTH));
  exports.Set(Napi::String::New(env, "doesFileExist"), Napi::Function::New(env, doesFileExist));
  exports.Set(Napi::String::New(env, "readFile"), Napi::Function::New(env, readFile));
  exports.Set(Napi::String::New(env, "writeFile"), Napi::Function::New(env, writeFile));
  exports.Set(Napi::String::New(env, "i2c_read_byte"), Napi::Function::New(env, i2c_read_byte));
  exports.Set(Napi::String::New(env, "i2c_write_byte"), Napi::Function::New(env, i2c_write_byte));


  return exports;
}

NODE_API_MODULE(addon, Init)
