import { Card, CardBody, CardHeader, Divider, Image, Tab, Tabs, Tooltip } from "@nextui-org/react";
import TelegramGroupsTable from "../components/TelegramGroupsTable";
import { ConfigIcon } from "../assets/svg/ConfigIcon";

export default function Narrative() {
  return (
    <Card className="m-3">
      <CardHeader className="flex gap-3">
        <Image alt="Pro Russia" radius="sm" src="/images/russia.png" width={80} height={60} />
        <div className="flex flex-col">
          <h2 className="flex gap-2 text-xl font-bold items-center">
            <span>Pro Russia</span>
            <Tooltip content="Config narrative settings">
              <span className="cursor-pointer">
                <ConfigIcon width={18} />
              </span>
            </Tooltip>
          </h2>
          <p className="text-md text-default-600">Russian narratives used in war</p>
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
