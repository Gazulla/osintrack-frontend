/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, Divider, Image, Tab, Tabs } from "@nextui-org/react";
import TelegramGroupsTable from "../components/TelegramGroupsTable";

import NarrativeUpdate from "../components/NarrativeUpdate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { narrativeDetails } from "../actions/narrativeActions";

export default function Narrative() {
  const { narrativeId } = useParams();
  const { title, description, image } = useSelector((state) => state.narrativeDetails.narrative);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(narrativeDetails({ narrativeId }));
  }, []);

  return (
    <Card className="m-3">
      <CardHeader className="flex gap-3">
        <Image alt={title} radius="sm" src={image} width={80} height={60} />
        <div className="flex flex-col">
          <h2 className="flex gap-2 text-xl font-bold items-center">
            <span>{title}</span>
            <NarrativeUpdate />
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
