import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import Search from "@/components/Search";
import { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";

import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";

const Explore = () => {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024; // Pantallas de iPad y web

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
    });
  }, [params.filter, params.query]);

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties}
        numColumns={isLargeScreen ? 3 : 2}
        renderItem={({ item }) => (
          <Card
            item={item}
            onPress={() => handleCardPress(item.$id)}
            style={{
              flex: 1,
              marginHorizontal: isLargeScreen ? 15 : 10,
              marginVertical: 10,
            }}
          />
        )}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={{
          paddingBottom: 32,
          paddingHorizontal: isLargeScreen ? 20 : 10,
        }}
        columnWrapperStyle={{
          justifyContent: isLargeScreen ? "space-between" : "flex-start",
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              size="large"
              color="#007bff"
              style={{ marginTop: 20 }}
            />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={() => (
          <View
            style={{
              paddingHorizontal: isLargeScreen ? 20 : 10,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  flexDirection: "row",
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

              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: isLargeScreen ? 18 : 16,
                  fontWeight: "500",
                  color: "#343a40",
                }}
              >
                Search for Your Ideal Home
              </Text>
              <Image
                source={icons.bell}
                style={{
                  width: isLargeScreen ? 28 : 24,
                  height: isLargeScreen ? 28 : 24,
                }}
              />
            </View>

            <Search />

            <View style={{ marginTop: 20 }}>
              <Filters />

              <Text
                style={{
                  fontSize: isLargeScreen ? 22 : 18,
                  fontWeight: "bold",
                  color: "#343a40",
                  marginTop: 20,
                }}
              >
                Found {properties?.length || 0} Properties
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Explore;
