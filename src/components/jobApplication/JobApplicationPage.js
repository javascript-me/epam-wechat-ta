import React, {Component} from 'react';
import ApplicationForm from './ApplicationForm';
import validator from 'validator';

import './JobApplication.less';

class JobApplicationPage  extends Component{

    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        this.updateForm = this.updateForm.bind(this);

        document.title = 'Apply';

        this.state = {
            job: {},
            errors: {}
        };

        this._init();
    }

    _init () {
        const fields  = ['firstName', 'lastName', 'email','phoneNumber','location', 'resume'];
        const {errors, job } = this.state;
        
        for(const f of fields) {
            job[f] = '';
            errors[f] = false;
        }
    }

    submitForm(event) {
        event.preventDefault();
       if(this._validateForm()) {
            return ;
       }
    }

    cancelForm() {

    }

    _validateForm() {
        let hasErrors  = false;

        const { job, errors } = this.state;

        errors.firstName = validator.isEmpty (job.firstName);
        errors.lastName = validator.isEmpty(job.lastName);
        errors.location = validator.isEmpty(job.location);
        errors.email = !validator.isEmail(job.email);
        errors.phoneNumber = !validator.isNumeric(job.phoneNumber);

        for(let prop in errors) {
            if (errors[prop] === true) {
                hasErrors =  true;
                break;
            }
        } 

        this.setState({errors: errors});

        return hasErrors;
    }   

    updateForm(event) {
        const field  = event.target.name;
        const { job } = this.state;
        job[field] = event.target.value;
        return this.setState({job: job});
    }


    render() {
        return (
            <div className="job-application">
                <div className="job-application__header job-application__wrapper">
                    <span className="job-application__apply">Apply for</span>
                    <h1 className="job-application__title">lead accountact</h1>
                </div>
                <div className="job-application__wrapper">
                    <ApplicationForm
                        onChange = {this.updateForm} 
                        job = {this.state.job}
                        onSave = {this.submitForm}
                        onCancel = {this.cancelForm}
                        errors = {this.state.errors} />
                </div>
                
            </div>
        );
    }
}

export default JobApplicationPage;