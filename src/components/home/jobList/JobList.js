import React from 'react';
import GridJobCard from '../../common/card/GridJobCard.js';
import VerticalJobCard from '../../common/card/VerticalJobCard.js';
import ClassNames from 'classnames';
import {
  JobCardMode
} from '../../common/card/Const.js';


export default class JobList extends React.Component {

  getOpeningListClassNames() {
    return ClassNames(
      "opening-list",
      this.props.listStyleMode
    );
  }

    render () {
        return (<div>
            <ul className={this.getOpeningListClassNames()}>
                {
                    this.props.data.map((item, index) => {
                        return (<li key={index} className="list-item">
                            {
                                this.props.listStyleMode === JobCardMode.VERTICAL ? 
                                <VerticalJobCard title={item.name}
                                    location={item.locationCity + ', ' + item.locationCountry}
                                    isHot={item.urgent === 'Y'} 
                                    department={item.teamRoleStr} 
                                    id={item.id} mode={this.props.listStyleMode} color={item.colorCode} teamRoleShortName={item.teamRoleShortName} />
                                : <GridJobCard title={item.name}
                                    location={item.locationCity + ', ' + item.locationCountry}
                                    isHot={item.urgent === 'Y'} 
                                    department={item.teamRoleStr} 
                                    id={item.id} mode={this.props.listStyleMode} color={item.colorCode} />
                            }
                        </li>);
                    })
                }
            </ul>
        </div>);
    }
}

JobList.propTypes = {
  data: React.PropTypes.array,
  listStyleMode: React.PropTypes.oneOf([JobCardMode.VERTICAL, JobCardMode.GRID])
};
