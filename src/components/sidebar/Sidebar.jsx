import React, { Fragment } from "react";
import SidebarWrapper from "./sidebar.style";
import Radium from "radium";
import NavList from "components/sidebar/NavList";
import { sidebarData } from "util/data/sidebar";
import { slogo, AppName } from "helper/constant";
import { Scrollbars } from "react-custom-scrollbars";
import { NavLink } from "react-router-dom";
import IntlMessages from "util/intlMessages";

const Sidebar = props => {
  let listNameStyle;
  let sidebar;
  let sideScrollStyle;

  const {
    mini,
    drawerWidth,
    miniDrawerWidth,
    onMouseEnter,
    onMouseLeave,
    sidebarTheme,
    layoutTheme,
    closeDrawer,
    themeSetting
  } = props;

  if (
    themeSetting.toolbarAlignValue === "above" &&
    themeSetting.footerAlignValue === "above"
  ) {
    sideScrollStyle = {
      zIndex: 5,
      height: "calc(100vh - 190px)"
    };
  } else if (themeSetting.toolbarAlignValue === "above") {
    sideScrollStyle = {
      zIndex: 5,
      height: "calc(100vh - 145px)"
    };
  } else if (themeSetting.footerAlignValue === "above") {
    sideScrollStyle = {
      zIndex: 5,
      height: "calc(100vh - 128px)"
    };
  } else {
    sideScrollStyle = {
      zIndex: 5,
      height: "calc(100vh - 75px)"
    };
  }

  if (themeSetting.sidebarTransParentValue === "on") {
    sidebar = {
      backgroundImage: `linear-gradient(0deg,rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.9)),url(${themeSetting.transparentImage})`,
      backgroundRepeat: "no-repeat, repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      width: mini ? miniDrawerWidth : drawerWidth,
      "@media (max-width: 991.98px)": {
        width: mini ? 0 : drawerWidth
      }
    };
  } else {
    sidebar = {
      width: mini ? miniDrawerWidth : drawerWidth,
      background: sidebarTheme.backgroundColor,
      "@media (max-width: 991.98px)": {
        width: mini ? 0 : drawerWidth
      }
    };
  }

  const closeIcon = {
    "@media (max-width: 991.98px)": {
      display: "block"
    }
  };

  if (mini) {
    listNameStyle = {
      opacity: miniDrawerWidth === drawerWidth ? 1 : 0,
      transform:
        miniDrawerWidth === drawerWidth
          ? "translateZ(0)"
          : "translate3d(-25px,0,0)"
    };
  } else {
    listNameStyle = {
      opacity: !mini ? 1 : 0,
      transform: !mini ? "translateZ(0)" : "translate3d(-25px,0,0)"
    };
  }

  return (
    <SidebarWrapper
      themeSetting={themeSetting}
      sidebarTheme={sidebarTheme}
      layoutTheme={layoutTheme}
      mini={mini}
      miniDrawerWidth={miniDrawerWidth}
      drawerWidth={drawerWidth}
    >
      {!mini && <div className="sidebar-overlay" onClick={closeDrawer()}></div>}
      <div
        id="sidebar"
        className="sidebar sideBack"
        style={sidebar}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="sidebar-header">
          <NavLink to={"/"} className="simple-text logo-mini">
            <div className="logo-img">
              <img src={slogo} alt="react-logo" />
            </div>
          </NavLink>
          <div className="logo-text simple-text fs-20 bold-text">{AppName}</div>
        </div>
        <div
          className="close-drawer-icon"
          style={closeIcon}
          onClick={closeDrawer()}
        >
          <i className="fas fa-times-circle" />
        </div>
        <Scrollbars
          autoHide
          style={sideScrollStyle}
          renderThumbVertical={({ style, ...props }) => (
            <div {...props} className="sidebar-scrollbar-style" />
          )}
          renderThumbHorizontal={({ style, ...props }) => <div {...props} />}
          renderTrackVertical={({ style, ...props }) => (
            <div
              {...props}
              style={{
                ...style,
                zIndex: 5,
                position: "absolute",
                width: "6px",
                right: "2px",
                bottom: "2px",
                top: "2px",
                borderRadius: "3px"
              }}
            />
          )}
        >
          <div className="sidebar-wrapper">
            <ul className="nav">
              {sidebarData.map((list, i) => {
                return (
                  <Fragment key={i}>
                    {list.type && list.type === "heading" ? (
                      (!mini || miniDrawerWidth === drawerWidth) && (
                        <div className="sidelist-header-name">
                          {
                            <Fragment>
                              <IntlMessages id={list.name} />
                              {list.hasOwnProperty("isNew") && list["isNew"] && (
                                <span
                                  style={{
                                    right: "23px"
                                  }}
                                  className="new-update-tag fs-13 bold-text"
                                >
                                  New
                                </span>
                              )}
                            </Fragment>
                          }
                        </div>
                      )
                    ) : (
                      <NavList
                        listNameStyle={listNameStyle}
                        list={list}
                        mini={mini}
                        miniDrawerWidth={miniDrawerWidth}
                        drawerWidth={drawerWidth}
                        {...props}
                      />
                    )}
                  </Fragment>
                );
              })}
            </ul>
          </div>
        </Scrollbars>
      </div>
    </SidebarWrapper>
  );
};
export default Radium(Sidebar);
