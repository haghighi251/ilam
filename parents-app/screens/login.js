import React from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import theme from "../config/theme";
import { useNavigation } from "@react-navigation/native";

const LogoImage = require("../assets/img/logo.svg");
const LoginScreen = () => {
  const [mobile, onChangeMobile] = React.useState("");
  const onPress = () => {};
  return (
    <Container>
      <Row>
        <Col>
          <Logo source={LogoImage} />
          <Title>سرویس مدارس (اولیا)</Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Label>شماره موبایل خود را وارد کنید</Label>
          <MobileInput
            onChangeText={onChangeMobile}
            value={mobile}
            placeholder="0911*******"
            keyboardType="numeric"
          />
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
`;
const Title = styled.Text`
  font-family: ${theme.typography.heading1.fontFamily};
  font-size: ${theme.typography.heading1.fontSize};
  color: ${theme.colors.four};
  text-align: center;
`;
const Label = styled.Text`
  font-family: ${theme.typography.heading5.fontFamily};
  font-size: ${theme.typography.heading5.fontSize};
  color: ${theme.colors.defaultTextColor};
  text-align: center;
  margin-bottom: 10px;
`;
const MobileInput = styled.TextInput`
  font-family: ${theme.typography.heading6.fontFamily};
  font-size: ${theme.typography.heading6.fontSize};
  color: ${theme.colors.defaultTextColor};
  text-align: center;
  background-color: white;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  border: 1px solid ${theme.colors.defaultTextColor};
  border-radius: 8px;
  margin-bottom: 20px;
`;
const Logo = styled.Image`
  width: 50px;
`;
const SubmitButton = styled.TouchableOpacity`
  background-color: ${theme.colors.three};
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid ${theme.colors.three};
  border-radius: 8px;
  padding: 10px;
`;
const ButtonTitle = styled.Text`
  font-family: ${theme.typography.heading6.fontFamily};
  font-size: ${theme.typography.heading6.fontSize};
  color: ${theme.colors.defaultTextColor};
  text-align: center;
`;
export default LoginScreen;
