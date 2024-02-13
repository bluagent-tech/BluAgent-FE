import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const QuestionTooltip = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div>
            <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample">?</span>
            <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
                {props.message}
            </Tooltip>
        </div>
    );
}

export default QuestionTooltip;