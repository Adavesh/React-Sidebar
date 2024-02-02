import teams from "./teams.json";

export interface Team {
  TeamId: number;
  Name: string;
  WorkspaceId: number;
  Agents: number;
}

export class TeamsService {
  private static _instance: TeamsService = new TeamsService();
  private teamList: Team[] = teams;

  private constructor() {
    TeamsService._instance = this;
  }

  public static getInstance(): TeamsService {
    return TeamsService._instance;
  }

  public getTeams(): Team[] {
    return [...this.teamList];
  }

  public getTeamById(teamId: number): Team | undefined {
    let team = this.teamList.find((t) => t.TeamId == teamId);
    console.log(team);
    return team;
  }

  public updateTeam(team: Team) {
    let existing = this.teamList.find((t) => t.TeamId == team.TeamId);
    if (existing) {
      existing.Name = team.Name;
      existing.Agents = team.Agents;
    }
  }

  public deleteTeam(teamId: number) {
    this.teamList = this.teamList.filter((t) => t.TeamId != teamId);
  }
}
