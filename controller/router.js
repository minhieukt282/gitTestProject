const HOME_PAGE = require('./handle/homePage');
const LOGIN_PAGE = require('./handle/loginPage')
const PERSONAL_PAGE = require('./handle/personalPage');
const PROFILE_PAGE = require('./handle/profilePage');


const handler = {
    "home": HOME_PAGE.homePage,
    "login": LOGIN_PAGE.login,
    "register": LOGIN_PAGE.register,
    "personalPage": PERSONAL_PAGE.showPage,
    "userEditProfile": PERSONAL_PAGE.showEditProfile,
    "userEditProduct": PERSONAL_PAGE.showEditProduct,
    "profilePage":PROFILE_PAGE.profile
}

module.exports = handler;