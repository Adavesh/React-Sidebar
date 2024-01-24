import styled from "styled-components";
import { SidebarData } from "../../uiModels/SidebarData";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useState } from "react";
import SidebarMenuItem from "./SidebarMenuItem";

const SidebarContainer = styled.div<{ $collapsed: boolean }>`
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${({ $collapsed }) => ($collapsed ? "center" : "left")};
  height: 93vh;
  width: ${({ $collapsed }) => ($collapsed ? "48px" : "16%")};
  min-width: ${({ $collapsed }) => ($collapsed ? "48px" : "200px")};
  border-top: none;
  box-shadow: 5px 0px 5px lightgray;
  margin-top: 0px;
  border-radius: 5px;
  transition: 0.1s;
  overflow-y: scroll;
  &::webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: lightgray;
  }
`;

const HorizontalLine = styled.div`
  border-bottom: 1px solid #eeeeee;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  .toggle:hover {
    cursor: pointer;
  }
`;

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SidebarContainer $collapsed={!isExpanded}>
      {SidebarData.map((item, index) => (
        <div key={index}>
          {index == 0 && (
            <HorizontalLine>
              {isExpanded ? <FaChevronCircleLeft onClick={toggleCollapse} /> : <FaChevronCircleRight onClick={toggleCollapse} />}
            </HorizontalLine>
          )}
          <SidebarMenuItem navItem={item} isSidebarExpanded={isExpanded}></SidebarMenuItem>
        </div>
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;
