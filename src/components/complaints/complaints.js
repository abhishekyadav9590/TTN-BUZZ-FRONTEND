import React,{Component} from "react";
import "./complaints.css";
import {fileComplaint,fetchDepartment,showComplaintList} from "../../actions/complaints.action";
import {connect} from "react-redux";
import DetailComp from "./detailComp";

class Complaints extends Component{
    componentDidMount() {
        this.props.showComplaintList();
        this.props.fetchDepartment();
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('department',e.target[0].value);
        formData.append('issueTitle',e.target[1].value);
        formData.append('concern',e.target[2].value);
        if(e.target[3].value)
            formData.append('attachment',e.target[3].files[0]);
        this.props.fileComplaint(formData);
        e.target.reset();
    }
    render() {
        const {departmentList,complaintList}=this.props;
        return(
            <React.Fragment>
                <form className={"complaints container-fluids clearfix"} onSubmit={this.handleSubmit} encType='multipart/form-data'>
                <div className={"complaints-box-label"}>
                     <label>Complaint Box</label>
                </div>
                <div className={"myrow"}>
                    <div className={"col-xs-12 col-sm-6 col-md-6 col-lg-6 form-group"}>
                        <label htmlFor="department">Select Department</label>
                        <select name="department" id="department" className={"form-control"} title={"Select Department"}>
                            {
                                departmentList.map(department=>{
                                    return(<option value={department._id}>{department.deptName}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className={"col-xs-12 col-sm-6 col-md-6 col-lg-6 form-group"}>
                        <label htmlFor="issueTitle" className={"control-label"}>Issue Title</label>
                        <input type={"text"} name="issueTitle" id="issueTitle" className={"form-control"} required maxLength={50} title={"Write Issue Title"}/>
                    </div>
                </div>
                <div className={"myrow"}>
                    <div className={"col-xs-12 col-sm-12 col-md-12 col-lg-12 form-group"}>
                        <label htmlFor="concern" className={"control-label"}>Your Concern</label>
                        <textarea name="concern" id="concern" className={"form-control"} required cols={"30"} rows={"4"}
                        placeholder={"write your concern to us."} maxLength={1000} title={"Write Your Concern to us."}
                        />
                    </div>
                </div>
                <div className={"myrow"}>
                    <div className={"col-xs-12 col-xs-offset-0 col-sm-3 col-sm-offset-9 col-lg-3 col-lg-offset-9 form-group file-upload"} title={"Choose File"}>
                        <label htmlFor="file-upload">
                            <span>Attachment</span>
                            <i className="far fa-image"></i>
                        </label>
                        <input type={"file"} id={"file-upload"} name="attachment" className={"form-control "}/>
                    </div>
                    <div className={"col-xs-12 col-xs-offset-0 col-sm-3 col-sm-offset-9 col-lg-3 col-lg-offset-9 form-group"} title={"Submit Your Complaint"}>
                        <input type={"submit"} name="complaint-submit" id="complaint-submit" className={"form-control btn comment-btn"}/>
                    </div>
                </div>
            </form>
                <div className={"resolve container"}>
                    <div className={"resolve-label"}>
                        <label>My Complaints</label>
                    </div>
                    <div className={"table-responsive"}>
                        <table className={"table table-bordered"}>
                            <thead>
                            <tr key={"first-row"}>
                                <th>
                                   Department
                                </th>
                                <th>Issue id</th>  <th>Assigned To</th> <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                complaintList.map(complain=> {
                                    //checking that only user complaint displayed here
                                    if(complain.RaisedBy._id===this.props.user._id)
                                    {
                                       return <DetailComp complaint={complain}/>
                                    }
                                    //returning true just for the sake of warning ..........................
                                    return true;
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps=state=>{
    return {
        user:state.userReducer.userData,
        complaintList:state.complaintReducer.complaintList,
        departmentList:state.departmentReducer.departmentList
    }
}
const mapDispatchToProps={
    fileComplaint,
    fetchDepartment,
    showComplaintList
}
export default connect(mapStateToProps,mapDispatchToProps)(Complaints);