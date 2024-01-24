import styles from "./SidebarMenuItem.module.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { NavItem } from "../../uiModels/SidebarData";
import { SyntheticEvent, useState } from "react";
import * as MdIcons from "react-icons/md";

const iconDropDown = <MdIcons.MdArrowDropDown />;
const iconDropUp = <MdIcons.MdOutlineArrowDropUp />;

const SidebarLabel = styled.span`
  font-weight: 600;
  margin-left: 16px;
`;

function SidebarMenuItem({ navItem, isSidebarExpanded }: { navItem: NavItem; isSidebarExpanded: boolean }) {
  const { title, path, icon, subMenuItems } = navItem;
  const [submenuShown, setSubmenuShown] = useState(false);
  const hasSubMenu = subMenuItems && subMenuItems.length > 0;
  const handleMenuClick = (e: SyntheticEvent) => {
    hasSubMenu && setSubmenuShown(!submenuShown);
    !path && e.preventDefault();
  };

  return (
    <>
      <Link to={path} className={styles.menuItemContainer} onClick={(e) => handleMenuClick(e)}>
        <div>
          {icon}
          {isSidebarExpanded && <SidebarLabel>{title}</SidebarLabel>}
        </div>
        {isSidebarExpanded && hasSubMenu && (submenuShown ? iconDropUp : iconDropDown)}
      </Link>

      {isSidebarExpanded &&
        submenuShown &&
        subMenuItems?.map((item, index) => (
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
