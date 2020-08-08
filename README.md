# getaways-frontend
Frontend repo | Getaways.guru

## Developer
Juli Ramon

## Link to the app
[enter link here](#)

## Description

Getaways.guru is a discovery platform where community members can search, book and share their most loved getaways, places, experiences and stories.

## Epics

- **Signup**
- **Login**
- **Access to the user feed**
- **Access to the user profile**
- **Promote a getaway**
- **Promote an experience**
- **Publish an story**
- **Search content**

## User Stories

- **Home offpage**: As a user I want to be able to access the home offpage to see how the app works, check the list of getaways, places, experiences and stories listed, and have access to the login and signup options
- **Sign up**: As a user I want to sign up –either with my email or my Google or Facebook account– to the app to create my personal account to search, book and publish content
- **Log in**: As a user I want to be able to log in to the app to access and manage my personal account
- **Log out**: As a user I want to be able to log out from the app so that no one else has access to my account
- **User profile**: As a user I want to be able to access my user profile to manage my content and account details
- **Content lists**: As a user I want to be able to see content lists –getaways, places, experiences and stories– to read before booking or executing an action
- **Content creation**: As a user I want to be able to promote/publish new content -getaways, places, experiences and stories- so that others can read them as well as to get more clients to my property

## Backlog
List of extra features not included in the MVP:

- **Home onpage (Feed)**: As a user I want to be able to access the home onpage -personal feed- to get recommended results and search for content
- **Search**: As a user I want to be able to use the app browser to search for content and get dedicated results based on my queries
- **Advanced search**: As a user I want to be able to apply additional filters to my search to improve my queries
- **Save content**: As a user I want to be able to save content to my "Saved content" list
- **Geo location**: As a user I want to be able to search and get custom recommendations base on my location

## Routing

|Name         |Route     |
|-------------|----------|
|Sign up      |/signup   |
|Log in       |/login    |
|Home offpage |/         |
|Home onpage  |/home     |
|User profile |/:username|
|Search       |/search   |
|Getaways list|/getaways |

## Wireframes

- [excalidraw](#)

## Links
- [Backend Repo](https://github.com/juliramon/getaways-backend)
- [Heroku](#)
- [Trello](#)
- [Slides](#)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
