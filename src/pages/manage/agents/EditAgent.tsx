import { Form, Field, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { NavLink, useParams } from "react-router-dom";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { TeamsService } from "../../../services/team-service";
import { WorkspacesService } from "../../../services/workspace-service";
import { AgentsService } from "../../../services/agent-service";

const workspaces = WorkspacesService.getInstance().getWorkspaces();
const teams = TeamsService.getInstance().getTeams();

function EditAgent() {
  const params = useParams();

  const agent = AgentsService.getInstance().getAgentById(parseInt(params["agentId"]!));

  const handleSubmit = (dataItem: any) => alert(JSON.stringify(dataItem, null, 2));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        marginInline: "5px",
        marginTop: "2px",
        backgroundColor: "#f1f1f1",
      }}
    >
      <div
        style={{
          backgroundColor: "#fafafa",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          width: "650px",
        }}
      >
        <p style={{ fontSize: "32px", marginBottom: "15px", alignSelf: "center" }}>Edit Agent - {agent?.LoginId}</p>
        <Form
          initialValues={agent}
          onSubmit={handleSubmit}
          render={(formRenderProps) => (
            <FormElement
              style={{
                maxWidth: 650,
              }}
            >
              <fieldset className={"k-form-fieldset"}>
                <legend>Enter the details. All the fields are manadatory.</legend>

                <FieldWrapper>
                  <div className="k-form-field-wrap">
                    <Field name={"LoginId"} component={Input} labelClassName={"k-form-label"} label={"Login ID"} />
                  </div>
                </FieldWrapper>

                <FieldWrapper>
                  <div className="k-form-field-wrap">
                    <Field name={"Password"} component={Input} labelClassName={"k-form-label"} label={"Password"} />
                  </div>
                </FieldWrapper>

                <FieldWrapper>
                  <div className="k-form-field-wrap">
                    <DropDownList
                      style={{
                        width: "300px",
                      }}
                      data={workspaces}
                      value={workspaces.length == 1 ? workspaces[0] : null}
                      label="Select a workspace"
                      textField="Name"
                      dataItemKey="WorkspaceId"
                    />
                  </div>
                </FieldWrapper>

                <FieldWrapper>
                  <div className="k-form-field-wrap">
                    <DropDownList
                      style={{
                        width: "300px",
                      }}
                      data={teams}
                      value={workspaces.length == 1 ? workspaces[0] : null}
                      label="Select a workspace"
                      textField="Name"
                      dataItemKey="WorkspaceId"
                    />
                  </div>
                </FieldWrapper>
              </fieldset>
              <div className="k-form-buttons">
                <button
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                  disabled={!formRenderProps.allowSubmit}
                >
                  Submit
                </button>
              </div>
            </FormElement>
          )}
        />
        <NavLink to="/manage/agents" style={{ marginTop: "10px" }}>
          Back
        </NavLink>
      </div>
    </div>
  );
}

export default EditAgent;
