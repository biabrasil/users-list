# UsersList

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Report

This is an Angular application that shows a User List retrieved from an external API (https://jsonplaceholder.typicode.com/).
In this essay, I briefly present how I developed this simple application and my thought process behind it.

First off, I had to start my new angular project with the correct commands and got all the starting packages I need to develop the project. Next, I imported the necessary dependencies needed to interact with the data coming from the external API, such as services, models and interfaces.
I also integrated Tailwind CSS and Prettier in this project. The first one allowed me to create a simple yet cool design using a framework that prevents me from writing custom CSS in order to save some time. I’ve been enjoying using this framework quite a lot. It allows customization and it is quite snappy. I also installed Prettier and ran it in order to send the code clean and formatted to the repository.

Inside the Angular service named UserService, present in ‘user.service.ts’ , I created a single property ‘apiUrl’ which is the URL of an external API 'https://jsonplaceholder.typicode.com/users'. The constructor function initializes the http variable with the HttpClient dependency injection token. The ‘getUsers’ function makes an HTTP GET request to the ‘apiUrl’ and returns the Observable stream of the response data to the calling component or service. The @Injectable decorator provides metadata about the service to the Angular compiler, enabling it to inject the HttpClient dependency into the constructor. I didn’t create an environments folder and files in order to keep the ‘apiUrl’ property and value as global, seen that I am only using it in one single component and in a very small scope.

After all of this, I had to define a user variable - this would be the variable that would be holding the user data that I want to show and manipulate. I did this inside ‘app.component.ts’. Inside this file, I also created an Interface called “User”, also known as a specification that portrays a related set of properties and methods. Here I attributed a type for each of the properties and data I would be receiving from the API. In order to create a request to get the User data from the API, I had to import the built-in service ‘Http Client’. I then started the component ‘AppComponent’ and exported it so that it can be used in other parts of the application. This component has four properties:

‘users’: an array of ‘User’ objects.

‘selectedUser’: a variable that holds the currently selected user object

‘showEditModal’: a boolean that determines whether to show the edit modal or not (will be used inside ‘app.component.html’)

‘visible’: a boolean that determines whether or not to show a component (will be used inside ‘app.component.html’ in order to show or hide the address information of the users

In the ‘constructor’ function, I initialize the ‘http’ variable with the ‘HttpClient’ dependency injection token.

The ‘ngOnInit’ function is called whenever the component is initialized and makes an HTTP GET request to the ‘https://jsonplaceholder.typicode.com/users' API in order to fetch a list of users. The returned data is then assigned to the ‘users’ property of the component.

The ‘editUser’ function is called when a user is selected for editing. It copies the selected user object to ‘selectedUser’ and sets the ‘showEditModal’ flag / boolean to ‘true’.

The ‘submitUser’ function is called when the user submits an edited user object. It makes an HTTP PUT request to update the user on the server and then updates the local user list. 

The ‘cancelEdit’ function is called when the user cancels an edit operation. It resets the ‘selectedUser’ and ‘showEditModal’ properties. 

The ‘deleteUser’ function is called when the user wants to delete a user from the list. It prompts the user for confirmation and then removes the user from the list.

The ‘showData’ function toggles the visible property of the component to show or hide the component based on the value of visible.

 
For the display of the data, I used ‘app.component.html’. I could’ve created another component, but it seemed superfluous to me, seen that it is a very simple application.

Inside ‘app.component.html’ I used data binding in order to display the user data inside the HTML template. Inside the button that allows the display of the address information I added the ‘showData() ‘function previously created. This means that whenever I click it, the ‘showData()’ function would be called and the visibility of the data inside the hidden elements would change. I also added a *ngIf=“visible” condition to the elements inside the address information, meaning that if the value was indeed set to visible, we could see the elements we couldn’t see previous to clicking the button.

Inside the button element ‘Edit’, I added a click event listener and made it call the ‘editUser(user)’ function whenever clicked. Once this button is clicked, a modal pops up with the informations of the user in order to edit them. For the modal I created another conditional statement, that would call ‘showEditModal’ if the button was clicked. Inside the modal there is a form that must be filled in order to update the data. Note that not every single value has to be changed in order to be possible to save the update. It functions as a patch would. Inside the form I added [(ngModel)] directive to the input element in order to enable two-way data binding between component and view.  I had to import ‘FormsModule’ and ‘NgModule’ inside ‘app.module.ts’ to use these directives.

In this case, the [(ngModel)] directive binds the value of the selectedUser.company.name_of_the_property property to an input field. When the user changes the input value, the change event triggers the (ngModelChange) event, which updates the value of the selectedUser.company.name_of_the_property property.
Given there is no database, there is no data persistence. If we refresh the page we get all of the values fetched from the API back. This means that the updated data and deleted data will reset to the initial values.
