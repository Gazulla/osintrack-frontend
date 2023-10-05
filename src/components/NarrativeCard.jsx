import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function NarrativeCard({ narrative }) {
  return (
    <Link to={`/narratives/${narrative.id}`}>
      <Card className="py-3" isPressable>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{narrative.title}</h4>
          <small className="text-default-500">{narrative.description}</small>
        </CardHeader>
        <CardBody className="flex overflow-visible py-2">
          <Image alt={narrative.title} className="object-cover rounded-xl" src={narrative.image} width={"100%"} />
        </CardBody>
      </Card>
    </Link>
  );
}
