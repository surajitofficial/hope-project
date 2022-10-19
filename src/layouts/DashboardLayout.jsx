import React, { useState, useRef, useMemo } from "react";
import Sidebar from "components/sidebar/Sidebar";
import HorizontalSidebar from "components/horizontalsidebar/HorizontalSidebar";
import ThemeSetting from "components/themesetting/ThemeSetting";
import dashboardRoutes from "routes/dashboardRoutes";
import Header from "components/header/Header";
import themeActions from "redux/themeChanger/actions.js";
import settingactions from "redux/themeSettings/actions";
import AppLocale from "languageProvider";
import {
    drawerWidth,
    miniDrawerWidth,
    themeSettingDrawerWidth
} from "helper/constant";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import { ProtectedRoute } from "./../routes/ProtectedRoute";
import GlobalWrapper from "./global.style";
import LayoutSettings from "components/layoutsetting/LayoutSettings";
const { changeTheme } = themeActions;
const { sidebarMini } = settingactions;

const DashboardLayout = props => {
    const [mini, setMini] = useState(
        props.themeSetting.sidebarMiniValue
            ? props.themeSetting.sidebarMiniValue === "on"
            : false
    );
    const [themeDrawer, setThemeDrawer] = useState(true);
    const [layoutSettingDrawer, setLayoutSettingDrawer] = useState(true);
    const [statedrawerWidth] = useState(drawerWidth);
    const [stateminiDrawerWidth, setStateminiDrawerWidth] = useState(
        miniDrawerWidth
    );
    const mainPanel = useRef(null);
    const scrollbars = useRef(null);

    useMemo(() => {
        if (scrollbars && scrollbars.current) {
            scrollbars.current.scrollToTop(0);
        }
    }, []);

    useMemo(() => {
        setMini(props.themeSetting.sidebarMiniValue === "on");
    }, [props.themeSetting.sidebarMiniValue]);

    let mainPanelWidth;

    const { layoutTheme, locale, themeSetting } = props;
    const currentAppLocale = AppLocale[locale];

    

    if (themeSetting.layout === "vertical") {
        mainPanelWidth = {
            width: mini
                ? `calc(100% - ${miniDrawerWidth})`
                : `calc(100% - ${drawerWidth})`,
            backgroundColor: layoutTheme.backgroundColor
        };
    } else if (themeSetting.layout === "horizontal") {
        mainPanelWidth = {
            width: '100%',
            backgroundColor: layoutTheme.backgroundColor
        };
    }

    const drawerMiniMethod = () => {
        if (mini) {
            setMini(false);
            props.sidebarMini("off");
        } else {
            setMini(true);
            props.sidebarMini("on");
        }
    };

    const themeSettingDrawer = () => {
        if (themeDrawer) {
            setThemeDrawer(false);
        } else {
            setThemeDrawer(true);
        }
    };

    const toggleLayoutSettingDrawer = () => {
        setLayoutSettingDrawer(!layoutSettingDrawer)
    };

    const mouseEnter = () => {
        if (mini) {
            setStateminiDrawerWidth(drawerWidth);
        }
    };

    const mouseLeave = () => {
        if (mini) {
            setStateminiDrawerWidth(miniDrawerWidth);
        }
    };

    const closeDrawer = () => {
        setMini(true);
    };
    return (
        <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
        >
            <GlobalWrapper {...props}>
                {
                    themeSetting.layout === "vertical" &&
                    <Sidebar
                        mini={mini}
                        drawerWidth={statedrawerWidth}
                        miniDrawerWidth={stateminiDrawerWidth}
                        onMouseEnter={mouseEnter}
                        onMouseLeave={mouseLeave}
                        closeDrawer={() => closeDrawer}
                        {...props}
                    />
                }
                {
                    themeSetting.layout === "horizontal" &&
                    <div className="hor_mobile_sidebar">
                        <Sidebar
                            mini={mini}
                            drawerWidth={statedrawerWidth}
                            miniDrawerWidth={stateminiDrawerWidth}
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave}
                            closeDrawer={() => closeDrawer}
                            {...props}
                        />
                    </div>
                }


                <ThemeSetting
                    mini={themeDrawer}
                    drawerWidth={themeSettingDrawerWidth}
                    miniDrawerWidth={stateminiDrawerWidth}
                    closeSettingDrawer={themeSettingDrawer}
                    {...props}
                />

                <LayoutSettings
                    mini={layoutSettingDrawer}
                    drawerWidth={themeSettingDrawerWidth}
                    miniDrawerWidth={stateminiDrawerWidth}
                    closeSettingDrawer={toggleLayoutSettingDrawer}
                    {...props}
                />

                <div
                    id="main-panel"
                    className="main-panel flex-y"
                    ref={mainPanel}
                    style={mainPanelWidth}
                >
                    <div>
                        {
                            themeSetting.layout === "horizontal" &&
                            <HorizontalSidebar
                                {...props}
                                drawerMiniMethod={drawerMiniMethod}
                                layoutSettingDrawerToggle={toggleLayoutSettingDrawer}
                            />
                        }
                        {
                            themeSetting.layout === "vertical" && props.themeSetting.toolbarDisplayValue === "show" &&
                            (
                                <Header
                                    drawerMiniMethod={drawerMiniMethod}
                                    mini={mini}
                                    drawerWidth={statedrawerWidth}
                                    miniDrawerWidth={stateminiDrawerWidth}
                                    layoutSettingDrawerToggle={toggleLayoutSettingDrawer}
                                    {...props}
                                />
                            )
                        }
                    </div>
                   

                    {/* Route Layout Start*/}
                    <div
                        className="route-height flex-1 overflow-auto"
                        style={
                            themeSetting.toolbarDisplayValue === "show"
                                ? {
                                    background:
                                        layoutTheme.backgroundColor
                                }
                                : {
                                    background:
                                        layoutTheme.backgroundColor
                                }
                        }
                    >
                        <Switch>
                            <ProtectedRoute {...props}>
                                {dashboardRoutes.map((prop, key) => {
                                    return (
                                        <Route
                                            exact
                                            path={prop.path}
                                            component={prop.component}
                                            key={key}
                                        />
                                    );
                                })}
                            </ProtectedRoute>
                        </Switch>
                    </div>
                    
                </div>
            </GlobalWrapper>
        </IntlProvider>
    );
};

