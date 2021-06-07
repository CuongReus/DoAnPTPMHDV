import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => ({
});

class AgencyFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {

        return (<div className="footer text-muted text-center">
            Đồ Án Phát Triển Phần Mềm Hướng Dịch Vụ
        </div>);

    }
}

export default connect(
    mapStateToProps, mapDispatchToProps)(AgencyFooter);