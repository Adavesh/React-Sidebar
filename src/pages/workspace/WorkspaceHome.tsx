import { Grid, GridColumn as Column, GridPageChangeEvent, GridCustomCellProps, GridToolbar } from "@progress/kendo-react-grid";
import workspaces from "./products.json";
import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Input, InputChangeEvent, TextBox } from "@progress/kendo-react-inputs";
import { CompositeFilterDescriptor, filterBy } from "@progress/kendo-data-query";

const WorkspaceHome = () => {
  const [data, setData] = useState(workspaces);
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
    setData(filterBy(workspaces, filter));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        width: "100%",
      }}
    >
      {/* <TextBox name="workspace" placeholder="Filter" style={{ width: "200px", marginRight: "10px" }}></TextBox>
        <Button themeColor={"primary"}>New Workspace</Button> */}

      <Grid
        style={{
          height: "93vh",
          fontSize: "8px",
        }}
        data={data.slice(skip, skip + take)}
        dataItemKey={"WorkspaceId"}
        groupable={true}
        sortable={true}
        pageable={true}
        skip={skip}
        take={take}
        total={workspaces.length}
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
                justifyContent: "space-between",
              }}
            >
              <Input onChange={filterData} style={{ width: "200px" }} placeholder="Enter filter text" />
              <Button themeColor={"primary"}>New Workspace</Button>
            </div>
          </div>
        </GridToolbar>
        <Column field="UniqueId" title="Unique ID" width="100px" />
        <Column field="Name" title="Name" width="150px" />
        <Column field="Enterprise" title="Enterprise" width="200px" />
        <Column field="BPO" title="BPO" width="200px" />
        <Column field="Site" title="Site" width="200px" /*cell={BooleanCellComponent-TODO}*/ />
        <Column field="AllocatedSeats" title="Allocated Seats" width="100px" />
        <Column field="Teams" title="Teams" width="80px" cells={{ data: CustomCell }} />
        <Column field="Agents" title="Agents" width="80px" cells={{ data: CustomCell }} />
        <Column width="200px" field="WorkspaceId" title=" " cells={{ data: commands }} />
      </Grid>
    </div>
  );
};

/*{ id: number; title: string; description: string; price: number; discountPercentage: number; rating: number; stock: number; brand: string; category: string; thumbnail: string; images: string[]; } */

export default WorkspaceHome;

const CustomCell = (props: GridCustomCellProps) => {
  return (
    <td
      {...props.tdProps}
      colSpan={1}
      style={{
        color: "#0000aa",
      }}
    >
      {props.children === "0" ? <span></span> : <NavLink to={props.field == "Teams" ? "/manage/teams" : "/manage/agents"}>{props.children}</NavLink>}
    </td>
  );
};

const commands = (props: GridCustomCellProps) => {
  const pathEdit = "/manage/workspace/edit/" + props.children;
  const pathDelete = "/manage/workspace/delete/" + props.children;

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
