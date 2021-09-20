import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import {Request } from "express";

export const CustomReq = createParamDecorator(
    (data: unknown , ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req;
})