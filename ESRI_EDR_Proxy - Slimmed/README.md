# EDR Proxy

 -- **Version**: 0.01 Early Proof of Concept --

The EDR  proxy is a node js application which provides an interface between ArcGIS Image Server REST API and a experimental api from the MET Office, "Environmental Data Retrieval" (EDR).

The EDR API can be thought of as a method to query discrete sampling geometries, conceptually in-line with the feature of interest in the Sensor Observation Service (SOS). A typical EDR data resource is a multidimensional dataset that could be provided via a coverage API such as the Web Coverage Service (WCS).

## Prerequisites

This application uses Node JS. It was developed with Version 12. 
Node JS can be installed from https://nodejs.org/en/

This application can be utilised in both windows and unix environments. 

Ensure you have cloned this environment to your machine. You will need git for your operating system. Git for windows can be found here -- https://gitforwindows.org/. Run the clone command in your terminal or ide to pull down the application from the source control. 

```git 
    git clone "url to repo"
```


## Install Modules

Install relevant application modules by using the NPM install commmand. To see what will be installed on your system please inspect the package.json.


```cmd
npm install
```

## Debug

Debugging mode utilises ts-node and nodemon to watch for changes within the project. You can initiate it using the command below.

```cmd
npm run debug
```

if using visual studio code a debug task can be configured using the following

```json
    {
        "command": "npm run debug",
        "name": "Run npm debug",
        "request": "launch",
        "type": "node-terminal"
    }
```

## Test

Jest is the testing framework used for this project.
testing focuses on unit tests and code coverage. 

to run tests in your terminal use the following command

```cmd
npm run test
```

## Build

The build command compiles the TypeScript files into JavaScript. Moves static content in to the distribution folder and Lints the project using ES6 rules. Use this command to prepare the application for release.

```cmd
npm run build
```

## Run

**Note for Production**: To use this product ensure you have run the build command to get the project files for the application. The "dist" folder and files can be deployed on any server/container that utilises Node JS. to run use the command as below.*

```cmd
    node .\dist\index.js
```

It is assumed you are running the command with in the project workspace. However you may need to use a full path to index.js depending on your deployment requirements. Also note you may also need to install the dependancies as listed in the package.json. Do this by running

```cmd
npm install
```

## Environment Variables

This project utilises environment variables to set configuration. Developers can use a .env file within the project workspace.

The following table provides a list of properties 

| Name            | Description                                     | Example                 |
| :-------------- | :---------------------------------------------  | :---------------------- |
|  PORT           | The port the express application will open on   | And Again               |
| TARGET_PROTOCOL | web server protocol (http or https)             | https                   |
| CERT_PATH       | path to the cert.pem                            | ./certificates/cert.pem |
| KEY_PATH        | path to the key.pem                             | ./certificates/key.pem  |
| SWAGGER         | path to the swagger yaml                        | ./swagger.yaml          |


## Generating self signed certificates

A cert.pem and key.pem have been provided with this project to support CI/CD processes. However, new certificates can be generated using the following commands if required.

```cmd
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```

## Swagger
[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) is used to display the EDR yaml file attached to this project. When running the server access the swagger interface by visiting the following  url

``` 
[protocol]://localhost:[port]/doc
e.g https://localhost:8443/doc
```

### Note
*developers note: a number of hardcoded values exist within this code. They are expected to be removed in later stages of development and pulled into a configuration file. Please be aware that to change proxy targets at this version the developer must change the code.*
Now in the repository https://github.com/PeteHotmail/ESRI_UK_Repo_Working.git