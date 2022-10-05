import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";
import NextLink from "next/link";

interface Props {
  application: any;
}

export default function ApplicationCard(props: Props) {
  const appLink = `/desenvolvedor/aplicativos/${props.application.id}`;
  const router = useRouter();

  return (
    <Card>
      <NextLink href={appLink} passHref>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5" component="div">
              <Typography variant="h6" component="span" color="secondary">
                #{props.application.id}
              </Typography>{" "}
              {props.application.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );
}
