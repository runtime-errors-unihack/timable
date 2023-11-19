import React, { useState, FC } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CopyToClipboard from "react-copy-to-clipboard";
import "./index.styles.css";

const TopUsers: FC = () => {
  const [pageLink, setPageLink] = useState(window.location.href);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Trigger a notification using react-toastify
    toast.success("Page link copied to clipboard: " + pageLink, {
      position: "bottom-right",
      autoClose: 3000, // 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  return (
    <>
      <div className="topUsers">
        <div id="header">
          <div className="titleTopUsers">Ranking</div>
        </div>
        <div className="descriptionRank">
          User ranking based on the contribution of the user to the community,
          showcased through pin creation and interaction. Start Mapping! Start Changing!
        </div>
        <div id="leaderboard">
          <div className="ribbon"></div>
          <table>
            <tr>
              <td className="number">1</td>
              <td className="name">Test Test</td>
              <td className="points">
                300
                <img
                  className="gold-medal"
                  src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                  alt="gold medal"
                />
              </td>
            </tr>
            <tr>
              <td className="number">2</td>
              <td className="name">Test Test</td>
              <td className="points">250</td>
            </tr>
            <tr>
              <td className="number">3</td>
              <td className="name">Test Test</td>
              <td className="points">130</td>
            </tr>
            <tr>
              <td className="number">4</td>
              <td className="name">Test Test</td>
              <td className="points">123</td>
            </tr>
            <tr>
              <td className="number">5</td>
              <td className="name">Test Test</td>
              <td className="points">70</td>
            </tr>
          </table>
          <CopyToClipboard text={pageLink} onCopy={handleCopy}>
            <div id="buttons">
              <button className="continue">Share Link</button>
            </div>
          </CopyToClipboard>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default TopUsers;
