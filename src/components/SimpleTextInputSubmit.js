import * as React from 'react'
import TextField from '@mui/material/TextField'
import {Button, Grid, IconButton} from "@material-ui/core";
import {Alert} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function SimpleTextInputSubmit() {
  const [email, setEmail] = React.useState('')
  const [submittedValue, setSubmittedValue] = React.useState('')
  const [success, setSuccess] = React.useState('')
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (value) => {
    setSubmittedValue(value)
    setSuccess(true)
    setOpen(true)
  }

  const  displayMessage = (success) => {
    if (open && success && email !== '') {
      return <Alert severity="success"
                    action={
                      <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpen(false);
                          }}>
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
      >{submittedValue}</Alert>
    }
  }

  return (
      <Grid>
        {displayMessage(success)}
        <TextField label={"E-mail"}
                   variant="outlined"
                   onChange={(event) => setEmail(event.target.value)}
        />
        <Button name={"Submit"}
                type={"submit"}
                variant={"contained"}
                color={"secondary"}
                onClick={() => handleSubmit(email)}
        >SUBMIT</Button>

      </Grid>
  )
}