import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PageTitle from "components/common/PageTitle";
// import { Table } from "antd";
import Table from "antd/lib/table";
import Pagination from "antd/lib/pagination";
import Tag from "../components/Tag";
import * as API from "../../../services/master";
import { tableHeight } from "../config";
import Filter from "../components/filter";
import SweetAlert from "react-bootstrap-sweetalert";
import _ from "lodash";
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

function Index({ theme, history }) {
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

  const columns = [
    {
      title: "Site Name",
      dataIndex: "siteName",
      key: "siteName",
      sorter: true,
      width: 120,
      filterType: "text",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "addressLine1",
      key: "addressLine1",
      sorter: true,
      width: 120,
      filterType: "text",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "Program Dates",
      dataIndex: "program_Dates",
      key: "program_Dates",
      sorter: true,
      width: 120,
      filterType: "text",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 120,
      sorter: true,
      filterType: "text",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "State",
      dataIndex: "state",
      width: 120,
      key: "state",
      sorter: true,
      filterType: "text",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: 120,
      sorter: true,
      filterType: "text",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "Participants",
      dataIndex: "no_Of_Participants",
      width: 120,
      key: "no_Of_Participants",
      sorter: true,
      filterType: "text",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "Fee",
      dataIndex: "participant_Fee",
      width: 120,
      key: "participant_Fee",
      sorter: true,
      filterType: "text",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "Count",
      dataIndex: "volunteerCount",
      width: 120,
      key: "volunteerCount",
      sorter: true,
      filterType: "text",
      render: (val) => (
        <div title={val} className="text_overlap">
          {val}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      width: 100,
      key: "id",
      sorter: false,
      render: (val) => (
        <div className="d-flex">
          <div
            className="roy-round-icon mr-2"
            onClick={() => {
              history.push("/volunteersites/" + val);
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
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);
  const [IsFilter, setIsFilter] = useState(false);
  const [IsDelete, setIsDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [records, setRecords] = useState(recordsData);
  const [pagination, setPagination] = useState(paginationData);
  const [selectedId, setId] = useState(0);
  const { sidebarTheme } = theme;
  const activeColor = {
    color: sidebarTheme.activeColor,
  };

  useEffect(() => {
    setLoading(true);
    let data = _.cloneDeep(pagination);
    data.search = [];
    Object.keys(pagination.SearchContent).forEach((d) => {
      data.search.push({
        searchField: d,
        searchValue: pagination.SearchContent[d],
      });
    });
    API.get("VolunteerSites", data).then((response) => {
      if (response.data.length > 0)
        this.setState({ total: response.data[0].totalrows });
      setLoading(false);
      recordsData = response.data.data;
      total = response.data.total;
      setRecords(recordsData);
    });
  }, [pagination, reload]);

  return (
    <div>
      {IsDelete && (
        <SweetAlert
          showCancel
          cancelBtnCssClass="btn btn-primary"
          cancelBtnStyle={{ color: "white" }}
          cancelBtnText="Cancel"
          disabled={deleting}
          confirmBtnText={
            <span>
              {deleting && <i class="fas fa-spinner fa-spin"></i>} Delete
            </span>
          }
          confirmBtnCssClass="btn btn-danger"
          title="Do you want to delete?"
          onConfirm={() => {
            setDeleting(true);
            API.remove("VolunteerSites", IsDelete).then(() => {
              setIsDelete(false);
              setReload(reload + 1);
              setDeleting(false);
            });
          }}
          onCancel={() => {
            setIsDelete(false);
          }}
        />
      )}
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
        title="Sites"
        controls={[
          <button
            className="c-btn ma-5 c-rounded c-primary"
            onClick={() => {
              history.push("/volunteersites/0");
            }}
          >
            <i className="fas fa-plus mr-2"></i>Add
          </button>,
          //    <button
          //    className="c-btn ma-5 c-rounded c-primary"
          //    onClick={() => {
          //      history.push("/volunteersitesdet/"+selectedId);
          //    }}
          //  >
          //    <i className="fas fa-plus mr-2"></i>Add details
          //  </button>,
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
      <div className="tablearea" style={activeColor}>
        <div className="plr-15">
          <div className="mtb-30 theme-color">
            <Table
              columns={columns}
              dataSource={records}
              loading={loading}
              pagination={false}
              onChange={(pagination, filter, sorter) => {
                if (sorter.order) {
                  paginationData.orderBy = sorter.field;
                  paginationData.orderByDirection =
                    sorter.order === "ascend" ? "Asc" : "Desc";
                } else {
                  paginationData.orderBy = "id";
                  paginationData.orderByDirection = sorter.order = "Desc";
                }

                setPagination(_.clone(paginationData));
              }}
              scroll={{ y: tableHeight }}
              onRow={(record, index) => {
                return {
                  onClick: (event) => {
                    setId(record.id);
                  },
                  onDoubleClick: (event) => {
                    setId(record.id);
                    history.push("/volunteersitesdet/" + record.id);
                  },
                };
              }}
            />
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-end"
        style={{ marginTop: 27, marginBottom: -8 }}
      >
        <Pagination
          size="default"
          showTotal={(total, range) =>
            `${range[0]} to ${range[1]} of ${total} Entries`
          }
          pageSize={pagination.PageSize}
          pageSizeOptions={["30", "50", "100", "500"]}
          onChange={(PageIndex, pageSize) => {
            paginationData.PageNumber = PageIndex;
            if (paginationData.PageSize !== pageSize) {
              paginationData.PageSize = pageSize;
              paginationData.PageNumber = 1;
            }
            setPagination(_.clone(paginationData));
          }}
          showSizeChanger={true}
          total={total}
          current={pagination.PageNumber}
        />
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
