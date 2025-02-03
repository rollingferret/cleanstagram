# Cleanstagram

Cleanstagram is a single-page Instagram clone. It allows users to post images, like images, comment on images, and follow other users.

## Live site

https://cleanstagram-3po0.onrender.com/

## Technologies used

- Frontend
  - HTML, CSS, Javascript, React, Redux
- Backend
  - Flask, SQLAlchemy, PostgreSQL, Alembic, Docker

## Screenshots

- Splash Page
  ![Splash Page](https://user-images.githubusercontent.com/54250710/137774960-6bb6e854-a550-4592-b4a7-451403a57679.png)

- Signup Page
  ![image](https://user-images.githubusercontent.com/54250710/137775125-b9fa0622-4439-4ce5-b934-949c89d6c01f.png)

- Photo Feed
  ![image](https://user-images.githubusercontent.com/54250710/137775225-08fada44-b276-4384-b68b-32f64919ed50.png)

- Image Page
  ![image](https://user-images.githubusercontent.com/54250710/137775336-3c408bef-40f7-44ba-82f3-861559c4b0b1.png)

- Profile Page
  ![image](https://user-images.githubusercontent.com/54250710/137775457-8a418cc3-bb8a-48d1-b961-fa0190ea58d0.png)

- Add Image Page
  ![image](https://user-images.githubusercontent.com/54250710/137775552-c54bf165-2964-4938-8509-d37e31dea181.png)

## Features

Users are able to log in, and view images that their following users posted. They are also able to interact with other users by liking their images, and commenting on their images. Users are also able to search for other users using the search bar, by typing in part of the username they are looking for.

## Challenges

- Using the Redux store

  - As our second project using the Redux store, our group is more used to the data flow. However, we were forced to make the decision between loading every entry from our database into our Redux store when we first load into the app, or to load only the information we need when we need to use them. Due to the short amount of time we have to work on this project, we opted to load all the images into the Redux state to begin, then slowly grow our other slices of states. As of right now, we plan to come back to this project to refactor our app design to only load data into our Redux store when necessary to improve its performance.

- Adapting to teammate's workflow
  - Each of our teammate has a different workflow since we were able to work at our own pace in our solo project. Coming back into a group project, we originally had issues working out the small details like tasks delegation, disagreement on implementaion, styling, etc. We eventually overcome these obstacles throughout the week by constant communication and checking in with each other before making a big decision that could possibly impact the work of others.
