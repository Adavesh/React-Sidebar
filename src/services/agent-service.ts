import Agents from "./agents.json";
interface Agent {
  AgentId: number;
  LoginId: string;
  Password: string;
  WorkspaceId: number;
  TeamId?: number;
}

export class AgentsService {
  private static _instance: AgentsService = new AgentsService();
  private agentsList: Agent[] = Agents;

  private constructor() {
    AgentsService._instance = this;
  }

  public static getInstance(): AgentsService {
    return AgentsService._instance;
  }

  public getAgents(): Agent[] {
    return this.agentsList;
  }

  public getAgentById(agentId: number): Agent | undefined {
    return this.agentsList.find((a) => a.AgentId == agentId);
  }

  public updateAgent(agent: Agent) {
    let existing = this.agentsList.find((a) => a.AgentId == agent.AgentId);
    if (existing) {
      existing = { ...agent, AgentId: existing.AgentId };
    }
  }

  public deleteAgent(agentId: number) {
    this.agentsList = this.agentsList.filter((a) => a.AgentId != agentId);
  }
}
