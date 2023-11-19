import { FC, useState } from "react";
import { Button, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./index.styles.css";

const Settings: FC = () => {
  const [disabledUsername, setDisabledUsername] = useState(true);
  const [disabledPhoneNumber, setDisabledPhoneNumber] = useState(true);
  const [disabledPassword, setDisabledPassword] = useState(true)
  return (
    <>
      <div className="settingsBigContainer">
        <div className="settingsContainer">
          <div className="settingsLeftSide">
            <div className="settingsWelcomeMessage">Hello, username</div>
            <div className="pictureContainerSettings">
              <div className="pictureSettings"></div>
              <EditOutlined className="iconSettings" />
            </div>

            <div className="settingsFieldsContainer">
              <div className="inputFieldSettings">
                <Input
                  className="inputSettingsBox"
                  disabled={disabledUsername}
                  placeholder="Username"
                />{" "}
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
                  placeholder="Phone number"
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
              
              <div className="buttonsSettingsContainer">
                
                <Button className="changePasswordSettings" type="primary">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          <div className="settingsRightSide">
            <div className="settingsYourBadgesText">Your Badges</div>
            <div className="settingsBadgesContainer">
              <div className="settingsBadge"></div>
              <div className="settingsBadge"></div>
              <div className="settingsBadge"></div>
            </div>
          </div>
        </div>
        <div />
      </div>
    </>
  );
};

export default Settings;
