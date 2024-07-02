import ErrorHandler from "../utils/errorHandler.js";
import { verify } from "jsonwebtoken";
import response from "../utils/response.js";
import helper from "../utils/helper.js";

class Auth {
    static userProtectRoute = async (req, res, next) => {
        let token;
        if (req.cookies.ApiUserLoginCookie) {
            token = req.cookies.ApiUserLoginCookie;
        }
        if (!token) {
            return next(new ErrorHandler("Not authorized to access this route", 401));
        }
        try {
            const decoded = verify(token, process.env.JWT_SECRET);
            const { status_code } = await helper.isExist(decoded.id);

            if (status_code == 404) {
                return response.send(res, 401, "false", "Not authorized to access this route", []);
            }

            req.user_id = decoded.id;
            next();
        } catch (error) {
            return next(new ErrorHandler("Not authorized to access this route", 401));
        }
    };

}

export default Auth;