import { Form, Field, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { NavLink, useParams } from "react-router-dom";
import { TeamsService } from "../../../services/team-service";
import { useState } from "react";
import { BiError } from "react-icons/bi";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

function EditTeam() {
  const params = useParams();
  const [popupVisible, setPopupVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const targetTeam = TeamsService.getInstance().getTeamById(parseInt(params["teamId"]!));

  if (!targetTeam) {
    return (
      <>
        <BiError>Oops! something went wrong</BiError>
      </>
    );
  }

  const handleSubmit = (dataItem: any) => {
    TeamsService.getInstance().updateTeam(dataItem.TeamId);
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
          <NavLink to={"/manage/teams"}>
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
        <p style={{ fontSize: "32px", marginBottom: "15px", alignSelf: "center" }}>New Team</p>
        <Form
          initialValues={targetTeam}
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
                    <Field name={"Name"} component={Input} labelClassName={"k-form-label"} label={"Team Name:"} />
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
        <NavLink to="/manage/teams" style={{ marginTop: "10px" }}>
          Back to teams
        </NavLink>
      </div>
    </div>
  );
}

export default EditTeam;
