import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function NarrativeCard() {
  return (
    <Card className="py-3" isPressable>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">Narrative Title</h4>
        <small className="text-default-500">Narrative description</small>
      </CardHeader>
      <CardBody className="flex overflow-visible py-2">
        <Image alt="Narrative image" className="object-cover rounded-xl" src="/images/hero-card-complete.jpeg" width={"100%"} />
      </CardBody>
    </Card>
  );
}
