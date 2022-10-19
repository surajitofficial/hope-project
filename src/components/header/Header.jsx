import React from "react";
import HeaderWrapper from "./header.style";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { ProfileLockScreen } from "helper/constant";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import IntlMessages from "util/intlMessages";
const Header = props => {
  const { drawerMiniMethod, mini } = props;
  const breadCrumb = props.auth.breadCrumb;
  const userSignout = () => {
    props.onLogout();
  };

  return (
    <HeaderWrapper {...props}>
      <div className="headerBack">
        <div className="flex-x align-center">
          <div className="drawer-handle-arrow">
            {mini ? (
              <button
                className="top-header-icon"
                onClick={() => drawerMiniMethod()}
              >
                <i className="fas fa-bars"></i>
              </button>
            ) : (
              <button
                className="top-header-icon"
                onClick={() => drawerMiniMethod()}
              >
                <i className="fas fa-bars"></i>
              </button>
            )}
          </div>
          <div
            className="mini-drawer-menu-icon"
            onClick={() => drawerMiniMethod()}
          >
            <i className="fas fa-bars" />{" "}
            <span className="app-name fs-16 bold-text">{"Hope"}</span>
          </div>

          <div className="pl-10 flex-1">
            {breadCrumb && (
              <div>
                <Breadcrumb className="custom-breadcumb">
                  {breadCrumb &&
                    breadCrumb.map((e, i) => {
                      if (i === breadCrumb.length - 1) {
                        return (
                          <BreadcrumbItem key={i} active>
                            <IntlMessages id={e.name} />
                          </BreadcrumbItem>
                        );
                      } else {
                        return (
                          <BreadcrumbItem className="breadcumb-color" key={i}>
                            <Link to={e.link}>
                              <IntlMessages id={e.name} />
                            </Link>
                          </BreadcrumbItem>
                        );
                      }
                    })}
                </Breadcrumb>
              </div>
            )}
          </div>
          <div className="pl-10 flex-2">
            Welcome {props.auth.lastName + " " + props.auth.firstName}
          </div>
          <div className="pl-10">
            <button className="top-header-icon">
              <i className="fas fa-search"></i>
            </button>
          </div>

          <div className="pl-10">
            <div id="profile">
              <img
                className="top-header-profile-class"
                src={ProfileLockScreen}
                alt="notify"
              />
            </div>
            <UncontrolledPopover
              className="roy-menu"
              innerClassName="roy-inner-content"
              placement="bottom-end"
              target="profile"
              trigger="legacy"
            >
              <PopoverBody>
                <div
                  className="roy-menu-list"
                  onClick={() => props.history.push("/profile")}
                >
                  My Profile
                </div>
                <div className="roy-menu-list">Settings</div>
                <div className="roy-menu-list" onClick={userSignout}>
                  Logout
                </div>
              </PopoverBody>
            </UncontrolledPopover>
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: data => {
      dispatch({ type: "USER_LOGOUT", payload: data });
    }
  };
};
const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Header);
