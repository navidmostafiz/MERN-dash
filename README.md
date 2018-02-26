# MERN-DASH
MERN stack AUTH & CRUD Boilerplate.

### The Stack
* NodeJs - 
* Node Express - Restful API
* Axios - Async(promise based) Restful API request handler (w/ JSON formatter, XSRF)
* ReactJs, ReactDom, React-Route - component based UI library
* Redux - common state layer across mutiple components(dumb), containers (smart component)
* MongoDB - NOSQL non-schema, non relational DB
* Mongoose - ORM for Mongo
* RoboT3 - Mongo visual
* WebPack2 - Build tool, JS & CSS bundler
* Babel - ES6 transpiler
* JWT (JSON Web Token) - local Auth
* BCrypt - hashing encryption
* MomentJs - Date formatter
* ToastrJs - JQuery based non-blocking notifications




[terminal commands for linux platform]

### Installing
:beetle: Step 1:
Install NodeJs from: 
* [NodeJs](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) - run-time environment for executing JS on server-side
Install MongoDb from:
* [MongoDb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu) - The NOSQL database [non relational]
Install RoboT3 from:
* [RoboT3](https://robomongo.org/download) - visual for mongoDB
Install Git from:
* [GIT](https://git-scm.com/downloads) - verison controller


Quick way to check if they are installed properly:
* cmd> node -v
* cmd> npm -v
* cmd> git version

### :beetle: Step 2:
Clone the project from remote repo [Github]: cmd> git clone https://github.com/navidmostafiz/MERN-dash

Other Git commands:
...Stage changed files:
* cmd> git add file_name //stage specified file
* cmd> git add -A // Stage all (new, modified, deleted) files. Git Version 2.x
* cmd> git add .  // Stage all (new, modified, deleted) files. Git Version 2.x
* cmd> git add --ignore-removal . // Stage (new, modified) files only. Git Version 2.x
* cmd> git add -u // Stage (modified, deleted) files only. Git Version 2.x
...Commit to local repo: cmd> git commit -m "your message"
...Push to remote repo [Github]: cmd> git push https://github.com/navidmostafiz/MERN-dash.git

:beetle: Step 3:
Install all project dependencies: cmd> npm install

## Build & Start the app
* To build the project: cmd> npm run build
* To start the server and run attached project app: cmd> npm run start


## Authors
**Navid Mostafiz**

## License

## Acknowledgments
 
 Special thanks to:
* [MERN.js.org](https://mern.js.org) - MERNJs.org is a project by Md. Mohaiminul Islam.