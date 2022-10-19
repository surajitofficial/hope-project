import React, { Fragment,useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";
import IntlMessages from "util/intlMessages";
import Space from 'antd/lib/space'
let timer = undefined;

const PageTitle = ({ title, className, breadCrumb,controls,extra,onRefresh,onSearch,searchText,setBreadCrumb,hidden }) => {
    const [search,setSearch] = useState(searchText);
    const [loaded,setLoaded] = useState(false);
    useEffect(()=>{
        if(!loaded)
        {
            setBreadCrumb(breadCrumb);
            setLoaded(true)
        }
    },[loaded,breadCrumb,setBreadCrumb])
    if(hidden) return '';
    return (
        <Fragment>
            <div className="new-page-title">
                <div className={classNames("Page-title align-items-center", className)}>
                    <div className="title flex-1">
                        <IntlMessages id={title} />
                    </div>                    
                    <Space>
                         {onSearch && <div>
                                <input value={search} className="form-control react-form-input" placeholder="Search..." onChange={(e)=>{
                                    let temp =e.target.value;
                                    setSearch(e.target.value)
                                    clearTimeout(timer);
                                    timer=setTimeout(()=>{
                                        onSearch(temp)
                                    },500);
                                }} />
                            </div>}
                            {onRefresh && <div className="roy-round-icon" onClick={onRefresh}>
                                <i className="fas fa-redo-alt"></i>
                            </div>}
                        {extra} {controls}
                    </Space>
                </div>
            </div>
        </Fragment>
    );
};

PageTitle.propTypes = {
    title: PropTypes.string.isRequired
};

const mapStateToProps = state => {
    return {
        ...state.themeChanger
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setBreadCrumb: (data) => {
            dispatch({ type: 'SET_BREADCRUMB', payload: data });
        }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageTitle);
