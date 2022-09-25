import { Box, Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { useApplicationsListState } from "states/Applications";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationsList() {
  const applications = useRecoilValue(useApplicationsListState);

  return (
    <Flex width="full" wrap="wrap" gap={2} marginTop={6} boxSizing="border-box">
      {applications.map((app: any) => (
        <Box width="calc(33.3% - (var(--chakra-space-2)/3*2))" key={app.id}>
          <ApplicationCard application={app}></ApplicationCard>
        </Box>
      ))}
    </Flex>
  );
}
