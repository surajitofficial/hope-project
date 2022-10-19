import React, { useState } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import _ from "lodash";
import PageTitle from "components/common/PageTitle";

import Tag from "../components/Tag";
import Filter from "../components/filter";

function Index({ theme, history }) {
  const { sidebarTheme } = theme;
  let recordsData = [];
  let total = 0;
  let paginationData = {
    orderBy: "id",
    orderByDirection: "Desc",
    PageSize: 50,
    PageNumber: 1,
    SearchContent: {},
    QuickSearch: "",
  };
  const [IsDelete, setIsDelete] = useState(false);
  const [reload, setReload] = useState(0);
  const [IsFilter, setIsFilter] = useState(false);
  const [records, setRecords] = useState(recordsData);
  const [pagination, setPagination] = useState(paginationData);

  const activeColor = {
    color: sidebarTheme.activeColor,
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  const data = [
    {
      sites: "Lorem Ispum",
      users: "Lorem Ipsum",
      volunteers: "Lorem Ipsum",
      payments: "Lorem Ipsum",
    },
  ];
  const columns = [
    {
      title: "Sites",
      dataIndex: "sites",
      sorter: true,
      key: "sites",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "Users",
      dataIndex: "users",
      sorter: true,
      key: "users",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "Volunteers",
      dataIndex: "volunteers",
      sorter: true,
      key: "volunteers",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "Payments",
      dataIndex: "payments",
      sorter: true,
      key: "payments",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      width: 100,
      key: "id",
      sorter: false,
      render: (val) => (
        <div className="d-flex">
          <div
            className="roy-round-icon mr-2"
            onClick={() => {
              history.push("/users/" + val);
            }}
          >
            <i className="fas fa-edit"></i>
          </div>
          <div
            className="roy-round-icon mr-2"
            onClick={() => {
              setIsDelete(val);
            }}
          >
            <i className="fas fa-trash"></i>
          </div>
        </div>
      ),
    },
  ];
  return (
    <div>
      {IsFilter && (
        <Filter
          value={pagination.SearchContent}
          columns={columns}
          onCancel={() => {
            setIsFilter(false);
          }}
          
          onFilter={(e) => {
            paginationData.SearchContent = e;
            setPagination(_.clone(paginationData));
            setIsFilter(false);
          }}
        />
      )}
      <PageTitle
        searchText={pagination.QuickSearch}
        onSearch={(e) => {
          paginationData.QuickSearch = e;
          setPagination(_.clone(paginationData));
        }}
        extra={Object.keys(pagination.SearchContent).map((d) => (
          <Tag
            closable
            onClose={() => {
              let temp_filters = {};
              Object.keys(pagination.SearchContent).forEach((dd) => {
                if (dd !== d) {
                  temp_filters[dd] = pagination.SearchContent[dd];
                }
              });
              paginationData.SearchContent = temp_filters;
              setPagination(_.cloneDeep(paginationData));
            }}
            title={d}
            style={{ fontSize: 12, fontWeight: 400, textTransform: "none" }}
          >
            {_.find(columns, { key: d }).title}: {pagination.SearchContent[d]}
          </Tag>
        ))}
        breadCrumb={[]}
          onRefresh={() => {
            setReload(reload + 1);
          }}
        title="Dashboard"
        controls={[
          <button
            className="c-btn ma-5 c-rounded c-primary"
            onClick={() => {
              history.push("/users/0");
            }}
          >
            <i className="fas fa-plus mr-2"></i>Add
          </button>,
          <button
            className="c-btn ma-5 c-rounded c-seconadry"
            onClick={() => {
              setIsFilter(true);
            }}
          >
            <i className="fas fa-filter mr-2"></i>Filter
          </button>,
        ]}
      />
      <div className="plr-15">
        <div className="mtb-30 theme-color">
          <div className="introduction" style={activeColor}>
            Dashboard title
          </div>
          <Table
            rowSelection={{ type: "checkbox", ...rowSelection }}
            dataSource={data}
            columns={columns}
          />
          <div className="mtb-10">text will be there</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ themeChanger }) => {
  return {
    theme: themeChanger,
  };
};

export default connect(mapStateToProps, null)(Index);
