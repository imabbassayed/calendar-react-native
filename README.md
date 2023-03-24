# Calendar

## Getting Started

## Install all the dependencies using npm
    npm install

> Make sure npm is installed on your device. In order to check, please run npm --version

## Steps to successfully serve smartEventSuggesetion API

    pip install -r requirements.txt
    flask run -p 5000
    

> You need to set the flask variable to the /smarteventsuggestions/main.py directory e.g. export FLASK_APP=main.py   
> The flask should be run on localhost:5000 port.
> FIrebase Firestore authentication json file should be  /smarteventsuggestions/ directory and called credentials.json

## Steps to successfully serve googleCalendarIntegration API

    pip install -r requirements.txt
    flask run -p 5000
    

> You need to set the flask variable to the /googlecalendarintegration/main.py directory e.g. export FLASK_APP=main.py   
> The flask should be run on localhost:5000 port.
> FIrebase Firestore authentication json file should be  /googlecalendarintegration/ directory and called credentialsFirebase.json
> Google Calendar API OAUTH 2 authentication json file should be  /googlecalendarintegration/ directory and called credentialsGoogleApi.json

    
## Steps to successfully serve the slotbooking locally
   
    brew install php
    
    
   > Make sure brew is installed on your device. In order to check, please run brew --version
   >  $firestore_key, $project_id variables needs to be filled slotbooking/index.php
   > Serve it using any localhost sever e.g XAMPP, WAMPP or VSCODE extension called PHP SERVER
 
## Steps to configure Firebase Firestore to the react application.
Create a .env file in the main directory and fill it with the credentials provided by Google
## Steps to stimulate the react native application using android/iOS/web stimulators

    npm run ios
    npm run android
   > In order to successfully stimulate using a stimulator such as IOS stimulator, all developer tools required should be installed previously.

## Steps to run the tests
    npm run test
   > Knowing that the test kit is run by Jest, VictoryPie package is not supported hence it should be removed before running the tests from the directory. VictoryPie component appears in src/modals/DashboardModal.js 


 




