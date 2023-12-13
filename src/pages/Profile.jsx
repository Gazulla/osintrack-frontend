/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";

import LoadingWrapper from "../components/LoadingWrapper";
import { profileGet } from "../actions/profileActions";
import ProfileData from "../components/ProfileData";
import PasswordUpdate from "../components/PasswordUpdate";
import ProfilePicture from "../components/ProfilePicture";

export default function Profile() {
  const { loading: loadingData, user } = useSelector((state) => state.profile);
  return (
    <LoadingWrapper loadingData={loadingData} dispatchFunction={profileGet}>
      <div className="grid sm:grid-cols-2 md:grid-cols-3">
        <ProfilePicture user={user} />
        <ProfileData user={user} />
        <PasswordUpdate />
      </div>
    </LoadingWrapper>
  );
}
