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
                        <Title>M??n H??nh Ch??nh</Title>
                    </Body>
                </Header>
                <Content style={{ margin: '2%'}} >
                <Card style={{ alignItems: 'center' }} >
                <CardItem header>

<Text >M??n H??nh Ch??nh</Text>
</CardItem>
<CardItem>
<Image source={drawerCover} style={{height: 80, flex: 1}}/>
{/* <Image source={drawerCover} /> */}
</CardItem>
                </Card>
                    <Card style={{alignItems: 'center' }} >
                        <CardItem body>
                            <Text  style={style.textStyle}>Nh??n S???</Text>
                        </CardItem>
                        <CardItem >
                            <Body style={style.bodyStyle}>
                                <Grid  >
                                    <Col style={{ alignItems: 'center' }}>
                                        <Icon onPress={() => this.props.navigation.navigate("LeaveDayList", {id: currentUser.id})} style={commonStyles.shadow} name='paper' />
                                        <Text>Ng??y Ph??p</Text>
                                    </Col>
                                    <Col style={{ alignItems: 'center' }}><Icon style={commonStyles.shadow} name='bookmarks' />
                                        <Text>Ch???m C??ng</Text>
                                    </Col>
                                </Grid>


                            </Body>
                        </CardItem>
                        <CardItem body>
                            <Text style={style.textStyle}>Nh??n C??ng</Text>
                        </CardItem>
                        <CardItem >
                            <Body style={style.bodyStyle}>
                                <Grid >
                                    <Col style={{ alignItems: 'center' }}>
                                    <Icon style={commonStyles.shadow} name='calendar' />
                                        <Text>L???ch L??m Vi???c</Text>
                                    </Col>
                                    <Col style={{ alignItems: 'center' }}><Icon style={commonStyles.shadow} name='calendar' />
                                        <Text>Ch???m C??ng</Text>
                                    </Col>
                                </Grid>


                            </Body>
                        </CardItem>
                        <CardItem body>
                            <Text style={style.textStyle}>Kho & Mua H??ng</Text>
                        </CardItem>
                        <CardItem >
                            <Body style={style.bodyStyle}>
                                <Grid >
                                    <Col style={{ alignItems: 'center' }}>
                                        <Icon style={commonStyles.shadow} name='home' />
                                        <Text>Theo D???i Kho</Text>
                                    </Col>
                                    <Col style={{ alignItems: 'center' }}>
                                        <Icon style={commonStyles.shadow} name='cart' />
                                        <Text>Theo D???i Mua H??ng</Text>
                                    </Col>
                                </Grid>
                            </Body>
                        </CardItem>
                        <CardItem body>
                            <Text style={style.textStyle}>D??? ??n</Text>
                        </CardItem>
                        <CardItem >
                            <Body style={style.bodyStyle}>
                                <Grid >
                                    <Col style={{ alignItems: 'center' }}>
                                        <Icon style={commonStyles.shadow} name='pie' />
                                        <Text>Theo D???i C??ng Vi???c</Text>
                                    </Col>
                                    <Col style={{ alignItems: 'center' }}>
                                        <Icon style={commonStyles.shadow} type="AntDesign" name='linechart' />
                                        <Text>B??o C??o</Text>
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

