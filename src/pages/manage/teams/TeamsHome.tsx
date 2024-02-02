import { Grid, GridColumn as Column, GridPageChangeEvent, GridCustomCellProps, GridToolbar } from "@progress/kendo-react-grid";
import { TeamsService } from "../../../services/team-service";
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
      {props.children === "0" ? <span></span> : <NavLink to={"/manage/agents/"}>{props.children}</NavLink>}
    </td>
  );
};

const commands = (props: GridCustomCellProps) => {
  console.log(props);
  const pathEdit = "/manage/teams/edit/" + props.dataItem.TeamId;
  const pathDelete = "/manage/teams/delete/" + props.dataItem.TeamId;

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
          <LinkEdit title="Edit this team"></LinkEdit>
        </NavLink>
        <NavLink to={pathDelete}>
          <LinkDelete title="Delete this team"></LinkDelete>
        </NavLink>
      </div>
    </td>
  );
};

const TeamsHome = () => {
  const [data, setData] = useState(TeamsService.getInstance().getTeams());
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
          field: "Name",
          operator: "contains",
          value: value,
        },
      ],
    };

    setData(filterBy(TeamsService.getInstance().getTeams(), filter));
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
        <p style={{ fontSize: 32, margin: 10, alignSelf: "center" }}>Teams</p>
        <Grid
          style={{
            height: "100%",
            marginInline: "5px",
            marginTop: "2px",
          }}
          data={data.slice(skip, skip + take)}
          dataItemKey={"TeamId"}
          groupable={true}
          sortable={true}
          resizable={true}
          pageable={true}
          skip={skip}
          take={take}
          total={TeamsService.getInstance().getTeams().length}
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
                <NavLink to="/manage/teams/new" replace>
                  <Button themeColor={"primary"}>New Team</Button>
                </NavLink>
              </div>
            </div>
          </GridToolbar>
          <Column field="Name" title="Name" width="250px" />
          <Column field="WorkspaceId" title="Workspace" width="250px" />
          <Column field="Agents" title="Agents" width="80px" cells={{ data: CustomCell }} />
          <Column width="200px" field="TeamId" title=" " cells={{ data: commands }} />
        </Grid>
      </div>
    </div>
  );
};

export default TeamsHome;
