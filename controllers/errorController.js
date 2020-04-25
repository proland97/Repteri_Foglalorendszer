exports.get404 = (req, res, next) => {
    res.status(404).send({ sucess: false, msg: 'Page not found!!!' });
};