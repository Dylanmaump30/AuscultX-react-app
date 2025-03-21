import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../App";
import { AudiosInfo } from "../../models/user.model";

function ContentStorage(_id: AudiosInfo) {
  return <div className="content-storage-container"></div>;
}
export default ContentStorage;
