import { container } from "tsyringe";
import { BCryptHashProvider } from "./HashProvider/BcryptHashProvider";
import { IHashProvider } from "./HashProvider/IHashProvider";
import { ITokenProvider } from "./Tokenprovider/ITokenProvider";
import { JWTTokenProvider } from "./Tokenprovider/JWTTokenProvider";
import { RedisCacheProvider } from "./CacheProvider/RedisCacheProvider";
import { IRedisCacheProvider } from "./CacheProvider/IRedisCacheProvider";

container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
container.registerSingleton<ITokenProvider>("TokenProvider", JWTTokenProvider);
container.registerSingleton<IRedisCacheProvider>("RedisCacheProvider", RedisCacheProvider);
