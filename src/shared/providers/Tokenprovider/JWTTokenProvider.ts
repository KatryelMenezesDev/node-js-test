import { sign, verify } from "jsonwebtoken";

import { ITokenProvider } from "./ITokenProvider";

export class JWTTokenProvider implements ITokenProvider {
  async sign(subject: string | object): Promise<string | boolean> {
    try {
      const token: string = sign(subject, process.env.JWT_PASS as string);

      return await Promise.resolve(token);
    } catch (exception) {
      console.log(exception);
      return Promise.resolve(false);
    }
  }

  async verify(payload: string): Promise<string | boolean | object | Buffer> {
    try {
      if (!process.env.JWT_PASS) return false;

      const decoded = verify(payload, process.env.JWT_PASS);

      return await Promise.resolve(decoded);
    } catch (exception) {
      console.log(exception);
      return false;
    }
  }
}
