import { Text } from "@chakra-ui/react";
import { Card } from "components/custom/card/Card";
import CardTitle from "components/custom/card/CardTitle";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, MouseEventHandler } from "react";

interface Props {
  application: any;
}

export default function ApplicationCard(props: Props) {
  const appLink = `/desenvolvedor/aplicativos/${props.application.id}`;
  const router = useRouter();

  const clickLink = () => {
    router.push(appLink);
  };
  return (
    <a
      href={appLink}
      onClick={(ev) => {
        if (!ev.ctrlKey) {
          ev.preventDefault();
          clickLink();
        }
      }}
    >
      <Card
        slot_title={
          <CardTitle>
            <Text as="span" color="text-secondary" fontSize="md">
              #{props.application.id}
            </Text>
            <Text as="span" marginLeft="2">
              {props.application.name}
            </Text>
          </CardTitle>
        }
      ></Card>
    </a>
  );
}
