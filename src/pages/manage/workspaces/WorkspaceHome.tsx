import { Grid, GridColumn as Column, GridPageChangeEvent, GridCustomCellProps, GridToolbar } from "@progress/kendo-react-grid";
import { WorkspacesService } from "../../../services/workspace-service";
import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { CompositeFilterDescriptor, filterBy } from "@progress/kendo-data-query";

const LinkEdit = styled(FaRegEdit)`
  margin-right: 5px;
  margin-left: 5px;
  color: #555;
  width: 16px;
  height: 16px;
  &:hover {
    color: red;
  }
`;

const LinkDelete = styled(AiOutlineDelete)`
  margin-right: 5px;
  margin-left: 5px;
  color: #555;
  width: 16px;
  height: 16px;
  &:hover {
    color: red;
  }
`;

const CustomCell = (props: GridCustomCellProps) => {
  return (
    <td
      {...props.tdProps}
      colSpan={1}
      style={{
        color: "#0000aa",
      }}
    >
      {props.children === "0" ? <span></span> : <NavLink to={"/manage/agents"}>{props.children}</NavLink>}
    </td>
  );
};

const commands = (props: GridCustomCellProps) => {
  const pathEdit = "/manage/workspaces/edit/" + props.children;
  const pathDelete = "/manage/workspaces/delete/" + props.children;

  return (
    <td
      {...props.tdProps}
      colSpan={1}
      style={{
        color: "#0000aa",
      }}
    >
      <div style={{ display: "inline-block" }}>
        <NavLink to={pathEdit}>
          <LinkEdit title="Edit this workspace"></LinkEdit>
        </NavLink>
        <NavLink to={pathDelete}>
          <LinkDelete title="Delete this workspace"></LinkDelete>
        </NavLink>
      </div>
    </td>
  );
};

const WorkspaceHome = () => {
  const [data, setData] = useState(WorkspacesService.getInstance().getWorkspaces());
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);

  const onPageChange = (e: GridPageChangeEvent) => {
    setSkip(e.page.skip);
    setTake(e.page.take);
  };

  const filterData = (e: InputChangeEvent) => {
    let value = e.target.value;
    let filter: CompositeFilterDescriptor = {
      logic: "or",
      filters: [
        {
          field: "UniqueId",
          operator: "equals",
          value: value,
        },
        {
          field: "Name",
          operator: "contains",
          value: value,
        },
        {
          field: "Enterprise",
          operator: "contains",
          value: value,
        },
        {
          field: "Site",
          operator: "contains",
          value: value,
        },
        {
          field: "BPO",
          operator: "contains",
          value: value,
        },
      ],
    };
    console.log(data);
    setData(filterBy(WorkspacesService.getInstance().getWorkspaces(), filter));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "94vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          marginInline: "5px",
          marginTop: "2px",
        }}
      >
        <p style={{ fontSize: 32, margin: 10, alignSelf: "center" }}>Workspaces</p>
        <Grid
          style={{
            height: "100%",
            marginInline: "5px",
            marginTop: "2px",
          }}
          data={data.slice(skip, skip + take)}
          dataItemKey={"WorkspaceId"}
          groupable={true}
          sortable={true}
          resizable={true}
          pageable={true}
          skip={skip}
          take={take}
          total={WorkspacesService.getInstance().getWorkspaces().length}
          onPageChange={onPageChange}
        >
          <GridToolbar>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: "10px",
                }}
              >
                <Input onChange={filterData} style={{ width: "200px" }} placeholder="Filter" />
                <NavLink to="/manage/workspaces/new" replace>
                  <Button themeColor={"primary"}>New Workspace</Button>
                </NavLink>
              </div>
            </div>
          </GridToolbar>
          <Column field="UniqueId" title="Unique ID" width="100px" />
          <Column field="Name" title="Name" width="150px" />
          <Column field="Enterprise" title="Enterprise" width="200px" />
          <Column field="BPO" title="BPO" width="200px" />
          <Column field="Site" title="Site" width="200px" /*cell={BooleanCellComponent-TODO}*/ />
          <Column field="AllocatedSeats" title="Allocated Seats" width="100px" />
          <Column field="Agents" title="Agents" width="80px" cells={{ data: CustomCell }} />
          <Column width="200px" field="WorkspaceId" title=" " cells={{ data: commands }} />
        </Grid>
      </div>
    </div>
  );
};

export default WorkspaceHome;
