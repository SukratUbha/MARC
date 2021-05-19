import React, {Component} from 'react';


export default class course_empty extends Component{
    
    render() {
        console.log(this.props.dataFromParent)
        return (
            <React.Fragment>
                <div>
                    <h1 className="cRightTitle">
                        {(this.props.dataFromParent || {}).firstName + " " +
                        (this.props.dataFromParent || {}).lastName}
                    </h1>
                </div>
                <div className="coordinatorTab">
                    <h5>
                        UPI: {(this.props.dataFromParent || {}).upi}
                    </h5>
                    <h5>
                        Email: {(this.props.dataFromParent || {}).email}
                    </h5>
                    <div>
                        <h6>
                            Total hours: {(this.props.dataFromParent || {}).total_hours} hours
                        </h6>
                        <br/>
                    </div>
                </div>
                <div>
                    <h6>
                        createdAt: {(this.props.dataFromParent || {}).createdAt}
                    </h6>
                    <h6>
                        updatedAt: {(this.props.dataFromParent || {}).updatedAt}
                    </h6>
                </div>
            </React.Fragment>
            )}
    
}