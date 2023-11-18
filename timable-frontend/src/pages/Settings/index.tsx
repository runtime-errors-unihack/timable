import { FC } from "react";
import { Button, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import "./index.styles.css";

const Settings: FC = () => {
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
                <Input className="inputSettingsBox" placeholder="Username" />{" "}
                <EditOutlined className="iconSettings" />
              </div>
              <div className="inputFieldSettings">
                <Input
                  className="inputSettingsBox"
                  placeholder="Phone number"
                />
                <EditOutlined className="iconSettings" />
              </div>
              <div className="inputFieldSettings">
                <Input
                  className="inputSettingsBox"
                  disabled
                  placeholder="biancadenisa93@yahoo.com"
                />
              </div>
              <Button className="changePasswordSettings" type="primary">
                Change Password
              </Button>
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
