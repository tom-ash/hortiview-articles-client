const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;
const configPath = process.env.HORTIVIEW_DEBUG ? './hvconfig.dev.json' : './hvconfig.json';
const config = require(configPath);

module.exports = {
  devServer: {
    port: 3001,
  },
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          ...config,
          shared: {
            ...deps,
            react: {
              singleton: true,
              eager: true,
              requiredVersion: deps.react,
            },
            'react-dom': {
              singleton: true,
              requiredVersion: deps['react-dom'],
            },
          },
        }),
      ],
    },
    configure: webpackConfig => ({
      ...webpackConfig,
      output: {
        ...webpackConfig.output,
        publicPath: '/',
      },
    }),
  },
};
