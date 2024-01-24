import React from "react";
import * as MdIcons from "react-icons/md";

export interface NavItem {
  title: string;
  path: string;
  icon: React.JSX.Element;
  subMenuItems?: NavItem[];
}

export const SidebarData: NavItem[] = [
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
    subMenuItems: [
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

    subMenuItems: [
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
