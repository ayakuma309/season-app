import React from "react";
import Box from "@mui/material/Box";
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";

type Props = {
    title: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
};

const SelectAnswer: React.FC<Props> = ({ title, value, setValue }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };
    return (
        <Box p={2}>
            {title}
            <br />
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                </RadioGroup>
            </FormControl>
            <hr />
        </Box>
    );
};

export default SelectAnswer;
