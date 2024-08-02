import React, { useState, useEffect } from "react";
import "./todo.css";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ImCross } from "react-icons/im";



function updateModal() {
  const [updateModal, setUpdateModal] = useState(false);

//   const activateUpdateModal = (tasks) => {
//     setCurrentTask(tasks);
//     setUpdateModal(true);
//   };

  return (
    <div>
      {updateModal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modalContent">
            <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  disablePast
                //   name="taskDate"
                  //   value={currentTask.taskDate}
                  //   onChange={handleDateChange}
                />
              </LocalizationProvider>
              <TextField
                id="filled-basic"
                label="Task name"
                variant="filled"
                // name="taskName"
                // value={currentTask.taskName}
                // onChange={handleChange}
              />
              <br />
              <br />
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Importance
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                //   name="importance"
                //   value={currentTask.importance}
                //   onChange={handleImportanceChange}
                >
                  <FormControlLabel
                    value="very"
                    control={<Radio />}
                    label="Very"
                  />
                  <FormControlLabel
                    value="slightly"
                    control={<Radio />}
                    label="Slightly"
                  />
                  <FormControlLabel
                    value="average"
                    control={<Radio />}
                    label="Average"
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <Button variant="outlined">
                ADD TASK
              </Button> */}
            </Box>
            <div className="closeModal">
              <ImCross  />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default updateModal;
