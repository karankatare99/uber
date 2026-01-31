import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export interface UserProp {
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
}

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;

    if (!sessionToken) {
      return null;
    }

    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(sessionToken, secretKey);

    return {
      firstName: payload.firstName as string,
      lastName: payload.lastName as string,
      email: payload.email as string,
      userType: payload.userType as string
    } as UserProp;
  } catch (error) {
    return null;
  }
}
