import UserService from "../../services/userServices/userService";
import response from "../../utils/response";
import helper from "../../utils/helper";

class AuthController {
    static loign = async (req, res) => {
        try {
            const { data, status_code, type, message } = await UserService.userVelidationAndInsertion(req.body);

            res.cookie("ApiUserLoginCookie", data, {
                secure: true,
                httpOnly: true,
                sameSite: "none",
            });
            return response.send(res, status_code, type, message, []);

        } catch (error) {
            res.status(500).send({ success: false });
        }
    }


    static logout = async (req, res) => {
        try {
            const { status_code, type, message } = await helper.isExist(req.user_id);

            if (status_code == 200) {
                res.clearCookie("ApiUserLoginCookie", { secure: true, sameSite: "none" });
                return response.send(res, status_code, type, "logout successfully", []);

            } else {
                return response.send(res, status_code, type, message, []);

            }

        } catch (error) {
            res.status(500).send({ success: false });
        }
    }

}

export default AuthController;
