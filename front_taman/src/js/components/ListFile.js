import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../services/agent';
import {toast} from 'react-toastify';
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

class ListFile extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleAddToList = this.handleAddToList.bind(this);
        this.state = {
            load: false
        }
    };

    handleAddToList(obj){
        this.props.input.onChange(obj);
        this.setState({
            load: !this.state.load
        })
    }

    handleDeleteClick(e) {
        const {input} = this.props;
        // get fileName of file in row and send command delete to server
        var fileNameFromDeleteClick = e.target.getAttribute("data-filename");
        if(fileNameFromDeleteClick == 'Loading...')
            return;
        // send to server

        // get result and handing
        debugger;
        if (confirm("Are u sure delete "+fileNameFromDeleteClick))  {
            var list =input.value;
            if(list){
            for (var i = 0; i<list.length;i++ ){
            if(list[i].fileName == fileNameFromDeleteClick){
                list.splice(i, 1);

            }
            }
        }
            this.handleAddToList(list);
        }else{
        //Return
        }
        // if success, update state in reducer
    }
 
    handleSelectChange(e) {
        const {input,currentUser} = this.props;
        //get file add input
        var fileUpload = e.target.files[0];
        // send to server and show text loading...
        var objLoading = { fileName: 'Loading...', size: 'Loading...', fileDownloadUri: '',uploadBy:'' };
        var list = null;
        if(input.value == ""){
            list = [];
        }else{
            list = input.value;
        }
        console.log(list);

        var index = list.length;
        list.push(objLoading);   
       //this.props.input.onChange(x);
       if(list.length==0){
           return;
       }
       this.handleAddToList(list);
        var url =this.props.modalUrl;
        var formData = new FormData();
        formData.append('file', fileUpload);
       
        let addToList = (list) => this.handleAddToList(list);
        return agent.asyncRequests.post(url, formData
        ).then(function (res) {
            //get result
            var result = res.body.resultData;
            if (result) {
                //console.log(result);
                // if success
                var obj ={ fileName: result.fileName, size: result.size, fileDownloadUri: result.fileDownloadUri, uploadBy: currentUser.email };
                list.splice(index, 1, obj);
                addToList(list);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    
    render() {
        const { input } = this.props;
        var listfile = input.value;
        var rows = [];
        var currentNo = 0;
        if (listfile != null && listfile.length > 0) {
            listfile.forEach(item => {
            currentNo++

                var row = (
                    <tr key={item.fileName}>
                        <td>{currentNo}</td>
                        <td>{item.fileName}</td>
                        <td>{item.size} KB</td>
                        <td>{item.uploadBy}</td>
                        <td><span data-filename={item.fileName} onClick={this.handleDeleteClick} className="glyphicon glyphicon-remove-circle" style={{ color: '#FF0000' }} ></span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href={agent.getBackendUrl()+item.fileDownloadUri} target="_blank"><span className="glyphicon glyphicon-save" style={{ color: '#3cb371' }} ></span></a>
                        </td>
                    </tr>
                )
                rows.push(row);
            });
        }

        return (
            <div>
                <div className="form-group">
                    <label className="control-label">Chọn file upload</label>
                 
                            <input type="file" className="form-control" onChange={this.handleSelectChange} />
                        </div>
                   

                <div className="form-group">
                    <label className="control-label">Danh sách file</label>
                        <div className="table-responsive">
                            <table className="table table-striped col-sm-12">
                                <thead>
                                    <tr>
                                        <th style={{width: '10%'}}>STT</th>
                                        <th style={{width: '30%'}}>File Name</th>
                                        <th style={{width: '20%'}}>Size</th>
                                        <th style={{width: '30%'}}>Người Upload</th>
                                        <th>Chức Năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
            // <div>
            //     <div className="form-group" style={{border: '1px solid green'}}>
            //         <label className="control-label" style={{padding: '5px'}}>Chọn file upload</label>
            //                 <input type="file" className="form-control" onChange={this.handleSelectChange} />
            //             <div className="table-responsive">
            //                 <table className="table table-striped col-sm-12">
            //                     <thead>
            //                         <tr>
            //                             <th style={{width: '50%'}}>File Name</th>
            //                             <th style={{width: '30%'}}>Size</th>
            //                             <th style={{width: '20%'}}>Người Upload</th>
            //                             <th>Chức Năng</th>
            //                         </tr>
            //                     </thead>
            //                     <tbody>
            //                         {rows}
            //                     </tbody>
            //                 </table>
            //             </div>
            //     </div>
            // </div>
        );
    }
}
export default connect(mapStateToProps) (ListFile);