import React from 'react';
import {Link} from 'react-router';
import GridWithApplyButtonJobCard from '../common/card/GridWithApplyButtonJobCard';
import {JobCardMode} from '../common/card/Const.js';
import {getJobDetail} from  '../../api/api';
import { setCurrentJob } from '../../services';

export default class JobDetailPage extends React.Component {

    constructor (props) {
        super(props);

        document.title = 'Job Detail';

        this.state = {
            jobDetailData: {
                name: "",
                location: "",
                isHot: true,
                department: "",
                colorCode: "",
                id: 0,
                responsibilities: "",
                requirements: "",
                description: "",
                introduction: ""
            }
        };
    }

    componentDidMount () {
      this.getJobDetail();
    }

    async getJobDetail() {
      let data  = await getJobDetail(this.props.params.id);
      setCurrentJob(data.dto);
      this.setState({jobDetailData: data.dto});
    }

    render () {
        return (
            <div className="job-detail-page">
                <GridWithApplyButtonJobCard title={this.state.jobDetailData.name}
                    location={this.state.jobDetailData.locationCity + ', ' + this.state.jobDetailData.locationCountry}
                    isHot={this.state.jobDetailData.urgent === 'Y'}
                    department={this.state.jobDetailData.department}
                    id={this.state.jobDetailData.id}
                    color={this.state.jobDetailData.colorCode}
                    mode={JobCardMode.GRID_WITH_APPLY_BUTTON} />

                <div className="job-content">
                    <div className="introduction">
                        {this.state.jobDetailData.introduction}
                    </div>
                    <div className="section-title">DESCRIPTION</div>
                    <div className="description-content">
                        {this.state.jobDetailData.description}
                    </div>

                    {
                        this.state.jobDetailData.responsibilities ?
                        <div className="section-title">RESPONSIBILITIES</div>
                        : null
                    }

                    <ul>
                        {
                            this.state.jobDetailData.responsibilities ?
                            this.state.jobDetailData.responsibilities.split('\r\n').map((item, index) => {
                                return <li key={index} className="bullet-item">
                                    <div className="bullet-icon">•</div>
                                    <div className="responsibility-text">{item}</div>
                                </li>;
                            })
                            : null
                        }
                    </ul>

                    <div className="section-title">REQUIREMENTS</div>
                    <ul>
                        {
                            this.state.jobDetailData.requirements.split('\r\n').map((item, index) => {
                                return <li key={index} className="bullet-item">
                                    <div className="bullet-icon">•</div>
                                    <div className="responsibility-text">{item}</div>
                                </li>;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

JobDetailPage.propTypes = {
    params: React.PropTypes.object
};
