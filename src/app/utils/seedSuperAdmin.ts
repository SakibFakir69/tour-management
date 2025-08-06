import { envVars } from "../modules/config/env";
import { IAuthProvider, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcryprt from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExits = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExits) {
      console.log("super admin exits");
      return;
    }

    const hashPassword =await bcryprt.hash(
      envVars.SUPER_ADMIN_PASS,
      10
    );

 
    const authProvider: IAuthProvider = {
      provider: "credintails",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };
    const payload = {
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashPassword,
      auths: [authProvider],
      isVerified: true,
    };

    const superAdmin = await User.create(payload);
    console.log(superAdmin);
    console.log("super admin created successfully");
  } catch (error) {
    console.log(error);
  }
};
