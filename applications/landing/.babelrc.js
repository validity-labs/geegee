const plugins = [
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/material',
      libraryDirectory: '',
      camel2DashComponentName: false
    },
    'core'
  ],
  [
    'babel-plugin-import',
    {
      libraryName: '@mui/icons-material',
      libraryDirectory: '',
      camel2DashComponentName: false
    },
    'icons'
  ],
  [
    'import',
    {
      libraryName: 'react-use',
      camel2DashComponentName: false,
      customName(/** @type {string} */ name) {
        const libraryDirectory = name.startsWith('Use')
          ? 'lib/component'
          : name.startsWith('create')
          ? 'lib/factory'
          : 'lib';
        return `react-use/${libraryDirectory}/${name}`;
      }
    },
    'import-react-use'
  ]
];

const presets = ['next/babel'];

module.exports = { plugins, presets };