const mapStateToProps = state => {
    return {
        ...state.themeChanger,
        LanguageSwitcher: state.LanguageSwitcher,
        locale: state.LanguageSwitcher.language.locale,
        authData: {
            token: state.auth.accessToken,
            isLogin: state.auth.isLogin
            // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NSIsImp0aSI6ImVjODJhYzRlLTA0MDAtNGQ0Zi05Y2RkLTBmNjNjNTZmNWU0YiIsImVtYWlsIjoic2hpanUudmFya2V5QGVyc3RlY2hub2xvZ3kuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6InNoaWp1LnZhcmtleUBlcnN0ZWNobm9sb2d5LmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNDUiLCJleHAiOjE2NjYyMDI0MjcsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0Mzg5IiwiYXVkIjoiZXZlcnlvbmUifQ.djORboZB0hfGuhEQTtxYPhPJBgj1fDJGNAP_O4gzhbI",
            // isLogin: true
        },
        themeSetting: {
            toolbarAlignValue: state.themeSetting.toolbarAlignValue,
            footerAlignValue: state.themeSetting.footerAlignValue,
            sidebarDisplayValue: state.themeSetting.sidebarDisplayValue,
            toolbarDisplayValue: state.themeSetting.toolbarDisplayValue,
            footerDisplayValue: state.themeSetting.footerDisplayValue,
            sidebarTransParentValue: state.themeSetting.sidebarTransParentValue,
            transparentImage: state.themeSetting.transparentImage,
            activeLinkStyle: state.themeSetting.activeLinkStyle,
            sidebarMiniValue: state.themeSetting.sidebarMiniValue,
            layout: state.themeSetting.layout,
            sidebarTransParentActiveBack:
                state.themeSetting.sidebarTransParentActiveBack,
            sidebarTransParentActiveColor:
                state.themeSetting.sidebarTransParentActiveColor
        }
    };
};

export default connect(
    mapStateToProps,
    {
        changeTheme,
        sidebarMini
    }
)(DashboardLayout);
