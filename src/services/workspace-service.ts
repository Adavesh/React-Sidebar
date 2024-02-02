import workspaces from "./workspaces.json";

export interface Workspace {
  WorkspaceId: number;
  UniqueId: string;
  Name: string;
  Enterprise: string;
  BPO: string;
  Site: string;
  AllocatedSeats: number;
  Teams: number;
  Agents: number;
}

export class WorkspacesService {
  private static _instance: WorkspacesService = new WorkspacesService();
  private list: Workspace[] = [...workspaces];

  private constructor() {
    WorkspacesService._instance = this;
  }

  public static getInstance(): WorkspacesService {
    return WorkspacesService._instance;
  }

  public getWorkspaces(): Workspace[] {
    return this.list;
  }

  public getWorkspaceById(WorkspaceId: number): Workspace | undefined {
    return this.list.find((w) => w.WorkspaceId == WorkspaceId);
  }

  public addWorkspace(workspace: Workspace): Workspace {
    let nextId = 0;
    this.list.forEach((w) => (nextId = Math.max(nextId, w.WorkspaceId)));
    let newWorkspace = { ...workspace, workspaceId: nextId };
    this.list.push(newWorkspace);
    return newWorkspace;
  }

  public updateWorkspace(workspace: Workspace): Workspace | undefined {
    let w = this.list.find((w) => w.WorkspaceId == workspace.WorkspaceId);
    if (w) {
      w.UniqueId = workspace.UniqueId;
      w.Enterprise = workspace.Enterprise;
      w.BPO = workspace.BPO;
      w.Site = workspace.Site;
      w.Name = workspace.Name;
      w.AllocatedSeats = workspace.AllocatedSeats;
    }

    return w;
  }

  public deleteWorkspace(workspaceId: number) {
    let workspace = this.list.find((w) => w.WorkspaceId == workspaceId);
    if (workspace) {
      let newList = this.list.filter((w) => w.WorkspaceId != workspace?.WorkspaceId);
      this.list = newList;
    }
  }
}
