import React from 'react';
import GridWithApplyButtonJobCard from '../common/card/GridWithApplyButtonJobCard';
import {JobCardMode} from '../common/card/Const.js';

export default class JobDetailPage extends React.Component {

    constructor (props) {
        super(props);

        this.seeMoreWork = this.seeMoreWork.bind(this);

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

    async componentDidMount () {
        let url = "http://ec2-54-223-52-104.cn-north-1.compute.amazonaws.com.cn:8081/wechat/talent/acquisition/jobs/detail?jobId=" + this.props.params.id

        let data = await (await fetch(url)).json();
        if (data.returnCode === "1") return
        this.setState(
            {
                jobDetailData: data.dto
            }
        );
    }

    seeMoreWork () {
        window.location.href = "/";
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
                    <div className="link green" onClick={this.seeMoreWork}>SEE MORE WORK SIMULAR >></div>
                </div>
            </div>            
        );
    }
}

JobDetailPage.propTypes = {
    params: React.PropTypes.object
};
