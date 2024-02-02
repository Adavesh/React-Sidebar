import styled from "styled-components";
import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WorkspaceHome from "./pages/manage/workspaces/WorkspaceHome";
import NewWorkspace from "./pages/manage/workspaces/NewWorkspace";
import DeleteWorkspace from "./pages/manage/workspaces/DeleteWorkspace";
import EditWorkspace from "./pages/manage/workspaces/EditWorkspace";
import TeamsHome from "./pages/manage/teams/TeamsHome";
import NewTeam from "./pages/manage/teams/NewTeam";
import EditTeam from "./pages/manage/teams/EditTeam";
import DeleteTeam from "./pages/manage/teams/DeleteTeam";
import SecureRoute from "./components/auth0/SecureRoute";
import Dashboards from "./pages/dashboards/Dashboards";
import AgentsHome from "./pages/manage/agents/AgentsHome";
import NewAgent from "./pages/manage/agents/NewAgent";
import EditAgent from "./pages/manage/agents/EditAgent";
import DeleteAgent from "./pages/manage/agents/DeleteAgent";
import UsersHome from "./pages/manage/users/UsersHome";
import NewUser from "./pages/manage/users/NewUser";
import EditUser from "./pages/manage/users/EditUser";
import DeleteUser from "./pages/manage/users/DeleteUser";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;

  height: 94vh;
  overflow: auto;
`;

function App() {
  return (
    <BrowserRouter>
      <PageContainer>
        <Header></Header>
        <ContentContainer>
          <Sidebar></Sidebar>
          <Routes>
            <Route element={<SecureRoute component={Dashboards} />} path="/" />
            <Route element={<SecureRoute component={Dashboards} />} path="/home" />
            <Route element={<SecureRoute component={WorkspaceHome} />} path="/manage/workspaces" />
            <Route element={<SecureRoute component={NewWorkspace} />} path="/manage/workspaces/new" />
            <Route element={<SecureRoute component={EditWorkspace} />} path="/manage/workspaces/edit/:workspaceId" />
            <Route element={<SecureRoute component={DeleteWorkspace} />} path="/manage/workspaces/delete/:workspaceId" />
            <Route element={<SecureRoute component={TeamsHome} />} path="/manage/teams" />
            <Route element={<SecureRoute component={NewTeam} />} path="/manage/teams/new" />
            <Route element={<SecureRoute component={EditTeam} />} path="/manage/teams/edit/:teamId" />
            <Route element={<SecureRoute component={DeleteTeam} />} path="/manage/teams/delete/:teamId" />
            <Route element={<SecureRoute component={AgentsHome} />} path="/manage/agents" />
            <Route element={<SecureRoute component={NewAgent} />} path="/manage/agents/new" />
            <Route element={<SecureRoute component={EditAgent} />} path="/manage/agents/edit/:agentId" />
            <Route element={<SecureRoute component={DeleteAgent} />} path="/manage/agents/delete/:agentId" />

            <Route element={<SecureRoute component={UsersHome} />} path="/manage/users" />
            <Route element={<SecureRoute component={NewUser} />} path="/manage/users/new" />
            <Route element={<SecureRoute component={EditUser} />} path="/manage/users/edit/:portalUserId" />
            <Route element={<SecureRoute component={DeleteUser} />} path="/manage/users/delete/:portalUserId" />
          </Routes>
        </ContentContainer>
      </PageContainer>
    </BrowserRouter>
  );
}

export default App;
