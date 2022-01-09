module.exports = function (app) {
    app.use((req, res, next) => {
        res.removeHeader('Cross-Origin-Resource-Policy');
        res.removeHeader('Cross-Origin-Embedder-Policy');
        next();
    });
};
//This seems to be the key solution to showcasing images. Safari worked fine, but Google Chrome repeatedly put up errors. 