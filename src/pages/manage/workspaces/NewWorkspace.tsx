import { Form, Field, FormElement, FieldWrapper } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { NavLink } from "react-router-dom";
const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = (value: string) => (emailRegex.test(value) ? "" : "Please enter a valid email.");
const EmailInput = (fieldRenderProps: any) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div className="k-form-field-wrap">
      <Input {...others} labelClassName={"k-form-label"} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

function NewWorkspace() {
  const handleSubmit = (dataItem: any) => alert(JSON.stringify(dataItem, null, 2));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        //alignItems: "center",
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
        <p style={{ fontSize: "32px", marginBottom: "15px", alignSelf: "center" }}>New Workspace</p>
        <Form
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

export default NewWorkspace;
