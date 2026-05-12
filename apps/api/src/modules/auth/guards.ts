import { CanActivate, ExecutionContext, ForbiddenException, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { can, type Permission } from "./rbac.js";

export const REQUIRED_PERMISSION = "required_permission";
export const RequirePermission = (permission: Permission) => SetMetadata(REQUIRED_PERMISSION, permission);

@Injectable()
export class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers["x-user-id"] as string | undefined;
    const rolesHeader = request.headers["x-roles"] as string | undefined;

    if (!userId) {
      throw new UnauthorizedException({ code: "auth_required", message: "x-user-id header is required" });
    }

    request.user = {
      id: userId,
      roles: rolesHeader?.split(",").map((value) => value.trim()).filter(Boolean) ?? ["registered_user"],
    };

    return true;
  }
}

@Injectable()
export class PermissionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const required = Reflect.getMetadata(REQUIRED_PERMISSION, context.getHandler()) as Permission | undefined;

    if (!required) {
      return true;
    }

    const roles = (request.user?.roles ?? []) as string[];
    if (!can(roles, required)) {
      throw new ForbiddenException({ code: "insufficient_permissions", required, roles });
    }

    return true;
  }
}
