import { JwtPayload } from "jsonwebtoken";

// custome types

declare global {
    namespace Express{
        interface Request{
            user:JwtPayload

        }
    }
}