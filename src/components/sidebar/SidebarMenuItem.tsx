import styles from "./SidebarMenuItem.module.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SidebarMenuDataItem } from "../../uiModels/SidebarMenuDataItem";
import { useState } from "react";

const SidebarLabel = styled.span`
  font-weight: 600;
  margin-left: 16px;
`;

const LinkWithNoTarget = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

function SidebarMenuItem({ title, path, icon, iconOpened, iconClosed, SubMenuItems, state }: SidebarMenuDataItem) {
  const [submenuShown, setSubmenuShown] = useState(false);

  return (
    <>
      {path && path.length > 0 && (
        <Link to={path} className={styles.menuItemContainer} onClick={() => setSubmenuShown(!submenuShown)}>
          <div>
            {icon}
            {state !== "collapsed" && <SidebarLabel>{title}</SidebarLabel>}
          </div>
          {state !== "collapsed" && SubMenuItems && SubMenuItems.length > 0 && <div>{submenuShown ? iconOpened : iconClosed}</div>}
        </Link>
      )}
      {(!path || path.length === 0) && (
        <LinkWithNoTarget className={styles.menuItemContainer} onClick={() => setSubmenuShown(!submenuShown)}>
          <div>
            {icon}
            {state !== "collapsed" && <SidebarLabel>{title}</SidebarLabel>}
          </div>
          {state !== "collapsed" && SubMenuItems && SubMenuItems.length > 0 && <div>{submenuShown ? iconOpened : iconClosed}</div>}
        </LinkWithNoTarget>
      )}
      {state !== "collapsed" &&
        submenuShown &&
        SubMenuItems?.map((item, index) => (
          <Link className={styles.SidebarSubMenuItem} key={index} to={item.path}>
            <div>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </div>
          </Link>
        ))}
    </>
  );
}

export default SidebarMenuItem;
