Static assets go here. images, etc.
We are using the Express.static stuff to simply make a directory open for browsing.

It is much different from using Express to write the endpoint that returns files.
Its all explained in the excellent tutorial below:

Tutorial: https://stackoverflow.com/questions/5823722/how-to-serve-an-image-using-nodejs

Static stuff is still very flexible, See:
https://expressjs.com/en/starter/static-files.html


Code example:
app.use(express.static(dir));
