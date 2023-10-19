/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "../assets/svg/ArrowLetfIcon";

export default function Page404() {
  return (
    <Card className="m-3 p-3">
      <h1 className="text-2xl">404 - Page not found</h1>
      <Link to="/" className="font-semibold">
        <div className="flex gap-1 mt-3">
          <ArrowLeftIcon width={16} />
          <span>Return to main page</span>
        </div>
      </Link>
    </Card>
  );
}
