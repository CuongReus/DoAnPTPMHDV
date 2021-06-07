import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../services/agent';
import {toast} from 'react-toastify';

class StockMovementInputReport extends React.Component {
    constructor(props) {
        super(props);
        this.handledeleteclick = this.handledeleteclick.bind(this);
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
    handledeleteclick(e) {
        const {input} = this.props;
        // get fileName of file in row and send command delete to server
        var fileName = e.target.getAttribute("data-filename");

        if(fileName == 'Loading...')
            return;
        // send to server

        // get result and handing
        
        if (confirm("Are u sure delete "+fileName))  {
            var list = input.value;
            var index = list.indexOf(fileName);
            list.splice(index, 1);
            this.handleAddToList(list);
           
        }else{
        //Return
        }
        // if success, update state in reducer

      
    }
 
  
    handleSelectChange(e) {
        const {input} = this.props;
        //get file add input
        var fileupload = e.target.files[0];
        // send to server and show text loading...
        var objloading = { fileName: 'Loading...', size: 'Loading...', fileDownloadUri: '' };
        var list = null;
        if(input.value == ""){
            list = [];
        }else{
            list = input.value;
        }
        console.log(list);

        var index = list.length;
        list.push(objloading);   
       //this.props.input.onChange(x);
       if(list.length==0){
           return;
       }
       this.handleAddToList(list);
        var url = '/uploadStockMovementReport';
        var formData = new FormData();
        formData.append('file', fileupload);
        let addToList = (list) => this.handleAddToList(list);
        return agent.asyncRequests.post(url, formData
        ).then(function (res) {
            //get result
            var result = res.body.resultData;
            if (result) {
                //console.log(result);
                // if success
                var obj ={ fileName: result.fileName, size: result.size, fileDownloadUri: result.fileDownloadUri };
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
        var listFile = input.value;
        var rows = [];
        if (listFile != null && listFile.length > 0) {
            listFile.forEach(item => {
                var row = (
                    <tr key={item.fileName}>
                        <td>{item.fileName}</td>
                        <td>{item.size} KB</td>
                        <td><span data-filename={item.fileName} onClick={this.handledeleteclick} className="glyphicon glyphicon-remove-circle" style={{ color: '#FF0000' }} ></span>
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
                                        <th style={{width: '50%'}}>File Name</th>
                                        <th style={{width: '30%'}}>Size</th>
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
        );
    }
}
export default StockMovementInputReport;