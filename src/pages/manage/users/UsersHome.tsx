import { Grid, GridColumn as Column, GridPageChangeEvent, GridCustomCellProps, GridToolbar } from "@progress/kendo-react-grid";
import { PortalUserService } from "../../../services/users-service";
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
  const pathEdit = "/manage/users/edit/" + props.children;
  const pathDelete = "/manage/users/delete/" + props.children;

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
          <LinkEdit title="Edit this user"></LinkEdit>
        </NavLink>
        <NavLink to={pathDelete}>
          <LinkDelete title="Delete this user"></LinkDelete>
        </NavLink>
      </div>
    </td>
  );
};

const UsersHome = () => {
  const [data, setData] = useState(PortalUserService.getInstance().getUsers());
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
          field: "FirstName",
          operator: "equals",
          value: value,
        },
        {
          field: "LastName",
          operator: "contains",
          value: value,
        },
        {
          field: "Email",
          operator: "contains",
          value: value,
        },
      ],
    };
    console.log(data);
    setData(filterBy(PortalUserService.getInstance().getUsers(), filter));
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
        <p style={{ fontSize: 32, margin: 10, alignSelf: "center" }}>Portal Users</p>
        <Grid
          style={{
            height: "100%",
            marginInline: "5px",
            marginTop: "2px",
          }}
          data={data.slice(skip, skip + take)}
          dataItemKey={"PortalUserId"}
          groupable={true}
          sortable={true}
          resizable={true}
          pageable={true}
          skip={skip}
          take={take}
          total={PortalUserService.getInstance().getUsers().length}
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
                <NavLink to="/manage/users/new" replace>
                  <Button themeColor={"primary"}>New Portal User</Button>
                </NavLink>
              </div>
            </div>
          </GridToolbar>
          <Column field="FirstName" title="First Name" width="250px" />
          <Column field="LastName" title="Last Name" width="250px" />
          <Column field="FullName" title="Full Name" width="350px" />
          <Column field="Email" title="Email" width="300px" /*cell={BooleanCellComponent-TODO}*/ />
          <Column width="200px" field="PortalUserId" title=" " cells={{ data: commands }} />
        </Grid>
      </div>
    </div>
  );
};

export default UsersHome;
