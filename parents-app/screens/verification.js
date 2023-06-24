import React from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import theme from "../config/theme";
import { useNavigation } from "@react-navigation/native";

const LogoImage = require("../assets/img/logo.svg");
const VerificationScreen = () => {
  const [mobile, onChangeMobile] = React.useState("");
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("Main");
  };
  return (
    <Container>
      <Row>
        <Col>
          <Logo source={LogoImage} />
          <Title>کد تایید و کد راننده</Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>کد تایید پیامک شده:</Label>
          <MobileInput
            onChangeText={onChangeMobile}
            value={mobile}
            placeholder="0911*******"
            keyboardType="numeric"
          />
          <SubTitle>کد تاییدی که به شماره موبایل شما ارسال شد</SubTitle>
          <Label>کد راننده:</Label>
          <MobileInput
            onChangeText={onChangeMobile}
            value={mobile}
            placeholder="0911*******"
            keyboardType="numeric"
          />
          <SubTitle>کد راننده دریافتی از مدرسه</SubTitle>
          <SubmitButton onPress={onPress}>
            <ButtonTitle>ورود</ButtonTitle>
          </SubmitButton>
        </Col>
      </Row>
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  max-width: 100%;
  flex-direction: column;
  background: ${theme.colors.one};
`;
const Row = styled.View`
  flex: 1;
  flex-direction: row;
`;
const Col = styled.View`
  flex: 1;
  align-self: center;
  text-align: center;
  padding-horizontal: 20px;
`;
const Title = styled.Text`
  font-family: ${theme.typography.heading1.fontFamily};
  font-size: ${theme.typography.heading1.fontSize};
  color: ${theme.colors.four};
  text-align: center;
`;
const Label = styled.Text`
  font-family: ${theme.typography.heading6.fontFamily};
  font-size: ${theme.typography.heading6.fontSize};
  color: ${theme.colors.defaultTextColor};
  text-align: right;
  margin-bottom: 10px;
`;
const SubTitle = styled.Text`
  font-family: ${theme.typography.productSubTitle.fontFamily};
  font-size: ${theme.typography.productSubTitle.fontSize};
  color: ${theme.colors.lightTextColor};
  text-align: right;
  margin-bottom: 20px;
`;
const MobileInput = styled.TextInput`
  font-family: ${theme.typography.heading6.fontFamily};
  font-size: ${theme.typography.heading6.fontSize};
  color: ${theme.colors.defaultTextColor};
  text-align: center;
  background-color: white;
  width: 100%;
  padding: 10px;
  border: 1px solid ${theme.colors.defaultTextColor};
  border-radius: 8px;
`;
const Logo = styled.Image`
  width: 50px;
`;
const SubmitButton = styled.TouchableOpacity`
  background-color: ${theme.colors.three};
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid ${theme.colors.three};
  border-radius: 8px;
  padding: 10px;
  margin-top: 30px;
`;
const ButtonTitle = styled.Text`
  font-family: ${theme.typography.heading6.fontFamily};
  font-size: ${theme.typography.heading6.fontSize};
  color: ${theme.colors.defaultTextColor};
  text-align: center;
`;
export default VerificationScreen;
