/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { Button, Image } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { profileImageUpdate } from "../actions/profileActions";

export default function ProfilePicture({ user }) {
  const { imageError } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleUploadImageChange = (e) => {
    dispatch(profileImageUpdate({ image: e.target.files[0] }));
  };

  return (
    <Card className="m-3 h-fit">
      <CardHeader className="flex justify-between pl-5 pr-5 pt-5">
        <h2 className="flex gap-2 text-xl font-semibold items-center">Profile picture ({user.username})</h2>
      </CardHeader>
      <CardBody>
        <form className="flex flex-col gap-3 items-center">
          <Image alt={user.name} className="object-cover rounded-full aspect-square" src={user.image} width={"200px"} />
          <Button className="p-0 w-full" color="primary">
            <label className="absolute w-full h-full cursor-pointer">
              <input onChange={(e) => handleUploadImageChange(e)} id="upload-input" type="file" accept="image/*" className="hidden" />
            </label>
            Edit profile picture
          </Button>
          {imageError && (
            <Card isBlurred className="border-none bg-red-500/20 text-red-500 p-2 text-sm" shadow="sm">
              {imageError}
            </Card>
          )}
        </form>
      </CardBody>
    </Card>
  );
}
