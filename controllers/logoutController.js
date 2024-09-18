const logoutUser = (req, res) => {
    res.clearCookie('JWT'); // Clear the JWT cookie
    res.redirect('/login'); // Redirect the user to the login page
};

module.exports =logoutUser;
