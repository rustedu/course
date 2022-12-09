import { useNavigate } from "react-router-dom";
import LoginStatus from "./LoginStatus";
import Icon from "@/components/Icon";
import { useAppState } from "@/context";

const Header = ({ isMobile }: { isMobile?: boolean }) => {
  const navigate = useNavigate();
  const {
    state: { tabStatus },
    dispatch,
  } = useAppState();
  return (
    <header className="main-header">
      <div className="header-content content">
        <a
          onClick={() => {
            dispatch({
              type: "TAB_CHANGE",
              payload: "ABOUT",
            });
          }}
        >
          <img src={siteConfig.logo} alt="logo" />
          <span className="action-item">社区</span>
        </a>
        <span
          onClick={() => {
            navigate("//");
            dispatch({
              type: "TAB_CHANGE",
              payload: "INDEX",
            });
          }}
        >
          <Icon symbol="icon-home" />
          首页
        </span>
        <span>
          <LoginStatus isMobile={isMobile} />
          我的
        </span>
      </div>
    </header>
  );
};

export default Header;
