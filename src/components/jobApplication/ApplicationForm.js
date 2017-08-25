import React, {PropTypes} from 'react';
import TextInput from '../common/forms/TextInput';
import validator from  'validator';
import classNames from 'classnames';
import uploadImg from './add-picture.svg';

const ApplicationForm = ({job,file, onSave, onCancel, onChange, validations, errors, validateForm, onFileUpload, removeAttachment}) => {

  return (
    <form name="jobForm">
      <h3 className = "job-application__form-title">Please leave your contact below, we will contact you as soon as possible.</h3>

      <TextInput
          name = "firstName"
          hassError = {errors.firstName}
          placeholder="First Name *"
          value = {job.firstName}
          onChange = {onChange}
          onBlur={validateForm} />
      <TextInput
          name="lastName"
          hassError={errors.lastName}
          placeholder="Last Name *"
          value={job.lastName}
          onChange={onChange}
          onBlur={validateForm} />
      <TextInput
          name = "email"
          hassError = {errors.email}
          placeholder="Email *"
          value = {job.email}
          onChange = {onChange}
          onBlur={validateForm} />
      <TextInput
          name = "phoneNumber"
          hassError = {errors.phoneNumber}
          placeholder="Phone Number *"
          value = {job.phoneNumber}
          onChange = {onChange}
          onBlur={validateForm} />
      <TextInput
          name = "location"
          hassError = {errors.location}
          placeholder="Your Location *"
          value = {job.location}
          onChange = {onChange}
          onBlur={validateForm} />

      <div className="job-application__attachment"> Attachment: (optional)</div>
      <div className="job-form__upload">
        <button className={classNames("job-form__close",  {'hidden': !file.name})} onClick={removeAttachment}>x</button>
        <label htmlFor="resume">
            <img src={uploadImg} alt="upload"/>
        </label>
        <input className="job-form__input" type="file" id="resume" name="resume" multiple="false" onChange={onFileUpload} />
        <div className={classNames("job-form__details",  {'hidden': !file.name})}>
          <div className={classNames("job-form__thumbnail", file.type)}></div>
          <div className="job-form__file-info">
            <span className="job-form__filename">{file.name}</span>
            <span className="job-form__filesize">{file.size}mb</span>
          </div>
        </div>

      </div>

      <div className="job-application__btn-group">
          <input
            type="button"
            value = "Cancel"
            className = "job-application__btn job-form__cancel"
            onClick = {onCancel} />
          <input
            type="submit"
            value="Submit"
            className="job-application__btn job-form__submit"
            onClick={onSave} />
      </div>
    </form>
  );
};


ApplicationForm.propTypes  = {
  job: PropTypes.object.isRequired,
  file: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  validations: PropTypes.array,
  validateForm: PropTypes.func,
  onFileUpload: PropTypes.func.isRequired,
  removeAttachment:  PropTypes.func.isRequired
};


export default ApplicationForm;
