import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import PageTitle from 'components/common/PageTitle';
import * as API from '../../../services/master'
import Spin from 'antd/lib/spin'
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from 'moment'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
function Index({theme,history,match}) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(false);
    const { sidebarTheme } = theme
    const activeColor = {
        color: sidebarTheme.activeColor
    }
    useEffect(()=>{
        if (match.params.id!=='0') {
            setLoading(true)
            API.select("Payment", match.params.id).then((res) => {
                setData(res.data.data[0]);
                setLoading(false)              
            })
        }
    },[match.params.id])
    
    return (
        <div>
            {error && <SweetAlert title={error} onConfirm={()=>{ setError(false) }} />}
            <PageTitle title="Payment Detail" breadCrumb={[{name:'Payments',link:'/payments'},{name:'Detail'}]} />
            
            <div className="plr-15 Profile-component" style={activeColor}>
                <div className="mtb-30 theme-color">
                <Spin spinning={loading}>
                <Row gutter={15}>
                <Col md={12} sm={24}>

                <div className="work-card">
            <div className="Work-header" style={{background:'rgb(86, 60, 145) none repeat scroll 0% 0%',color:'white',fontWeight:600}}>
                Payment Information
            </div>

            <div className="work-body pa-15">
                <div className="pa-10">
                    <div className="Work-title">Name</div>
                    <div className="Work-text">{data && data.firstName} {data && data.lastName}</div>
                </div>

                <div className="pa-10">
                    <div className="Work-title">Email</div>
                    <div className="Work-text">
                      {data && data.email}
                    </div>
                </div>
                <div className="pa-10">
                    <div className="Work-title">Name On Card</div>
                    <div className="Work-text">{data && data.nameOnCard}</div>
                </div>

                

                <div className="pa-10">
                    <div className="Work-title">Bank Name</div>
                    <div className="Work-text">{data && data.bankName}</div>
                </div>

                <div className="pa-10">
                    <div className="Work-title">Amount</div>
                    <div className="Work-text">{data && data.amount}</div>
                </div>
                <div className="pa-10">
                    <div className="Work-title">Check No</div>
                    <div className="Work-text">{data && data.checkNo}</div>
                </div>

                <div className="pa-10">
                    <div className="Work-title">Check Date</div>
                    <div className="Work-text">{data && moment(data.checkdate).format("MM/DD/YYYY")}</div>
                </div>
                <div className="pa-10">
                    <div className="Work-title">Card Type</div>
                    <div className="Work-text">{data && data.cardType}</div>
                </div>
            </div>
        </div>
        </Col>
        <Col md={12} sm={24}>
        <div className="work-card">
            <div className="Work-header" style={{background:'rgb(86, 60, 145) none repeat scroll 0% 0%',color:'white',fontWeight:600}}>
               Transaction Detail
            </div>

            <div className="work-body pa-15">
                <div className="pa-10">
                    <div className="Work-title">Transaction Id</div>
                    <div className="Work-text">{data && data.transactionId}</div>
                </div>
                <div className="pa-10">
                    <div className="Work-title">Transaction Details</div>
                    <div className="Work-text">{data && data.transactionDetails}</div>
                </div>
            </div>
        </div>
        </Col>
        </Row>
                </Spin>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({themeChanger}) => {
    return {
        theme:themeChanger
    };
}

export default connect(mapStateToProps, null)(Index);