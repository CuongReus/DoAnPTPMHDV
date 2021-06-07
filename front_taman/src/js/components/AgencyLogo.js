import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
});
class AgencyLogo extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        const {
            width,
            height,
        } = this.props;

        var logoUrl = "/assets/images/lglogo.png";

        if (width && height) {
            return (<img width={width} height={height} src={logoUrl} alt=""/>);
        } else {
            return (<img src={logoUrl} alt=""/>);
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps)(AgencyLogo);