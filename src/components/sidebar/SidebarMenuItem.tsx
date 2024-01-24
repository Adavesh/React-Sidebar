import { Link } from "react-router-dom";
import styled from "styled-components";
import { NavItem } from "../../uiModels/SidebarData";
import { SyntheticEvent, useState } from "react";
import * as MdIcons from "react-icons/md";

const BackgroundColor = "smokewhite";
const BackgroundColorSelected = "gray";
const BackgroundColorHover = "lightgray";
const TextColor = "black";
const TextColorSelected = "white";

const iconDropDown = <MdIcons.MdArrowDropDown />;
const iconDropUp = <MdIcons.MdOutlineArrowDropUp />;

const SidebarLabel = styled.span`
  font-weight: 600;
  margin-left: 16px;
`;

const MenuLink = styled(Link)<{ $selected: boolean }>`
  background: ${({ $selected }) => ($selected ? BackgroundColorSelected : BackgroundColor)};
  color: ${({ $selected }) => ($selected ? TextColorSelected : TextColor)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px;
  text-decoration: none;
  width: 100%;
  border-radius: 0px 80px 80px 0px;
  &:hover {
    background: ${({ $selected }) => ($selected ? BackgroundColorSelected : BackgroundColorHover)};
    color: ${({ $selected }) => ($selected ? TextColorSelected : TextColor)};
  }
`;

const SubMenuLink = styled(Link)<{ $selected: boolean }>`
  background: ${({ $selected }) => ($selected ? BackgroundColorSelected : BackgroundColor)};
  color: ${({ $selected }) => ($selected ? TextColorSelected : TextColor)};
  display: flex;
  padding: 10px 0px;
  padding-left: 3rem;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  border-radius: 0px 80px 80px 0px;
  &:hover {
    background: ${({ $selected }) => ($selected ? BackgroundColorSelected : BackgroundColorHover)};
    color: ${({ $selected }) => ($selected ? TextColorSelected : TextColor)};
  }
`;

interface Props {
  navItem: NavItem;
  isSidebarExpanded: boolean;
  selectedPath: string;
  onClick: (item: NavItem) => void;
}

function SidebarMenuItem(params: Props) {
  const {
    navItem: { title, path, icon, subMenuItems },
    onClick,
    selectedPath,
    isSidebarExpanded,
  } = params;

  const [submenuShown, setSubmenuShown] = useState(false);
  const hasSubMenu = subMenuItems && subMenuItems.length > 0;

  const shouldSelect = (menuPath: string) => {
    return selectedPath.startsWith(menuPath) && menuPath !== "" && selectedPath != "";
  };

  const handleMenuClick = (e: SyntheticEvent, menuItem: NavItem) => {
    if (menuItem.subMenuItems && menuItem.subMenuItems.length > 0) {
      setSubmenuShown(!submenuShown);
    }

    if (menuItem.path === "") {
      e.preventDefault();
    }

    onClick(menuItem);
  };

  return (
    <>
      <MenuLink to={path} onClick={(e) => handleMenuClick(e, params.navItem)} $selected={shouldSelect(path)}>
        <div>
          {icon}
          {isSidebarExpanded && <SidebarLabel>{title}</SidebarLabel>}
        </div>
        {isSidebarExpanded && hasSubMenu && (submenuShown ? iconDropUp : iconDropDown)}
      </MenuLink>

      {isSidebarExpanded &&
        submenuShown &&
        subMenuItems?.map((item, index) => (
          <SubMenuLink key={index} to={item.path} onClick={(e) => handleMenuClick(e, item)} $selected={shouldSelect(item.path)}>
            <div>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </div>
          </SubMenuLink>
        ))}
    </>
  );
}

export default SidebarMenuItem;
