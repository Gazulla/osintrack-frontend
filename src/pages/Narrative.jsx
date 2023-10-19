/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Divider, Image, Tab, Tabs } from "@nextui-org/react";
import TelegramGroupsTable from "../components/TelegramGroupsTable";

import NarrativeUpdate from "../components/NarrativeUpdate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { narrativeDetails } from "../actions/narrativeActions";
import Loading from "../components/Loading";
import NarrativeDelete from "../components/NarrativeDelete";

export default function Narrative() {
  const [loadingPage, setLoadingPage] = useState(true);
  const { narrativeId } = useParams();
  const { loading: loadingData, error, narrative } = useSelector((state) => state.narrativeDetails);
  const { title, description, image } = narrative;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(narrativeDetails({ narrativeId }));
    setLoadingPage(false);
  }, []);

  if (loadingPage || loadingData) {
    return (
      <div className="flex items-center w-full justify-center m-5">
        <Loading color="primary" labelColor="primary" />
      </div>
    );
  }
  if (error) {
    return <Navigate to={"/404"} replace />;
  }

  return (
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
  );
}
