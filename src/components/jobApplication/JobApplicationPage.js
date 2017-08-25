import React, {
  Component,
  PropTypes
} from 'react';
import ApplicationForm from './ApplicationForm';
import validator from 'validator';
import { getFileType, getFileSizeInMb, fileIsNotValid } from '../../utils';
import { submitJob } from '../../api/api';
import { browserHistory } from 'react-router';
import './JobApplication.less';
import { getCurrentJOb } from '../../services';

class JobApplicationPage extends Component {

  constructor(props) {
    super(props);
    this.fields = ['firstName', 'lastName', 'email', 'phoneNumber', 'location'];
    this.job  = getCurrentJOb();
    this.submitForm = this.submitForm.bind(this);
    this.updateForm = this.updateForm.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.validate = this.validate.bind(this);
    this.removeAttachment = this.removeAttachment.bind(this);

    document.title = 'Apply';

    this.state = {
      job: {},
      errors: {},
      upload: {}
    };

    this._init();
  }

  _init() {
    const {
      errors,
      job
    } = this.state;

    for (const f of this.fields) {
      job[f] = '';
      errors[f] = false;
    }
  }

  async submitForm(event) {
    event.preventDefault();
    if (this.formIsValid()) {
      return;
    }

    let query = `jobId=${this.props.params.id}`;
    for (const f of this.fields) {
      query += `&${f}=${this.state.job[f]}`;
    }

    const response =  await submitJob(query, this.state.upload.formData);
    alert(response.errorMessage);
    browserHistory.push('/');
  }

  removeAttachment(e) {
    e.preventDefault();
    this.setState({upload: {}});
  }

  goToJobDetailsPage() {
    browserHistory.goBack();
  }

  validate(e) {
    this.validateInput(e.target.name);
  }

  validateInput(input) {

    const {
      errors,
      job
    } = this.state;

    const value  = job[input];
    const rules = {
      isEmpty: () =>  validator.isEmpty(value),
      isNotNumeric: () => !validator.isNumeric(value),
      isNotEmail: () => !validator.isEmail(value)
    };

    const fields = {
      firstName: rules.isEmpty,
      lastName: rules.isEmpty,
      email: rules.isNotEmail,
      phoneNumber: rules.isNotNumeric,
      location: rules.isEmpty
    };

    errors[input] = fields[input](value);
    this.setState(errors);
  }


  formIsValid() {
    let hasErrors = false;

    const {
      job,
      errors
    } = this.state;

    for(const field of this.fields) {
      this.validateInput(field);
    }

    for (let prop in errors) {
      if (errors[prop] === true) {
        hasErrors = true;
        break;
      }
    }
    return hasErrors;
  }

  updateForm(event) {
    const field = event.target.name;
    const {
      job
    } = this.state;
    job[field] = event.target.value;
    return this.setState({
      job: job
    });
  }

  uploadFile(e) {
    let el = e.target;
    let file = el.files[0];

    if (fileIsNotValid(file.type)) {
      alert('Invalid file type');
      return;
    }

    if (file.size > 5283920) {
      alert('File size above 5mb');
      return;
    }

    let data = new FormData();
    data.append('attachmentFile', file);

    const upload  = {
      name: file.name,
      size: getFileSizeInMb(file.size),
      type: getFileType(file.type),
      formData : data
    };
    this.setState({upload});
  }

  render() {
    return (
      <div className="job-application">
        <div className="job-application__header job-application__wrapper">
          <span className="job-application__apply">Apply for</span>
          <h1 className="job-application__title">{this.job.name}</h1>
        </div>
        <div className="job-application__wrapper">
          <ApplicationForm
            onChange = {this.updateForm}
            job = {this.state.job}
            onSave = {this.submitForm}
            onCancel = {this.goToJobDetailsPage}
            errors = {this.state.errors}
            validateForm={this.validate}
            onFileUpload= {this.uploadFile}
            file={this.state.upload}
            removeAttachment={this.removeAttachment} />
        </div>
      </div>
    );
  }
}

JobApplicationPage.propTypes = {
  params: PropTypes.object.isRequired
};

export default JobApplicationPage;
