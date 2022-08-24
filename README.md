# To Do List Backend

### Problem Statement:
Create an express api for creating a to do application. The application provides end points for the following CRUD operation

1. Create a task
2. Read all tasks
3. Read a single task based on a taskId sent in a route parameter
4. Update the status of task from pending to complete.
5. Delete a task
The end points will be tested using Postman and data should be sent back as json objects. Use appropriate HTTP Methods for implementing the api endpoints.

-------------------------------
### Routes 
1. ### Get all the tasks :
    using Route:
        fetch all the tasks using paging concept. 
        ->all cases handled by paging
        ->wont require separate query params here

2. ### Add a task:
    using Route:
        POST request. --> addTask
    using Query: 

3. ### fetch a unique task:
    using Route: id Parameters --> fetchTask
    using Query: any query in url --> fetchTaskUsingQuery

4. ### update a unique task:
    using Route: id Parameters --> updateTask       
    using Query:

5. ### delete a task:
    using Route: id Parameters --> deleteTask       
    using Query:

