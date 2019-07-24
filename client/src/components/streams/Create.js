import React from "react";
import { Field, reduxForm } from "redux-form";

class Create extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const className = `field${meta.error && meta.touched ? " error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" className="ui error" />
        {meta.touched && <div className="ui error message">{meta.error}</div>}
      </div>
    );
  };

  onSubmit = formValues => console.log(formValues);
  onSubmittt = formValues => console.log(formValues);

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) errors.title = "You must enter a title.";
  if (!formValues.description) errors.description = "You must enter a description.";

  return errors;
};

export default reduxForm({
  form: "createStream",
  validate
})(Create);
