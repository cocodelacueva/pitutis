const userSession = async (req, res, next) => {

    if (req.session.started) {
        req.gaming = true;
    } else {
        req.gaming = false;
    }
    next();
}

module.exports = userSession;