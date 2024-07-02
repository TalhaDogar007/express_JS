import { PrismaClient } from "@prisma/client";
import response from "../../utils/response";
import helper from "../../utils/helper";
const prisma = new PrismaClient();

class UserService {
  static userVelidationAndInsertion = async (data) => {
    try {
      let user_name = data.name;
      let user_email = data.email;

      const existing_user = await prisma.user_details.findFirst({
        where: {
          email: user_email,
        },
      });

      if (existing_user) {
        const token = await helper.getSignedJwtToken(existing_user.id);

        return response.error(409, "true", "Already Exists", token);

      } else {
        const new_user = await prisma.user_details.create({
          data: {
            name: user_name,
            email: user_email,
          },
        });
        const token = await helper.getSignedJwtToken(new_user.id);

        return response.result(200, "true", "user created", token);
      }
    } catch (error) {
      throw error;
    }
  }
 
}

export default UserService;
