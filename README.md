# README 

This is a React version of the classic arcade game 2048. The application has been deployed (via [Firebase](www.firebase.google.com)) for demo purposes at [https://play-2048-with-me.web.app/](https://play-2048-with-me.web.app/)

## How to play 

When you start the game, there will be two “tiles” on the grid, each displaying the number 2 or 4.

You slide all the tiles in the board either up, down, left, or right.

Any tiles with the same values are merged (i.e. added together) and all the tiles on the board are pushed as far as possible to the side specified. 

After all the tiles are pushed to the edge of the board and merged together, a new tile (either 2 or 4) will be placed in one of the unused spaces on the board. 

Continue sliding and merging tiles until you get to 2048! 

If you can no longer slide tiles, and have not reached 2048... well you didn't win - but there's no limit on how much you can try! Restart and give it another shot 

### Slide 

#### SlideUp (toward the top)
When you perform a `slideUp` action on the board: 
* Loop through the array of tiles on the board starting at index 0 
  * tiles in positions 0-3 **cannot** be moved 
  * tiles in positions 4-15 **can** moved 
    * each tiles movement is dependent on: 
      * the tiles between the selected tile and the _top_ edge 
        * tiles of different values will halt movement 
        * tiles of the same value will be merged toward the _top_ edge
* After all tiles are moved, any null values in the tile array should be filled with empty tiles 
* Lastly; a new tile should be placed in a random open spot on the board 



## Future Features 

* [rare-error] - Bail out of the recursion loop and only merge a tile once per turn... note, this would only currently occur if the if two tiles could be merged simultaneously (i.e. there are two tiles with the same value being merged, that could be merged again)
* [account-system]
  * [login-system]
  * [point-system]
  * [score-board]


## Contributions 

This project was built by [Jason Nordheim](https://github.com/jason-nordheim) in September 2020 



--- 

# TEMPLATE STUFFF 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
