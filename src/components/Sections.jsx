import React, { useReducer, useEffect } from 'react';
import axios from "axios";
import Section from "./Section";
import style from "../styles/style.module.css";

// Initial state for the data
const initState = {
    chairs: [],
    errorMessage: "",
    count: 0,
    sum: 0
}

// Reducer function to handle state changes based on actions
const reducer = (state, action) => {
    switch (action.type) {
        case "success":
            return { ...state, chairs: action.chairs };
        case "failed":
            return { ...state, errorMessage: action.error };
        case "change-state":
            return { ...state, chairs: action.chairs };
        case "calc":
            return { ...state, count: action.count, sum: action.sum };
        default:
            return state;
    }
}

// Main component representing the seating sections
const Sections = () => {
    // Using useReducer hook to manage state
    const [data, dispatch] = useReducer(reducer, initState);

    // useEffect hook for fetching data on component mount
    useEffect(() => {
        axios.get("chairs.json")
            .then((response) => {
                dispatch({
                    type: "success",
                    chairs: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: "failed",
                    error: error.message
                })
            })
    }, []);

    // Event handler for chair click
    const clickHandler = (number) => {
        switch (data.chairs[number - 1].state) {
            case "unselected":
                data.chairs[number - 1].state = "selected";
                break;
            case "selected":
                data.chairs[number - 1].state = "pending";
                break;
            case "pending":
                data.chairs[number - 1].state = "reserved";
                break;
            case "reserved":
                alert("This Chair is already reserved");
                break;
            default:
                ;
        }

        // Dispatching action to update state based on chair click
        dispatch({
            type: "change-state",
            chairs: data.chairs
        })

        // Calculating count and sum for reserved chairs
        if (data.chairs[number - 1].state === "reserved") {
            const reserved_chairs = data.chairs.filter((chair) => chair.state === "reserved");
            const count = reserved_chairs.length;
            let sum = 0;
            for (let i = 0; i < count; i++) sum += reserved_chairs[i].price;
            dispatch({
                type: "calc",
                count: count,
                sum: sum,
            })
        }
    }

    // Rendering the seating sections
    return (
        <div>
            <div className={style.stage}>Stage</div>
            <div className={style["calc-box"]}>
                {/* If count is 0, display nothing (or you can use a placeholder like null) */}
                {/* If count is 1, display "chair" */}
                {/* If count is greater than 1, display "chairs" */}
                <div>Count : {data.count === 0 ? null : data.count === 1 ? "chair" : "chairs"}</div>
                <div>Sum: {data.sum}$</div>
            </div>

            <div className={style["section-container"]} >
                <Section data={data.chairs.filter((chair) => chair.section === "B")}
                    clickHandler={clickHandler}
                    sectionStyle={style["section-b"]} />
                <Section data={data.chairs.filter((chair) => chair.section === "A")}
                    clickHandler={clickHandler}
                    sectionStyle={style["section-a"]} />
                <Section data={data.chairs.filter((chair) => chair.section === "C")}
                    clickHandler={clickHandler}
                    sectionStyle={style["section-c"]} />
            </div>
            <div>
                <Section data={data.chairs.filter((chair) => chair.section === "D")}
                    clickHandler={clickHandler}
                    sectionStyle={style["section-d"]} />
            </div>
        </div>
    );
}

// Exporting the Sections component as the default export of this module
export default Sections;
