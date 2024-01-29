import styled from "styled-components";
import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import WorkspaceHome from "./pages/workspace/WorkspaceHome";

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
    <PageContainer>
      <Header></Header>
      <ContentContainer>
        <Sidebar></Sidebar>
        <WorkspaceHome></WorkspaceHome>
      </ContentContainer>
    </PageContainer>
  );
}

export default App;
