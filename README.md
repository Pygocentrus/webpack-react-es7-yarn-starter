# Webpack-React-ES7-Yarn starter kit

Tiny boilerplate to take advantage of Webpack to build a simple React/Redux app.

## Getting started

To use it, simply run the following commands:

```bash
$ git clone git@github.com:Pygocentrus/webpack-react-es7-yarn-starter.git && cd webpack-react-es7-yarn
$ rm -rf .git
$ yarn # install dependencies
$ npm run serve # starts a dev server on port 3000
$ npm run build # builds the app statically
```

## Notes

The app builds an external `vendor.js` file that contains every lib defined in the package.json's `dependencies` section. It makes the bundle build time much faster.

Therefore, if you need to add a vendor, simply add it as a dependency to your project and restart webpack.

--

_Made with ♥ in Paris, France_
