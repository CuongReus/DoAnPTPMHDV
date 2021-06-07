import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, StatusBar, FlatList,Image,ImageBackground } from "react-native";
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    Text,
    Left,
    Right,
    Body,
    Item,
    Input,
    Form,
    Textarea,
    Footer,
    FooterTab,
    ListItem,
    Thumbnail,
    Card,
    CardItem,
    Picker,
    View,
    Label,
    Spinner
} from "native-base";
import styles from "../commonStyles";
import agent from '../../services/agent';
import moment from 'moment';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RenderPicker, RenderTextArea, RenderDatePicker, RenderTextInput, RenderNumberInput, RenderSelect } from "../../components/formInputs";
import FooterComponent from "../footer/FooterComponent";
import commonStyles from "../commonStyles";
const drawerCover = require("../../../assets/Logo_TamAn.png");
const backgroundImage = require("../../../assets/boxed_bg_retina.png");

const style = 
    {
      bodyStyle: {marginBottom:20},
      textStyle: {fontWeight:'bold'}
    }

const validate = values => {
    const errors = {};

    return errors;
}

const mapStateToProps = state => {
    var updateValue = {

    };
    return {

        currentUser: state.common.currentUser,

    };
};
const mapDispatchToProps = dispatch => ({

});


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {

        }

    }

    componentWillMount() {

    }
    componentWillUnmount() {
// alert("Hello  Goodbye my lover!")
    }
    onScrollEnd(e) {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;
        // Divide the horizontal offset by the width of the view to see which page is visible
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        console.log('scrolled to page ', pageNum);
    }


    render() {
        const {currentUser}= this.props;
    //    this.props.navigation.navigate(screens);
    if(!currentUser){
        return   <Spinner color='red' />
    }
        return (
            <Container style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Header>
                    <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                        <Icon name="apps" />
                    </Button>
                    <Body>
                        <Title>Màn Hình Chính</Title>
                    </Body>
                </Header>
                <Content style={{ margin: '2%'}} >
                <Card style={{ alignItems: 'center' }} >
                <CardItem header>

<Text >Màn Hình Chính</Text>
</CardItem>
<CardItem>
<Image source={drawerCover} style={{height: 80, flex: 1}}/>
{/* <Image source={drawerCover} /> */}
</CardItem>
                </Card>
                    <Card style={{alignItems: 'center' }} >
                        <CardItem body>
                            <Text  style={style.textStyle}>Nhân Sự</Text>
                        </CardItem>
                        <CardItem >
                            <Body style={style.bodyStyle}>
                                <Grid  >
                                    <Col style={{ alignItems: 'center' }}>
                                        <Icon onPress={() => this.props.navigation.navigate("LeaveDayList", {id: currentUser.id})} style={commonStyles.shadow} name='paper' />
                                        <Text>Ngày Phép</Text>
                                    </Col>
                                    <Col style={{ alignItems: 'center' }}><Icon style={commonStyles.shadow} name='bookmarks' />
                                        <Text>Chấm Công</Text>
                                    </Col>
                                </Grid>


                            </Body>
                        </CardItem>
                        <CardItem body>
                            <Text style={style.textStyle}>Nhân Công</Text>
                        </CardItem>
                        <CardItem >
                            <Body style={style.bodyStyle}>
                                <Grid >
                                    <Col style={{ alignItems: 'center' }}>
                                    <Icon style={commonStyles.shadow} name='calendar' />
                                        <Text>Lịch Làm Việc</Text>
                                    </Col>
                                    <Col style={{ alignItems: 'center' }}><Icon style={commonStyles.shadow} name='calendar' />
                                        <Text>Chấm Công</Text>
                                    </Col>
                                </Grid>


                            </Body>
                        </CardItem>
                        <CardItem body>
                            <Text style={style.textStyle}>Kho & Mua Hàng</Text>
                        </CardItem>
                        <CardItem >
                            <Body style={style.bodyStyle}>
                                <Grid >
                                    <Col style={{ alignItems: 'center' }}>
                                        <Icon style={commonStyles.shadow} name='home' />
                                        <Text>Theo Dỗi Kho</Text>
                                    </Col>
                                    <Col style={{ alignItems: 'center' }}>
                                        <Icon style={commonStyles.shadow} name='cart' />
                                        <Text>Theo Dỗi Mua Hàng</Text>
                                    </Col>
                                </Grid>
                            </Body>
                        </CardItem>
                        <CardItem body>
                            <Text style={style.textStyle}>Dự Án</Text>
                        </CardItem>
                        <CardItem >
                            <Body style={style.bodyStyle}>
                                <Grid >
                                    <Col style={{ alignItems: 'center' }}>
                                        <Icon style={commonStyles.shadow} name='pie' />
                                        <Text>Theo Dỗi Công Việc</Text>
                                    </Col>
                                    <Col style={{ alignItems: 'center' }}>
                                        <Icon style={commonStyles.shadow} type="AntDesign" name='linechart' />
                                        <Text>Báo Cáo</Text>
                                    </Col>
                                </Grid>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            <FooterComponent {...this.props}></FooterComponent>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'Dashboard',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(Dashboard));
// export default Dashboard;

