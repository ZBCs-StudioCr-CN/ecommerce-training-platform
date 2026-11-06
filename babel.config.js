const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          development: isDev,
        },
      },
    ],
  ],
  plugins: isDev ? ['@react-dev-inspector/babel-plugin'] : [],
};
