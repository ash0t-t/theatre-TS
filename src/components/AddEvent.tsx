import { Button, Box, Modal, TextField, MenuItem, Select } from "@mui/material";
import { useState, useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addEvent } from "../lib/api";
import { EventContext } from "../lib/Context";
import { ActionTypes } from "../lib/types";

interface Inputs {
  title: string;
  date: string;
  time: string;
  cover: string;
  composer: string;
  type: string;
}

export const AddEvent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { state, dispatch } = useContext(EventContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const handleAdd: SubmitHandler<Inputs> = async (data) => {
    try {
      const newEvent = await addEvent(data);
      dispatch({ type: ActionTypes.addEvent, payload: newEvent });
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Can not add: ", error);
    }
  };

  return (
    <>
      <Box my={2}>
        <Button onClick={() => setOpen(true)} variant="contained">
          Add
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <form onSubmit={handleSubmit(handleAdd)}>
              <Box my={2}>
                <TextField
                  label="Title"
                  variant="outlined"
                  {...register("title", {
                    required: "Title is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/i,
                      message: "Title should contain only letters",
                    },
                  })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Box>
              <Box my={2}>
                <TextField
                  label="Date"
                  variant="outlined"
                  {...register("date", {
                    required: "Date is required",
                    pattern: {
                      value:
                        /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}$/,
                      message: "Date should be in 'Month DD' format",
                    },
                  })}
                  error={!!errors.date}
                  helperText={errors.date?.message}
                />
              </Box>
              <Box my={2}>
                <TextField
                  label="Time"
                  variant="outlined"
                  {...register("time", {
                    required: "Time is required",
                    pattern: {
                      value: /^\d{2}:\d{2}$/,
                      message: "Time should be in 'HH:MM' format",
                    },
                  })}
                  error={!!errors.time}
                  helperText={errors.time?.message}
                />
              </Box>
              <Box my={2}>
                <TextField
                  label="Composer"
                  variant="outlined"
                  {...register("composer", {
                    required: "Composer is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/i,
                      message: "Composer should be a name",
                    },
                  })}
                  error={!!errors.composer}
                  helperText={errors.composer?.message}
                />
              </Box>
              <Box my={2}>
                <TextField
                  label="Cover"
                  variant="outlined"
                  {...register("cover", { required: "Cover is required" })}
                  error={!!errors.cover}
                  helperText={errors.cover?.message}
                />
              </Box>
              <Box my={2}>
                <Select
                  sx={{ width: 200 }}
                  {...register("type", { required: "Type is required" })}
                  defaultValue=""
                >
                  <MenuItem value="" disabled>
                    Select Type
                  </MenuItem>
                  <MenuItem value="opera">Opera</MenuItem>
                  <MenuItem value="ballet">Ballet</MenuItem>
                </Select>
              </Box>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </Box>
    </>
  );
};
