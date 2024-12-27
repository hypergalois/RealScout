import {
  View,
  Text,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

const SignIn = () => {
  const { user, loading, isLoggedIn, refetch } = useGlobalContext();
  const { width, height } = useWindowDimensions();

  const isLargeScreen = width >= 1024;

  const handleSignIn = async () => {
    const result = await login();

    if (result) {
      // console.log("Logged in successfully");
      refetch();
    } else {
      Alert.alert("Error", "Failed to login with Google");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="flex-1 items-center justify-center">
        <Image
          source={images.onboarding}
          style={{
            width: isLargeScreen ? "50%" : "100%",
            height: isLargeScreen ? "50%" : "60%",
          }}
          resizeMode="contain"
        />

        <View
          style={{
            paddingHorizontal: isLargeScreen ? 80 : 20,
            maxWidth: 600,
            width: "100%",
          }}
        >
          <Text
            className="text-base text-center uppercase font-rubik text-black-200 mb-6 tracking-[0.1em]"
            style={{
              fontSize: isLargeScreen ? 18 : 14,
            }}
          >
            Welcome to RealScout
          </Text>
          <Text
            className="text-4xl font-rubik-bold text-black-300 text-center mt-2"
            style={{
              fontSize: isLargeScreen ? 36 : 24,
            }}
          >
            Let's Get You Closer To {"\n"}
            <Text
              className="text-primary-300"
              style={{
                color: "#007bff",
                fontSize: isLargeScreen ? 36 : 24,
              }}
            >
              Your Dream Home
            </Text>
          </Text>

          <Text
            className="text-lg font-rubik text-center font-black-200 mt-10"
            style={{
              fontSize: isLargeScreen ? 20 : 16,
            }}
          >
            Login with Google
          </Text>

          <TouchableOpacity
            onPress={handleSignIn}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
            style={{
              marginTop: isLargeScreen ? 20 : 10,
              paddingVertical: isLargeScreen ? 16 : 12,
              shadowOpacity: 0.2,
            }}
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                style={{
                  width: isLargeScreen ? 32 : 24,
                  height: isLargeScreen ? 32 : 24,
                }}
                resizeMode="contain"
              />
              <Text
                className="text-lg font-rubik-medium text-black-300 ml-2"
                style={{
                  fontSize: isLargeScreen ? 18 : 14,
                }}
              >
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
