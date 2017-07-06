import React, {PropTypes} from 'react';
import TextInput from '../common/forms/TextInput';
import validator from  'validator';
import uploadImg from './add-picture.svg';

const ApplicationForm = ({job, saving, onSave, onCancel, onChange, validations, errors}) => {

    return (
        <form name="jobForm">
            <h3 className = "job-application__form-title">Please leave your contact below, we will contact as soon as possible.</h3>

            <TextInput 
                name = "firstName" 
                hassError = {errors.firstName}
                placeholder="First Name" 
                value = {job.firstName} 
                onChange = {onChange}
                 />
            <TextInput 
                name = "lastName" 
                hassError = {errors.lastName}
                placeholder="Last Name"
                value = {job.lastName}
                onChange = {onChange} />
            <TextInput 
                name = "email" 
                hassError = {errors.email}
                placeholder="Email"
                value = {job.email}
                onChange = {onChange} />
            <TextInput 
                name = "phoneNumber" 
                hassError = {errors.phoneNumber}
                placeholder="Phone Number"
                value = {job.phoneNumber}
                onChange = {onChange} />
            <TextInput 
                name = "location" 
                hassError = {errors.location}
                placeholder="Your Location"
                value = {job.location}
                onChange = {onChange}
                 />

            <div className="job-application__attachment"> Attachment: (optional)</div>
            <div className="job-form__upload">
                <label htmlFor="resume">
                    <img src={uploadImg} alt="upload"/>
                </label>
                <input className="job-form__input" type="file" id="resume" name="resume" />
            </div>

            <div className="job-application__btn-group">
                <input
                    type="button"
                    value = "Cancel"
                    className = "job-application__btn job-form__cancel"
                    onClick = {onCancel} />
                <input
                    type="submit"
                    disabled={saving}
                    value = {saving ? 'Saving...': 'Save'}
                    className = "job-application__btn job-form__submit"
                    onClick = {onSave} />
            </div>
        </form>
    );
};


ApplicationForm.propTypes  = {
    job: PropTypes.object.isRequired,
    errors: PropTypes.object,
    saving: PropTypes.bool,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    validations: PropTypes.array
};


export default ApplicationForm;