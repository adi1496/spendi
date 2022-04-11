# Budget APP
## Track your money in a smart way

### In the version 3.0 I created a node.js server instead using firebase for more control


##Server errors to treated with error controller:
 - [ ] Validation errors
 - [ ] User duplicate error


### Technologies and libraries used:
#### Server:
    * Node.js/Express
    * MongoDB/Mongoose for Database
    * JsonWebToken for auth
    * BcryptJS for hashing
    * Nodemon

#### Client:
    * Vanilla JS
    * SASS/SCSS for CSS
    * Parcel bundler



### Rest Api routes
  #### Users:
  - [x] SignUp = POST '/api/v1/users/signup'
  - [x] Login = POST '/api/v1/users/login'

  #### Transactions:
  - [x] Get Transactions = GET '/api/v1/transactions/'
  - [x] Create New Transaction = POST '/api/v1/transactions/'
  - [x] Get One Transaction = GET '/api/v1/transactions/:id'



## TODO
  ### SERVER:
  - [x] Create server
  - [x] Connect to Database(with mongoose)
  - [x] Create User Routes + authController + userController
  - [x] Create Transactions Routes + transactionsController
  - [x] Create User Schema + Model
  - [x] Create Transaction Schema(the model will be created in the controller dipending by model)
  - [x] Create a class AppError that extends Error class
  - [x] Create errorController to handle the errors



  ### CLIENT
  - [ ] make some animations for login/signup pages