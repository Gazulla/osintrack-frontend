import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function NarrativeCard({ narrative }) {
  const { _id, title, description, image } = narrative;
  return (
    <Card className="py-3" isPressable>
      <Link to={`narratives/${_id}`}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">{title}</h4>
          <small className="text-default-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">{description}</small>
        </CardHeader>
        <CardBody className="flex overflow-visible py-2">
          <Image alt={title} className="object-cover rounded-xl aspect-video" src={image} width={"100%"} />
        </CardBody>
      </Link>
    </Card>
  );
}
