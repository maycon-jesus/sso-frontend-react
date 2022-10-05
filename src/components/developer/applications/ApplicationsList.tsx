import { Unstable_Grid2 } from "@mui/material";
import { useRecoilValue } from "recoil";
import { useApplicationsListState } from "states/Applications";
import ApplicationCard from "./ApplicationCard";

export default function ApplicationsList() {
  const applications = useRecoilValue(useApplicationsListState);

  return (
    <Unstable_Grid2 container spacing={2}>
      {applications.map((app: any) => (
        <Unstable_Grid2 xs={12} md={6} lg={4} key={app.id}>
          <ApplicationCard application={app}></ApplicationCard>
        </Unstable_Grid2>
      ))}
    </Unstable_Grid2>
  );
}
