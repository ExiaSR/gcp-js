const presets = [
  '@babel/preset-flow',
  [
    '@babel/env',
    {
      targets: {
        node: '6',
        browsers: 'last 1 version'
      },
    },
  ],
];

const plugins = [
  '@babel/plugin-proposal-class-properties'
]

module.exports = {
  presets,
  plugins
}
