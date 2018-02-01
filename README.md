# TODO-List of Lectrum React Homework 

## based on Lectrum React intensive boilerplate


## Install guides: 

1) Clone/Download project to the your directory

2) Go to the directory of project ( Command Line )

3) $ npm install

4) $ npm run start

App use managing of Tasks via RESTful technology and placed on the remote JSON placeholder server. 

You must be intall before using on the your local machine. 

## Install JSON:

5) $ npm install -g json-server   

6) Go to the directory (via CMD) /src and you could find db.json file which keep data of all tasks. 

7) Run server:

$ json-server --watch db.json --port 3006

(If you choose another port, you should change GlobalOptions value in the /containers/TodoApp/index.js

const globalOptions = {
    api: 'http://localhost:3006/tasks'
}
