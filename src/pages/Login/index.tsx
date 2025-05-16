import FormTextField from "@components/form/inputs/FormTextField";
import { Button, Grid, Paper, Typography } from "@mui/material";
import FormPasswordField from "./PasswordField";
import { useLogin } from "./useLogin";
import ChartLogo from "@assets/chart-icon.svg";
import CustomDrawImage from "@components/CustomDrawImage";

const Login = () => {
  const { control, handleSubmit, isLoading, isValid } = useLogin();

  return (
    <Grid
      container
      onSubmit={handleSubmit}
      height="100%"
      spacing={2}
      component="form"
    >
      <Grid
        container
        sx={(theme) => ({ background: theme.palette.primary.main })}
        size={{ md: 6 }}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid container spacing={3} alignItems='center'>
          <Grid>
            <Typography variant="h1">$</Typography>
          </Grid>
          <Grid>
            <CustomDrawImage
              image={ChartLogo}
              alt="finance-logo"
              width='100%'
              height='100%'
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        size={{ md: 6 }}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          component={Paper}
          spacing={2}
          justifyContent="center"
          padding={10}
          elevation={5}
        >
          <Grid>
            <Typography variant="h6" fontWeight="bold">
              Login
            </Typography>
          </Grid>
          <Grid size={12}>
            <FormTextField
              id="user-field"
              label="Usuário"
              control={control}
              name="email"
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <FormPasswordField
              id="password-field"
              label="Senha"
              control={control}
              name="password"
              fullWidth
            />
          </Grid>
          <Grid>
            <Button
              loading={isLoading}
              id="login-button"
              type="submit"
              variant="contained"
              disabled={!isValid}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
