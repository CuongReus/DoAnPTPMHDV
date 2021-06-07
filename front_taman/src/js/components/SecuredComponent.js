import React from 'react';
import { connect } from 'react-redux';
import { SecurityUtils } from '../utils/javascriptUtils';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});



class SecuredComponent  extends React.Component {
    constructor() {
        super();
    };
     
    render() {
        const {currentUser, children, allowedPermission} = this.props;
        if (!currentUser || !SecurityUtils.hasPermission(currentUser, allowedPermission)) {
            // no permission, not show anything
            return null;
        } else {
            return children;
        }

        
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecuredComponent);