const get404 = (req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render("404", { pageTitle: "404", active: "404", isAuthenticated: req.session.isLoggedIn });
}

exports.get404 = get404