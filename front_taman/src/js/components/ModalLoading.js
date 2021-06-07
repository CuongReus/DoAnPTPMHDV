import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { LoadingScreen } from '../../components/commonWidgets';



class ModalLoading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
          
        }
    }
   


    
    render() {
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  onHide: this.props.onHide, submitting: this.props.submitting };

      
       
        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-sm"> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <LoadingScreen></LoadingScreen>
                    </Modal.Body>
                </Modal>
            </div>





        return newModal;
    }
};


export default ModalLoading;
