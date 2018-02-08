# generator-koa-humble

![alt tag](https://raw.githubusercontent.com/bakharevpavel/generator-electron-humble/master/generators/app/templates/dev/app/home/icon.png)

Humble koa generator for yeoman. Koa v2 + (Moongose/Sequelize) + Angular v2 + Typescript + Less/Sass/Stylus + Pug (Jade)

## Installation

```sh

	$ npm install -g generator-koa-humble

```

## Usage

```sh

	$ yo koa-humble

```

## Npm commands list

```sh

	$ npm start # Launches the app.
	$ npm test # Launches tests.
	$ npm run-script tslint # Starts code check with tslint.
	$ npm run start:dev # Launches the app in dev mode (along with dev app build using koa-webpack).
	$ npm run start:prod # Same as npm start.
	$ npm run build:prod # Initiates project's rebuild and prepares it for production.

```

## Structure

Generated project has the following structure:

```sh

	.
	├── ./controllers # Stores your controllers
	│   └── ./controllers/views.js
	├── ./dev # Development folder. Stores Angular2 project with your presets.
	│   ├── ./dev/app
	│   │   ├── ./dev/app/app.component.jade
	│   │   ├── ./dev/app/app.component.less
	│   │   ├── ./dev/app/app.component.ts
	│   │   ├── ./dev/app/app.module.ts
	│   │   ├── ./dev/app/app.routing.ts
	│   │   └── ./dev/app/home
	│   │       ├── ./dev/app/home/home.component.jade
	│   │       ├── ./dev/app/home/home.component.ts
	│   │       └── ./dev/app/home/icon.png
	│   ├── ./dev/index.jade
	│   ├── ./dev/main.ts
	│   ├── ./dev/polyfills.ts
	│   └── ./dev/vendor.ts
	├── ./public # Public folder. Users have access to it. Webpack sends processed files here.
	│   ├── ./public/app.[hash].css
	│   ├── ./public/app.[hash].css.map
	│   ├── ./public/app.[hash].js
	│   ├── ./public/app.[hash].js.map
	│   ├── ./public/img
	│   │   └── ./public/img/icon.png
	│   ├── ./public/polyfills.[hash].js
	│   ├── ./public/polyfills.[hash].js.map
	│   ├── ./public/vendor.[hash].js
	│   └── ./public/vendor.[hash].js.map
	├── ./test # Mocha's tests folder.
	│   └── ./test/routes.js
	├── ./views # Webpack sends processed jade files here.
	│   └── ./views/index.html
	├── ./app.js
	├── ./package.json
	├── ./tsconfig.json
	├── ./tslint.json
	└── ./webpack.config.js

```
