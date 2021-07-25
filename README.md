# Backend for the Doctor Platform

This platform is a health care assistant to help patients and health professionals track appointments and treatments with a smart personalized experience based in Reactjs and Relay .

Frontend can be found [here](https://github.com/Dogtor-Assistant/frontend)

# Prerequisites

Please check

* Nodejs [website](https://nodejs.org/en/)
* Nodejs includes [npm](https://www.npmjs.com/)

# Getting Started

To get you started you can clone the repository and install all its dependencies:

### Cloning the app 

```
   git clone https://github.com/Dogtor-Assistant/backend.git 

   cd backend
```

### Install Dependencies

For the installation of the dependencies you have to run the following command.

```npm install ```

# Build

```npm run codegen```
```npm run build```

Builds the app for production to the build folder.The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

# Run the Application

```npm start ```

Now browse to the app at http://localhost:8000/
You can also use GraphQL Playground at http://localhost:8000/playground

# Platform in Production 

Please check our platform [here](https://backend.dogtor.xyz/) live.

# Development Instructions

```sh
git clone https://github.com/Dogtor-Assistant/backend.git 
cd backend
npm install
npm run codegen
npm run dev
```

# Environment Variables

In order for the app to run successfully you have to use a .env file with the following variables:
MONGO_URI=
PORT=
GEOLOC_KEY=
SENDGRID_API_KEY=