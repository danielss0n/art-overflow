const sessionRedirect = function(req, res, link,) {
    req.session.save(() => {
        res.redirect(`${link}`)
      })
}

module.exports = { sessionRedirect };