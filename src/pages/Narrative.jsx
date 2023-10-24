/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Divider, Image, Tab, Tabs } from "@nextui-org/react";
import TelegramGroupsTable from "../components/TelegramGroupsTable";

import NarrativeUpdate from "../components/NarrativeUpdate";
import { useSelector } from "react-redux";
import { narrativeDetails } from "../actions/narrativeActions";
import NarrativeDelete from "../components/NarrativeDelete";
import LoadingWrapper from "../components/LoadingWrapper";

export default function Narrative() {
  const { narrativeId } = useParams();
  const { loading: loadingData, error, narrative } = useSelector((state) => state.narrativeDetails);
  const { title, description, image } = narrative;

  if (error) {
    return <Navigate to={"/404"} replace />;
  }

  return (
    <LoadingWrapper dispatchFunction={narrativeDetails} loadingData={loadingData} dispatchParams={{ narrativeId }}>
      <Card className="m-3">
        <CardHeader className="flex gap-3">
          <Image alt={title} radius="sm" src={image} width={80} height={60} className="object-cover rounded-xl aspect-video" />
          <div className="flex flex-col">
            <h2 className="flex gap-2 text-xl font-bold items-center">
              <span>{title}</span>
              <NarrativeUpdate narrative={narrative} />
              <NarrativeDelete narrative={narrative} />
            </h2>
            <p className="text-md text-default-600">{description}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Tabs variant="solid" aria-label="Narrative sections" color="primary">
            <Tab key="Report" title="Report">
              Report
            </Tab>
            <Tab key="Sources" title="Sources">
              <TelegramGroupsTable />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </LoadingWrapper>
  );
}
