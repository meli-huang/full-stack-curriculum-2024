import React from "react";

function DayCard(props) {

    return (
        <div className='day-card'>
            <p className='day-date'>{props.date}</p>
            <img src={"./icons/" + props.elem.weather[0].icon + ".svg"} 
                width={100} height={100} className='day-icon'/>
            <p className='day-temps'>{Math.trunc(props.elem.main.temp_min) + "° to " 
					+ Math.trunc(props.elem.main.temp_max) + "°"}</p>
        </div>
    );
}

export default DayCard;