# IRIS Code Test (Sudhanshu Jain)

## Submittion
 Created a new branch with the code. Name the branch: iris-test-Sudhanshu-jain


To setup and run the application:
---------------------------------
Navigate to folder with cmd: `cd iris-test-Sudhanshu-jain`

### Api Setup
-------------

Navigate to api folder with cmd: `cd api`
Install packages: `npm install`
Run api (back end): `npm run start`

Check the api is up and running by using:
`curl http://localhost:3000/v1/subdivisions`

### Angular app Setup
---------------------

Navigate to api folder with cmd: `cd web`

To setup the test script run the following:

Install packages: `npm install`
Run web (front end): `npm run start`

## Test
-------
Changed configurations to jest: 

STEPS FOLLOWED :
----------------
    1) Uninstalled all karma and jasmine packages.
    2) Removed test object from Angular.json
    3) Deleted karma.conf.js file and test.ts file.
    4) npm i jest @types/jest jest-preset-angular.
    5) Created setup.jest.ts file.
    6) Updated tsconfig.spec.json file.
    7) Added jest configuration to package.json.
    8) Added scripts in package.json to run JEST.
    9) Created test cases.
    10) Ran test cases and checked coverage report (report attached.)
command to run test : `npm run test`
The test is broken down into three parts.

### Part 1 - Retrieving and Displaying the data
-----------------------------------------------

Expectation --
The first part of this test requires you to retrieve the subdivision data from the api and display it in 
the angular application. This can be displayed in any way you so choose and any third party libraries can
be chosen to aid in this. You can see the structure of the subdivision data in the api/src/subdivision.json
file. Note: the data set contains around 1598 subdivision records so you may need to think about how that is 
displayed (e.g pagination, infinite scrolling etc).

response -- 
Fetching the 1598 subdivision records from api and displaying the required and most relevent information fields on the UI, Using pagination by limiting the number of records to 25 per page. 
fields displayed in the table (Title, Territory Name, location, Country, Community - if value available, Sub Division Status Code and Near map image date). Added some styles 

### Part 2
expected --
 Give the user the ability to filter the data based on subdivisionDataCode (This can be either Active, Future 
 or Builtout (See Glossary). Also, allow the user to sort the data based on subdivision name or nearMapImageDate.
 filtering the records by subdivisionDataCode, filtering keys - (Active, Future, Builtout)

 response --
 The date can be filtered by subdivisionDataCode, filtering keys - (Active, Future, Builtout) with the help of the input with placeholder (Type to filter by sub division Status Code..)

### Part 3

Finally, write some unit tests for the code that has been written. If you start to run out of time at this point
then just attempt one test and write some comments about what other tests you would've written. Angular comes
with Jasmine packaged with it so it is preferred that you use this framework however if you are low on time and
are more comfortable with another testing framework (e.g Jest).

## Glossary

subdivision - An area of land containing lots or plots of land for property development <br />
subdivision status code - The status of the subdivision. Can either be: <br />
ACTIVE: This subdivision has ongoing construction <br />
FUTURE: This subdivision will have construction in the near future <br />
BUILT OUT: This subdivisions construction has been completed <br />
NearMap: NearMap is one of the providers used at Zonda satellite for our image data. <br />

