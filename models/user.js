import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
}); //the Schema gets passed a model object of a User

/* 
The "models" object is provided by the Mongoose Library and stores all the registered models.
If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable.
This prevents redefining the model and ensures that existing model is reused.
If a model named "User" does not exist int he "models" object, the "model" function from Mongoose is called 
to create a new model.
The newly created nodel is then assigned to the "User" variable.
*/

const User = models.User || model("User", UserSchema); //if a user exists use the model of that user || else create a new model

export default User;