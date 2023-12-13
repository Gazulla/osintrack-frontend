/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { adminSettingsGet } from "../actions/adminActions";

import TelegramConnection from "../components/TelegramConnection";
import LoadingWrapper from "../components/LoadingWrapper";

export default function Admin() {
  const { loading: loadingData, settings } = useSelector((state) => state.admin);

  return (
    <LoadingWrapper loadingData={loadingData} dispatchFunction={adminSettingsGet}>
      <div className="grid sm:grid-cols-2 md:grid-cols-3">
        <TelegramConnection settings={settings} />
      </div>
    </LoadingWrapper>
  );
}
