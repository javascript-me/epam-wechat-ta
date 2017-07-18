import React from 'react';
import advertisementLogo from './banner.png';

export default class Advertisement extends React.Component {

    render () {
        return (
            <div className="advertisement">
                <img src={advertisementLogo} className="advertisement-logo" alt="advertisement logo"/>
                <div className="content">
                    <div className="big-title">EPAM: APAC</div>
                    <div className="message">Open offices. Digital challenges. </div>
                    <div className="message">Talented colleagues. </div>
                    <div className="message">Projects worth bragging about. </div>
                </div>
            </div>
        );
    }
}
