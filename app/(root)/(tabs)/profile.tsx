import {
  Alert,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

import icons from "@/constants/icons";
import { settings } from "@/constants/data";

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <Image source={icon} style={{ width: 24, height: 24 }} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          color: "#343a40",
          ...(textStyle ? { color: "#dc3545" } : {}),
        }}
      >
        {title}
      </Text>
    </View>

    {showArrow && (
      <Image source={icons.rightArrow} style={{ width: 20, height: 20 }} />
    )}
  </TouchableOpacity>
);

const Profile = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024; // Detectar pantallas grandes (iPads y web)

  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "Logged out successfully");
      refetch();
    } else {
      Alert.alert("Error", "Failed to logout");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 32,
          paddingHorizontal: isLargeScreen ? 40 : 20,
        }}
      >
        {/* Cabecera */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: isLargeScreen ? 24 : 20,
              fontWeight: "700",
              color: "#343a40",
            }}
          >
            Profile
          </Text>
          <Image source={icons.bell} style={{ width: 20, height: 20 }} />
        </View>

        {/* Avatar */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <View style={{ alignItems: "center", position: "relative" }}>
            <Image
              source={{ uri: user?.avatar }}
              style={{
                width: isLargeScreen ? 120 : 100,
                height: isLargeScreen ? 120 : 100,
                borderRadius: 60,
              }}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "#ffffff",
                borderRadius: 9999,
                padding: 8,
                elevation: 3,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 5,
              }}
            >
              <Image source={icons.edit} style={{ width: 28, height: 28 }} />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: isLargeScreen ? 22 : 20,
                fontWeight: "700",
                marginTop: 10,
                color: "#343a40",
              }}
            >
              {user?.name}
            </Text>
          </View>
        </View>

        {/* Opciones de Configuración */}
        <View style={{ marginTop: 40 }}>
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        <View
          style={{
            marginTop: 20,
            borderTopWidth: 1,
            borderTopColor: "#e9ecef",
            paddingTop: 20,
          }}
        >
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        {/* Logout */}
        <View
          style={{
            marginTop: 20,
            borderTopWidth: 1,
            borderTopColor: "#e9ecef",
            paddingTop: 20,
          }}
        >
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
