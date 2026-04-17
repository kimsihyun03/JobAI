import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// 파일이 모두 같은 위치(root)에 있으므로 ./ 를 정확히 붙여줍니다.
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import ProfileSetup from "./ProfileSetup";
import Dashboard from "./Dashboard"; // Dashboard.js가 반드시 존재해야 함
import Chat from "./Chat";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* initialRouteName을 Login으로 설정해서 차근차근 확인합시다. */}
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}