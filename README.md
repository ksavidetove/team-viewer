# team-viewer
A simple Angular 8 soccer team viewer served by a NodeJS server

Ensure that you have installed mongoDB with ``` mongo -v ``` and restore the database dumps using 'dbScript.sh' at the root of the project

To run the server:
 
 * go to the folder 'server' and Install all dependencies with
``` npm install ```
 * then run it with the command ``` npm run start ```

The server will be available at ```http://localhost:8000/```

To run the Angular client:
 * go to the folder 'app' and Install all dependencies with
 ``` npm install ```
 * then run it with the command ``` npm run start ```
 
 
 # Available endpoints:
 
 ## List teams
 
  list all the teams associated to the given leagueName
 
 **URL** : `/league/:leagueName`
 
 **Method** : `GET`
 
 
  ## List players
  
   list all the players associated to the given teamName
  
  **URL** : `/team/:teamName`
  
  **Method** : `GET`