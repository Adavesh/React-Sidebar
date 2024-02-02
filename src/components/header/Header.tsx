import styled from "styled-components";
import vite from "../../assets/favicon.png";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const HeaderContainer = styled.div`
  background: #fafafa;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  width: 100%;
  border-bottom: 1px solid lightgray;
  text-decoration: none;
`;

const PageTitle = styled.h3`
  margin-left: 10px;
  color: #555;
  align-self: center;
`;

const AccountSection = styled(Link)`
  display: flex;
  margin-right: 10px;
  font-size: 12px;
  font-style: bold;
  text-decoration: none;
  color: black;
  &:hover {
    transition: 0.3s ease;
    text-decoration: underline;
    color: blue;
  }
`;

const LogoSection = styled(Link)`
  display: flex;
  text-decoration: none;
`;

function Header() {
  return (
    <HeaderContainer>
      <LogoSection to="/home">
        <img src={vite} height="22px" width="22px"></img>
        <PageTitle>ADMIN PORTAL</PageTitle>
      </LogoSection>
      <AccountSection to="/myprofile">
        <MdOutlineAccountCircle style={{ marginRight: "5px" }}></MdOutlineAccountCircle>Adavesh Managaon
      </AccountSection>
    </HeaderContainer>
  );
}

export default Header;
