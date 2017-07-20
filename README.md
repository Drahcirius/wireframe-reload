# wireframe-reload

Quick script for reloading html/css on save when browser window is open.

## Instructions

 - run `git clone https://github.com/Drahcirius/wireframe-reload.git reload`
 - copy config.sample.js to config.js and edit path
 - Put css in assets folder
 - Add this in header of html file
 ```html 
  <script src="reload/config.js"></script>
  <script src="reload/wireframe-reload.js"></script>
  ```
 - run `node reload/wireframe-watch.js`
