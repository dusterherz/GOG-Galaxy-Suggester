import React from "react";
import multilineTextProps from "./MultilineText.types";
import Typography from "@material-ui/core/Typography";

function MultilineText({ text }: multilineTextProps) {
    return (
        <Typography variant='body1'>{text.split("\\n").map(function (item, idx) {
            return (
                <span key={idx}>
                    {item}
                    <br />
                </span>
            )
        })}</Typography>
    )
}

export default MultilineText;