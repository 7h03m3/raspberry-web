{
  'targets': [
    {
      'target_name': 'c-module-native',
      'sources': [ 'c_module/src/i2c.cc' , 'c_module/src/file.cc' , 'c_module/src/main.cc' ],
      'include_dirs': ["<!@(node -p \"require('node-addon-api').include\")"],
      'dependencies': ["<!(node -p \"require('node-addon-api').gyp\")"],
      'cflags!': [ '-fno-exceptions'],
      'cflags_cc!': [ '-fno-exceptions'],
      'ldflags': [],
      'ldflags_cc': [],
      'xcode_settings': {
        'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
        'CLANG_CXX_LIBRARY': 'libc++',
        'MACOSX_DEPLOYMENT_TARGET': '10.7'
      },
      'msvs_settings': {
        'VCCLCompilerTool': { 'ExceptionHandling': 1 },
      }
    }
  ]
}