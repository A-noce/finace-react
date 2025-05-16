import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useTracked } from "zustand-x";
import userStore from "@store/userStore";

const NotFound = () => {
  const navigate = useNavigate();
  const isLogged = useTracked(userStore, "isLogged");
  const handleGoBack = () => {
    navigate(isLogged ? "/home" : "/login");
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height='100%'
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        size={{xs: 8}}
        rowGap={4}
      >
        <Grid>
          <MdOutlineErrorOutline size='25vh' />
        </Grid>
        <Grid>
          <Typography variant="h3"> Págima não encontrada</Typography>
        </Grid>
        <Grid>
          <Button variant="outlined" onClick={handleGoBack}>
            Voltar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};


export default NotFound