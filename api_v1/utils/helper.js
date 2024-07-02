import Jwt from "jsonwebtoken";
import response from "../utils/response";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getSignedJwtToken = async (id) => {
    try {
        return Jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });
    } catch (error) {
        throw error;
    }
};

const isExist = async (id) => {
    try {
        const user = await prisma.user_details.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            return response.error(404, "false", "Invalid credentials", []);
        } else {
            return response.result(200, "true", "user data", user);
        }
    } catch (error) {
        throw error;
    }
};


export default { getSignedJwtToken, isExist };
