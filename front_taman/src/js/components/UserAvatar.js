import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import agent from '../services/agent';
import {toast} from 'react-toastify';

class UserAvatar extends React.Component {
    constructor(props) {
        super(props);
        // this.handledeleteclick = this.handledeleteclick.bind(this);
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

 
  
    handleSelectChange(e) {
        const {input} = this.props;
        //get file add input
        var fileUpload = e.target.files[0];
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
    //    this.props.input.onChange(x);
        if(list.length ==0){
            return ;
        }
       this.handleAddToList(list);
        var url = '/uploadUserFile';
        var formData = new FormData();
        formData.append('file', fileUpload);
        let addToList = (list) => this.handleAddToList(list);
        return agent.asyncRequests.post(url, formData
        ).then(function (res) {
            //get result
            var result = res.body.resultData;
            if  (result) {
                //console.log(result);
                // if success
                var obj ={ fileName: result.fileName, size: result.size, fileDownloadUri: result.fileDownloadUri };
                list.splice(index, 1, obj);
                addToList(list);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });


    }
    
    render() {



        const { input } = this.props;
        var userAvatar = input.value;
        var rows = null;
       
        if (userAvatar != null && userAvatar.length > 0) {
            userAvatar.forEach(item => {
                var row = (
                    
                    <div key={item.fileName} className="form-group" style={{textAlign:'center'}}>
                        
                        <label className="control-label" >Hình Ảnh</label> 
                        <div >
                        
                            <span><img src={agent.getBackendUrl()+item.fileDownloadUri} width={100} height={100}/>
                            </span>
                        </div>
                    
                    </div>
                )
                rows=(row);
            });
        }

        return (
            <div>
                 {rows}
                <div className="form-group">
                    <label className="control-label" style={{textAlign:'center'}}>Chọn Hình Ảnh Nhân Viên</label>
                            <input  type="file" className="form-control" onChange={this.handleSelectChange} />
                </div>
               
                
            
            </div>
        );
    }
}

export default UserAvatar;