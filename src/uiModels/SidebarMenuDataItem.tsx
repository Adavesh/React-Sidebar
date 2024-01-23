import React from "react";
import * as MdIcons from "react-icons/md";

export interface SidebarMenuDataItem {
  title: string;
  path: string;
  icon: React.JSX.Element;
  iconClosed?: React.JSX.Element;
  iconOpened?: React.JSX.Element;
  SubMenuItems?: SidebarMenuDataItem[];
  state?: "collapsed" | "expanded";
}

export const SidebarData: SidebarMenuDataItem[] = [
  {
    title: "Home",
    path: "/home",
    icon: <MdIcons.MdOutlineHome />,
  },
  {
    title: "Downloads",
    path: "/downloads",
    icon: <MdIcons.MdOutlineCloudDownload />,
  },
  {
    title: "Manage",
    path: "",
    icon: <MdIcons.MdOutlineManageAccounts />,
    iconClosed: <MdIcons.MdArrowDropDown />,
    iconOpened: <MdIcons.MdOutlineArrowDropUp />,
    SubMenuItems: [
      {
        title: "Workspaces",
        path: "/manage/workspaces",
        icon: <MdIcons.MdWorkspacesOutline />,
      },
      {
        title: "Teams",
        path: "/manage/teams",
        icon: <MdIcons.MdOutlineGroupAdd />,
      },
      {
        title: "Agents",
        path: "/manage/agents",
        icon: <MdIcons.MdOutlineSupportAgent />,
      },
      {
        title: "Portal Users",
        path: "/manage/users",
        icon: <MdIcons.MdOutlinePeople />,
      },
    ],
  },
  {
    title: "Feedbacks",
    path: "/feedbacks",
    icon: <MdIcons.MdOutlineFeedback />,
  },
  {
    title: "Release Schedule",
    path: "/release-schedule",
    icon: <MdIcons.MdOutlineCalendarMonth />,
  },
  {
    title: "Reports",
    path: "",
    icon: <MdIcons.MdOutlineAnalytics />,
    iconClosed: <MdIcons.MdArrowDropDown />,
    iconOpened: <MdIcons.MdOutlineArrowDropUp />,
    SubMenuItems: [
      {
        title: "Customer Licenses",
        path: "/reports/customer-license-overview",
        icon: <MdIcons.MdOutlineAnalytics />,
      },
      {
        title: "Descripancy Summary",
        path: "/reports/lic-count-descripancies",
        icon: <MdIcons.MdOutlineAnalytics />,
      },
      {
        title: "Seat Growth Summary",
        path: "/reports/seat-upgrade-summary",
        icon: <MdIcons.MdOutlineAnalytics />,
      },
      {
        title: "Issue Reports",
        path: "/reports/issue-report-summary",
        icon: <MdIcons.MdOutlineAnalytics />,
      },
    ],
  },
  {
    title: "Help and Support",
    path: "/help",
    icon: <MdIcons.MdHelpOutline />,
  },
];
