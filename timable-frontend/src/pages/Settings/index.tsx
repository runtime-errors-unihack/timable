import { FC, useEffect, useState } from "react";
import { Button, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./index.styles.css";
import axios from "axios";
import { UserModel } from "../../models/user-model";

const Settings: FC = () => {
  const [disabledUsername, setDisabledUsername] = useState(true);
  const [disabledPhoneNumber, setDisabledPhoneNumber] = useState(true);
  const [disabledPassword, setDisabledPassword] = useState(true);
  const [userId, setUserId] = useState<UserModel>();

  const getUserDetails = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const user = await axios.get("http://localhost:8000/session", {
        params: { session: token },
      });
      setUserId(user.data);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <>
      <div className="settingsBigContainer">
        <div className="settingsContainer">
          <div className="settingsLeftSide">
            <div className="settingsWelcomeMessage">Hello, {userId?.username}</div>
            <div className="inputFieldsSettingsContainer">
              <div className="pictureContainerSettings">
                <div className="pictureSettings"></div>
                <EditOutlined className="iconSettings" />
              </div>

              <div className="settingsFieldsContainer">
                <div className="inputFieldSettings">
                  <Input
                    className="inputSettingsBox"
                    disabled={disabledUsername}
                    placeholder={userId?.username}
                  />
                  <EditOutlined
                    className="iconSettings"
                    onClick={() => {
                      setDisabledPhoneNumber(true);
                      setDisabledUsername(false);
                      setDisabledPassword(true);
                    }}
                  />
                </div>
                <div className="inputFieldSettings">
                  <Input
                    className="inputSettingsBox"
                    placeholder={userId?.phone}
                    disabled={disabledPhoneNumber}
                  />
                  <EditOutlined
                    className="iconSettings"
                    onClick={() => {
                      setDisabledPhoneNumber(false);
                      setDisabledUsername(true);
                      setDisabledPassword(true);
                    }}
                  />
                </div>
                <div className="inputFieldSettings">
                  <Input.Password
                    className="inputSettingsBox"
                    placeholder="Password"
                    disabled={disabledPassword}
                  />
                  <EditOutlined
                    className="iconSettings"
                    onClick={() => {
                      setDisabledPassword(false);
                      setDisabledUsername(true);
                      setDisabledPhoneNumber(true);
                    }}
                  />
                </div>
                <div className="inputFieldSettings">
                  <Input
                    className="inputSettingsBox"
                    disabled
                    placeholder="biancadenisa93@yahoo.com"
                  />
                </div>
              </div>
            </div>
            <div className="buttonsSettingsContainer">
              <Button className="changePasswordSettings" type="primary">
                Save Changes
              </Button>
            </div>
          </div>

          <div className="settingsRightSide">
            <div>
              <div className="settingsYourBadgesText">Your Badges</div>
              <div className="settingsBadgesContainer">
                <div className="settingsBadge"></div>
                <div className="settingsBadge"></div>
                <div className="settingsBadge"></div>
              </div>
            </div>
          </div>
        </div>
        <div />
      </div>
    </>
  );
};

export default Settings;
