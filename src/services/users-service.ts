import Users from "./users.json";
interface PortalUser {
  PortalUserId: number;
  FirstName: string;
  LastName: string;
  FullName: string;
  Email: string;
  Password: string | null;
  Workspaces: number[];
}

export class PortalUserService {
  private static _instance: PortalUserService = new PortalUserService();
  private usersList: PortalUser[] = Users;

  private constructor() {
    PortalUserService._instance = this;
  }

  public static getInstance(): PortalUserService {
    return PortalUserService._instance;
  }

  public getUsers(): PortalUser[] {
    return this.usersList;
  }

  public getUserById(portalUserId: number): PortalUser | undefined {
    return this.usersList.find((u) => u.PortalUserId == portalUserId);
  }

  public updateUser(user: PortalUser) {
    let existing = this.usersList.find((u) => u.PortalUserId == user.PortalUserId);
    if (existing) {
      existing = { ...user, PortalUserId: existing.PortalUserId };
    }
  }

  public deleteUser(portalUserId: number) {
    this.usersList = this.usersList.filter((u) => u.PortalUserId != portalUserId);
  }
}
