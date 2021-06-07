import React from 'react';
import { Modal } from 'react-bootstrap';


// Show this when screen with long loading time
const LoadingScreen = (props) => {
    return (<div className="text-center" style={{verticalAlign: 'middle'}}>
        <br/>
        <img src="/assets/images/squares.gif" alt="verify"/>
    </div>);
}
const ModalLoading = (props)=>{
    const modalConfig =  { backdrop: 'static', show: props.show,bsSize:"sm",  onHide: props.onHide, submitting: props.submitting };
    return (
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
    )
}

let getClassOfStatus = (invoiceStatus) => {
    switch (invoiceStatus) {
        case "INIT":
            return "label-info";
        case "NEW":
            return "label-info";
        case "PAID":
            return "label-success";
        case "CANCEL":
            return "label-default";
        case "REFUND":
            return "label-warn";
        case "SUSPEND":
            return "label-info";
        case "TRIAL":
            return "label-info";
        default:
            return "";
    }
};
const SpanInvoiceStatus = (props) => {
    const {status, t} = props;
    return (<span className={["label", getClassOfStatus(status)].join(" ")}>{t("label_invoiceStatus_" + status)}</span>);
};

export {LoadingScreen, SpanInvoiceStatus,ModalLoading};