import { Grid, GridColumn as Column, GridPageChangeEvent, GridCustomCellProps, GridToolbar } from "@progress/kendo-react-grid";
import { AgentsService } from "../../../services/agent-service";
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

const commands = (props: GridCustomCellProps) => {
  const pathEdit = "/manage/agents/edit/" + props.dataItem.AgentId;
  const pathDelete = "/manage/agents/delete/" + props.dataItem.AgentId;

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
          <LinkEdit title="Modify this agent"></LinkEdit>
        </NavLink>
        <NavLink to={pathDelete}>
          <LinkDelete title="Delete this agent"></LinkDelete>
        </NavLink>
      </div>
    </td>
  );
};

const AgentsHome = () => {
  const [data, setData] = useState(AgentsService.getInstance().getAgents());
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
          field: "LoginId",
          operator: "contains",
          value: value,
        },
      ],
    };
    console.log(data);
    setData(filterBy(AgentsService.getInstance().getAgents(), filter));
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
        <p style={{ fontSize: 32, margin: 10, alignSelf: "center" }}>Agents</p>
        <Grid
          style={{
            height: "100%",
            marginInline: "5px",
            marginTop: "2px",
          }}
          data={data.slice(skip, skip + take)}
          dataItemKey={"AgentId"}
          groupable={true}
          sortable={true}
          resizable={true}
          pageable={true}
          skip={skip}
          take={take}
          total={AgentsService.getInstance().getAgents().length}
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
                <NavLink to="/manage/agents/new" replace>
                  <Button themeColor={"primary"}>New Agent</Button>
                </NavLink>
              </div>
            </div>
          </GridToolbar>
          <Column field="LoginId" title="Unique ID" width="150px" />
          <Column field="WorkspaceId" title="Workspace" width="250px" />
          <Column field="TeamId" title="Team" width="250px" />
          <Column width="200px" field="AgentId" title=" " cells={{ data: commands }} />
        </Grid>
      </div>
    </div>
  );
};

export default AgentsHome;
