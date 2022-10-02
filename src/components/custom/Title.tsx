import { Typography, Unstable_Grid2 } from "@mui/material";

interface Props {
  title: string;
}

export function Title(props: Props) {
  return (
    <Unstable_Grid2 xs={12} paddingX={3} paddingY={6}>
      <Typography variant="h2" align="center">
        {props.title}
      </Typography>
    </Unstable_Grid2>
  );
}
