## User Stories:

• As a user, I want to sign up so that I can create an account and store my posts.
• As a user, I want to create a new post with a title.
• As a user, I want to view my posts and see their details.
• As a user, I want to edit my posts
• As a user, I want to delete my post if I no longer need it.
• As a user, I want to comment on a post to leave feedback or ask questions.
• As a user, I want to delete or update my comment after posting it
• As a guest user, I can only view posts but not edit or create any data.

## Pusedo Code

Define the database schema:
Create a table for users with columns: id, username, password, and email.
Create a table for posts with columns: id, title, text, user_id, and created_at.
Create a table for comments with columns: id, text, user_id, post_id, and created_at.

## Database Schema

User Table:
id: integer, primary key, auto-increment
username: string, not null
password: string, not null
email: string, not null

## Post Table:

id: integer, primary key, auto-increment
title: string, not null
text: text, not null
user_id: integer, foreign key referencing User.id
created_at: datetime

## Comment Table:

id: integer, primary key, auto-increment
text: text, not null
user*id: integer, foreign key referencing User.id
post_id: integer, foreign key referencing Post.id
created*
at: datetime

## Database Setup

Create a new database for the project.
Create tables for users, posts, and comments.
Define relationships between tables.

## Get Started

https://react-meetme-front-end.vercel.app

## LANDING PAGE

Display "Welcome to my website"
Display navigation bar with "Sign In" and "Sign Up" options

IF user selects "Sign Up":
user for registration details (username and password)
Make a new token for the user
Save user details in the database
Redirect to Home Page

IF user selects "Sign In":
user for email and password
Authenticate user(token)
IF authentication is successful:
Redirect to Home Page
ELSE:
Display "Invalid credentials" error message

## HOME PAGE

IF user is logged in:
Display a personalized welcome message
Display navigation bar with options: "Create post", "My posts", "Log Out"

## CREATE POST

IF user selects "Create post":
Prompt user to input: (changeable ) - Title - text
Save post with user ID as the owner in the database
Redirect to "My post"

## VIEW POSTS

IF user selects "My posts":
Retrieve post created by the user from the database
Display post with options to: - View Details - Edit - Delete

    // VIEW POST DETAILS
    IF user selects a post:
        Display full post details

    // EDIT POST
    IF user selects "Edit":
        Check if logged-in user is the POST owner
        Allow user to update:
            - Title
            - text
        Save updates to the database
        Redirect to "My posts"

    // DELETE POST
    IF user selects "Delete":
        Check if logged-in user is the post owner
        Prompt user for confirmation
        IF confirmed:
            Remove post from the database
            Display success message


    // UPDATE OR DELETE COMMENT
    IF user selects their own comment:
        Allow user to either:
            - Edit comment and save updates
            - Delete comment

## LOG OUT

IF user selects "Log Out":
Clear session
Redirect to Landing Page

ELSE (user is a guest):
Display all posts in read-only mode
Hide "Create post" and "My posts" options
Allow guests to view post details but restrict commenting, editing, or creating posts

## COMMENTING

IF user views another user's post:
Allow user to add a comment
Save comment to the database with user ID
Display all comments for the posts

## Technologies used:

- React front-End
- Express
- Node
- MONGODB
- JavaScript
- CSS

## ERD & Data Entity Fields

![alt text](/planning/meetmeERD.png)

## Wire Frame

![alt text](/planning/meetmemockup.png)

## Screen Shot

![alt text](/planning/meetmeScreenshot.png)

## Future Features

- Being able to chat with members of the meetme community
- Being able to create a group chat with members of the meetme community
- Being able to create a gallery of photos
