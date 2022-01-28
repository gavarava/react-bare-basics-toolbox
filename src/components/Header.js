import * as React from 'react';
import {GlobalStyles} from "../global";
import {Button, Container} from "@material-ui/core";
import {Stack} from "@mui/material";

const InformationAboutPage = () => {
return  <blockquote cite={'https://www.allgreatquotes.com/quote-345784/'}>
    Demo Library for various React components
  </blockquote>
}

function Header({headerButtonAction, headerButtonValue}) {
  return (
      <section>
        <h1>Demo</h1>
        <GlobalStyles/>
        <InformationAboutPage/>
        <Container maxWidth="sm">
          <Stack spacing={5} sx={{ width: 300 }}>
            <Button name={"Submit"} type={"reset"} variant={"contained"}
                    color={"primary"} onClick={headerButtonAction}>{headerButtonValue}</Button>
          </Stack>
        </Container>
      </section>
  )
}

export default Header;
