const PORT = 3000;
const fileName = 'concept29';
if (['concept3','concept4','concept5','concept6','concept7','concept8'].includes(fileName)) {
    require(`./${fileName}.js`);
} else {
    const server = require(`./${fileName}.js`);

    /**
    * Start the server
    * ----------------
    * server.listen() is asynchronous. You can add a callback to confirm it's running.
    */
    server.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}