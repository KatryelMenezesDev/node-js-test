import { container } from "tsyringe";
import { BCryptHashProvider } from "./HashProvider/BcryptHashProvider";
import { IHashProvider } from "./HashProvider/IHashProvider";
import { ITokenProvider } from "./Tokenprovider/ITokenProvider";
import { JWTTokenProvider } from "./Tokenprovider/JWTTokenProvider";

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
container.registerSingleton<ITokenProvider>("TokenProvider", JWTTokenProvider);
