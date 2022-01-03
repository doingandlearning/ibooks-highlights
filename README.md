# ibooks highlights

> Extract all your notes and selected texts from Apple Books sqlite databases to Markdown files

This is a small project that gets data from the two sqlite databases the Books uses to maintain your library and notes.

To use:

- Clone and `npm install`
- Edit config.js to have your ANNOTATION and BOOK paths (they'll be in the same place as mine but called something slightly different)
- If you want the files to be in a different location, update this in config.js
- Run `node index.js` in the package directory

TODO:

- [ ] Add an install step that generates config.js for user
- [ ] Use more of the data in the template