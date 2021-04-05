This is where the actual source code of the program goes.
When we do stuff with npm we gotta be inside this directory

Stuff outside of /dist is for other stuff not related to our app. 

package.json:
Node.js' package manger (npm) uses this file to organize & describe our node.js app.

server.js:
We have decided this is our main entrypoint to MARC. package.json even specifies it, so 'npm start' will execute it.

app:
Just a subdirectory that contains our code in nice modular bits.

test:
The testing framework, mocha, looks for this directory. It finds .js files in here and executes
them as tests when you run 'npm test'. So does GitHub when we push to main, cos it calls 'npm test' !!

node_modules:
When you install dependencies for our nodejs program it throws them all in node_modules.\
Don't want this affecting our git & code changes, so node_modules is mentioned in gitignore.

package-lock.json:
package-lock.json is mentioned in the gitignore file too. Depencencies have depencencies.
This file locks their versions in place. I have made git ignore it to make our life easy.


