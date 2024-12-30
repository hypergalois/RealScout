import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  useWindowDimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import images from "@/constants/images";
import Comment from "@/components/Comment";
import { facilities } from "@/constants/data";

import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";

const Property = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { width, height } = useWindowDimensions();
  const isLargeScreen = width >= 1024; // Detectar pantallas grandes (iPad y web)

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id!,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 32,
          backgroundColor: "#ffffff",
        }}
      >
        {/* Imagen Principal */}
        <View
          style={{
            position: "relative",
            width: "100%",
            height: height / 2,
          }}
        >
          <Image
            source={{ uri: property?.image }}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
          <Image
            source={images.whiteGradient}
            style={{
              position: "absolute",
              top: 0,
              width: "100%",
              height: "30%",
              zIndex: 40,
            }}
          />

          <View
            style={{
              position: "absolute",
              top: Platform.OS === "ios" ? 70 : 20,
              left: 20,
              right: 20,
              zIndex: 50,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: "#d1e7ff",
                  borderRadius: 9999,
                  width: 44,
                  height: 44,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.backArrow}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </TouchableOpacity>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
              >
                <Image
                  source={icons.heart}
                  style={{
                    width: 28,
                    height: 28,
                    tintColor: "#191D31",
                  }}
                />
                <Image
                  source={icons.send}
                  style={{
                    width: 28,
                    height: 28,
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Detalles de la Propiedad */}
        <View
          style={{
            paddingHorizontal: isLargeScreen ? 40 : 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: isLargeScreen ? 28 : 24,
              fontWeight: "800",
              color: "#343a40",
            }}
          >
            {property?.name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              gap: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "#e7f5ff",
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 9999,
              }}
            >
              <Text
                style={{ fontSize: 12, fontWeight: "600", color: "#007bff" }}
              >
                {property?.type}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image source={icons.star} style={{ width: 20, height: 20 }} />
              <Text style={{ fontSize: 14, color: "#6c757d", marginTop: 2 }}>
                {property?.rating} ({property?.reviews.length} reviews)
              </Text>
            </View>
          </View>

          {/* Detalles de la Propiedad */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              gap: 30,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image source={icons.bed} style={{ width: 24, height: 24 }} />
              <Text
                style={{ fontSize: 14, fontWeight: "500", color: "#343a40" }}
              >
                {property?.bedrooms} Beds
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image source={icons.bath} style={{ width: 24, height: 24 }} />
              <Text
                style={{ fontSize: 14, fontWeight: "500", color: "#343a40" }}
              >
                {property?.bathrooms} Baths
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image source={icons.area} style={{ width: 24, height: 24 }} />
              <Text
                style={{ fontSize: 14, fontWeight: "500", color: "#343a40" }}
              >
                {property?.area} sqft
              </Text>
            </View>
          </View>

          {/* Agente */}
          <View
            style={{
              marginTop: 30,
              borderTopWidth: 1,
              borderTopColor: "#e9ecef",
              paddingTop: 20,
            }}
          >
            <Text
              style={{
                fontSize: isLargeScreen ? 22 : 18,
                fontWeight: "700",
                color: "#343a40",
              }}
            >
              Agent
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
              >
                <Image
                  source={{ uri: property?.agent.avatar }}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                  }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#343a40",
                    }}
                  >
                    {property?.agent.name}
                  </Text>
                  <Text style={{ fontSize: 14, color: "#6c757d" }}>
                    {property?.agent.email}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 15 }}>
                <Image source={icons.chat} style={{ width: 28, height: 28 }} />
                <Image source={icons.phone} style={{ width: 28, height: 28 }} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Precio y Botón */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "#ffffff",
          padding: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderTopWidth: 1,
          borderTopColor: "#e9ecef",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ fontSize: 12, color: "#6c757d" }}>Price</Text>
            <Text style={{ fontSize: 24, fontWeight: "800", color: "#007bff" }}>
              ${property?.price}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              marginLeft: 20,
              backgroundColor: "#007bff",
              paddingVertical: 15,
              borderRadius: 9999,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#ffffff" }}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;
