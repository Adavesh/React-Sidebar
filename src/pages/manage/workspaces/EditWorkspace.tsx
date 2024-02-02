import { Form, Field, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { NavLink, useParams } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { useState } from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { WorkspacesService } from "../../../services/workspace-service";

function EditWorkspace() {
  const params = useParams();
  const [popupVisible, setPopupVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const workspace = WorkspacesService.getInstance().getWorkspaceById(parseInt(params["workspaceId"]!));

  if (!workspace) {
    return (
      <>
        <BiError>Oops! something went wrong</BiError>
      </>
    );
  }

  const handleSubmit = (dataItem: any) => {
    WorkspacesService.getInstance().updateWorkspace(dataItem);
    setStatusMessage("Workspace details updated successfully.");
    setPopupVisible(true);
  };

  if (popupVisible && statusMessage.length > 0) {
    return (
      <Dialog title={"Operation Result"} onClose={() => {}}>
        <p
          style={{
            margin: "25px",
            textAlign: "center",
          }}
        >
          {statusMessage}
        </p>
        <DialogActionsBar>
          <NavLink to={"/manage/workspaces"}>
            <Button>Ok</Button>
          </NavLink>
        </DialogActionsBar>
      </Dialog>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        width: "100%",
        marginInline: "5px",
        marginTop: "2px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          minWidth: "650px",
        }}
      >
        <h1 style={{ fontSize: "18px", marginBottom: "5px" }}>Modify {workspace.Name}</h1>

        <Form
          initialValues={workspace}
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
                    <Field name={"UniqueId"} component={Input} labelClassName={"k-form-label"} label={"Unique Id"} />
                  </div>
                </FieldWrapper>

                <FieldWrapper>
                  <div className="k-form-field-wrap">
                    <Field name={"Name"} component={Input} labelClassName={"k-form-label"} label={"Friendly Name"} />
                  </div>
                </FieldWrapper>

                <FieldWrapper>
                  <div className="k-form-field-wrap">
                    <Field name={"Enterprise"} component={Input} labelClassName={"k-form-label"} label={"Enterprise"} />
                  </div>
                </FieldWrapper>

                <FieldWrapper>
                  <div className="k-form-field-wrap">
                    <Field name={"BPO"} component={Input} labelClassName={"k-form-label"} label={"BPO"} />
                  </div>
                </FieldWrapper>

                <FieldWrapper>
                  <div className="k-form-field-wrap">
                    <Field name={"Site"} component={Input} labelClassName={"k-form-label"} label={"Site"} />
                  </div>
                </FieldWrapper>

                <FieldWrapper>
                  <div className="k-form-field-wrap">
                    <Field name={"AllocatedSeats"} component={Input} labelClassName={"k-form-label"} label={"Allocated Seats"} />
                  </div>
                </FieldWrapper>

                {/* <FieldWrapper>
                <Field name={"enterprise"} type={"email"} component={EmailInput} label={"Enterprise"} validator={emailValidator} />
              </FieldWrapper> */}
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
        <NavLink to="/manage/workspaces" style={{ marginTop: "10px" }}>
          Back to workspaces
        </NavLink>
      </div>
    </div>
  );
}

export default EditWorkspace;
