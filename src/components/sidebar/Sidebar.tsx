import styled from "styled-components";
import SidebarMenuItem from "./SidebarMenuItem";
import { SidebarData } from "../../uiModels/SidebarMenuDataItem";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { useState } from "react";

const SidebarContainer = styled.div<{ $collapsed: boolean }>`
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${({ $collapsed }) => ($collapsed ? "center" : "left")};
  height: 93vh;
  width: ${({ $collapsed }) => ($collapsed ? "48px" : "16%")};
  border-top: none;
  box-shadow: 5px 0px 5px lightgray;
  margin-top: 0px;
  border-radius: 5px;
  transition: 0.3s;
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <SidebarContainer $collapsed={sidebarCollapsed}>
      {SidebarData &&
        SidebarData.map((item, index) => (
          <div key={index}>
            {index == 0 && (
              <HorizontalLine>
                {!sidebarCollapsed && <FaChevronCircleLeft color="gray" className="toggle" onClick={toggleCollapse} />}
                {sidebarCollapsed && <FaChevronCircleRight color="gray" className="toggle" onClick={toggleCollapse} />}
              </HorizontalLine>
            )}
            <SidebarMenuItem
              icon={item.icon}
              path={item.path}
              title={item.title}
              SubMenuItems={item.SubMenuItems}
              iconClosed={item.iconClosed}
              iconOpened={item.iconOpened}
              state={sidebarCollapsed ? "collapsed" : "expanded"}
            ></SidebarMenuItem>
          </div>
        ))}
    </SidebarContainer>
  );
}

export default Sidebar;
