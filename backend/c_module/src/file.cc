#include "file.h"

#include <fstream>
#include <sstream>

using namespace Napi;

Napi::Boolean doesFileExist(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    if ((info.Length() != 1) || (!info[0].IsString())) {
        Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
        return Napi::Boolean::New(env, false);
    }

    const std::string filePath = info[0].As<Napi::String>().Utf8Value();
    std::ifstream file(filePath);

    const bool exist = (file ? true : false);
    return Napi::Boolean::New(env, exist);
}

Napi::String readFile(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    if ((info.Length() != 1) || (!info[0].IsString())) {
        Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
        return Napi::String::New(env, "");
    }

    const std::string filePath = info[0].As<Napi::String>().Utf8Value();
    std::ifstream file(filePath);

    std::string returnString;
    if (!file) {
        Napi::TypeError::New(env, "Could not read file").ThrowAsJavaScriptException();
        return Napi::String::New(env, "");
    }

    std::stringstream buffer;
    buffer << file.rdbuf();
    file.close();
    returnString += buffer.str();

    return Napi::String::New(env, returnString);
}

void writeFile(const Napi::CallbackInfo &info) {
    Napi::Env env = info.Env();

    if ((info.Length() != 2) || (!info[0].IsString()) || (!info[1].IsString())) {
        Napi::TypeError::New(env, "Wrong arguments").ThrowAsJavaScriptException();
        return;
    }

    const std::string filePath = info[0].As<Napi::String>().Utf8Value();
    std::ofstream out(filePath);

    const std::string value = info[1].As<Napi::String>().Utf8Value();
    out << value;

    if (!out) {
        Napi::TypeError::New(env, "Could not write file").ThrowAsJavaScriptException();
        return;
    }

    out.close();
}