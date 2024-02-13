
import React from 'react';

// class CompanyNotifications extends React.Component {
    const CompanyNotifications = () => {
    // render () {
        return (
            <div>
                <span
                    type="button"
                    // className="icon-button__badge us-dot-icon"
                    style={{
                        width: "35px",
                        height: '35px',
                        textAlign: 'center',
                        borderRadius: '50%',
                        color: 'white',
                        backgroundColor: 'red',
                        position: 'absolute',
                        right: '4px',
                        top: '-6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    // onClick={() => {
                    //     // this.props.toggleUsDotAddDocument(this.props.id);
                    // }}
                >
                    <strong>!</strong>
                </span>
            </div>
        )
    }
// }
export default CompanyNotifications;