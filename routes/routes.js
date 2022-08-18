const error = require('../middlewares/error')
const registerController = require('../controllers/register');
const login = require("../controllers/login");
const {paramsId, headerUserId} = require('../middlewares/objectId')
const { userAuth, isLogin, } = require('../middlewares/auth');
// const {authRole} = require('../middlewares/verifyRoles')
const roles_list = require("../config/roles");



module.exports = (app) => {

app.post('/auth-service/login', login.userLogin);
app.post('/auth-service/registration', registerController.createUser);
app.get('/auth-service/profiles',[userAuth, isLogin], registerController.getAllUser,);
app.get('/auth-service/profile/:id', [userAuth, isLogin,paramsId,], registerController.getUser);


app.use(error);

}


