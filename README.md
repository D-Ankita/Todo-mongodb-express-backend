# To Do List Backend

## Problem Statement:
Create an express api for creating a to do application. The application provides end points for the following CRUD operation
1. Create a task
2. Read all tasks
3. Read a single task based on a taskId sent in a route parameter
4. Update the status of task from pending to complete.
5. Delete a task
The end points will be tested using Postman and data should be sent back as json objects. Use appropriate HTTP Methods for implementing the api endpoints.

-------------------------------
## Installation
Prerequisites:must have Node.js installed on the machine

Clone the repository and run the following commands in the terminal
```
npm install
npm run dev
```

## Routes 
1. ### Get all the tasks :
     ```
     GET  /todos
     ```

    This route will fetch all the tasks using paging concept. 
       

2. ### Add a task:
    ```
    POST  /todos
    ```

    This route will help user to add new a Todo. 
    This endpoint requires a body which contains a valid body. Incase the structure of the body doesnt match it will give an Error Status Code
    #### Sample Body

    ```
    {
        description:sample content ; 
        isComplete: it can be either true or false;
    }
    ```

3. ### fetch a unique task:
     ```
     GET  /todos/id
     ```
     OR   
    ```
    GET  /todos?id="someId" 
    ```

    This route will fetch the task with corresponding id 

4. ### update a unique task:
    ```
    PATCH  /todos/id
    ```
    This route will help user to EDIT his Todo. 
    This endpoint requires a body which contains a valid body  to be updated and and id in the url of the todo task to be updated. 
    only the description and isComplete status can be updated

5. ### delete a task:
    ```
    DELETE  /todos/id
    ```
    This endpoint will delete an existing task. It requires a valid task ID for deletion.


## Directory Structure
```
. 
├── app.js 
├── package.json 
├── package-lock.json 
├── README.md 
├── controllers 
│   └── taskController.js 
├── models 
│   └── taskModel.js 
├── routes 
│   └── taskRouter.js 
└── utils 
    └── sendResponse.js 
```



