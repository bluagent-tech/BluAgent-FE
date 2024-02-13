import React from "react";
import Loading from "../../components/Loading";

function LoadingTag() {                               
    return (
        <div className="col-sm-12">
            <div className="container-fluid d-flex justify-content-center">
                <Loading />
            </div>
        </div>
    )
}

export default LoadingTag;
