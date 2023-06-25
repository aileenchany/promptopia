import NextAuth from "next-auth"; // "next-auth";
import GoogleProvider from "next-auth/providers/google"; //this is what JSMastery wrote down
//import { GoogleProfile } from "next-auth/providers/google"; //this is what VS Code gave me as option

// /https://authjs.dev/getting-started/oauth-tutorial

import User from '@models/user';
import { connectToDB } from '@utils/database';

// To Setup Google OAuth:
// go to: console.cloud.google.com
// click on new project link, name the Project name: Promptopia, then click on Create
// Select the Project
// In left navbar > APIs & Services > OAuth consent screen > click "Create" btn > 
// App Name: Promptopia, and add your email
    // this section below did not work, so we had to delete the domain with trash icon URGH - he didnt' say anything and I struggled for an hour!!!!!
    // DO NOT DO THIS YET => Click on "Add Domain", in Authorized Domain: http://localhost:3000
// Add your developer email, then click on "Save and Continue"
    //I had to keep clicking on NEXT, it seems Google changed some things
// Finally, click on "Credentials" in left navbar, then click on "+ Create Credentials" tab > 
// then click on "OAuth Client Id" > select Application Type => Web Application
// In Authorized JS Origins add URI => http://localhost:3000, and do the same uri for Authorized Redirect URIs
// click CREATE , copy clientId and Client Secret add them to .env file!!!

// we can test that clientId and Secret are being retrieved, however this causes an infinite polling, 
// so stop the server and continue setting up the rest of the functions (session and signIn)
// console.log({
//   clientId: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET
// })

const  handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: 
    {
      async session({ session }) {
        //store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString(); //update the user who is online

      return session;
    },
    async signIn({ profile }) {
      try {
        //serverless -> Lambda -> dynamodb
        await connectToDB();

        //check if a user already exists
        const userExists = await User.findOne({ email: profile.email });

        //if not, create a new user and save to database
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, "").toLowerCase(), //here we clean any spaces with empty spaces and lowercase
            image: profile.picture,
          });
        }

        //if looged successfully return true, or in catch block console.log(error message)
        return true;

      } catch (error) {
        console.log("Error checking if user exists: " + error.message);
        return false;
      }
    },
  },
  
}) //handler is a function and we're passing in the options object

export { handler as GET, handler as POST }