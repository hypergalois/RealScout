import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@/constants/icons";

import Search from "@/components/Search";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import { Card, FeaturedCard } from "@/components/Cards";

import { useAppwrite } from "@/lib/useAppwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { getLatestProperties, getProperties } from "@/lib/appwrite";

const Home = () => {
  const { user } = useGlobalContext();
  const { width } = useWindowDimensions();

  const isLargeScreen = width >= 1024; // Pantallas de iPad y web

  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

  const {
    data: properties,
    refetch,
    loading,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 6,
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
              marginHorizontal: isLargeScreen ? 15 : 10, // Separación horizontal
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: user?.avatar }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                  }}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 12, color: "#6c757d" }}>
                    Good Morning
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#343a40",
                    }}
                  >
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} style={{ width: 24, height: 24 }} />
            </View>

            <Search />

            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#343a40" }}
                >
                  Featured
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#007bff",
                    }}
                  >
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {latestPropertiesLoading ? (
                <ActivityIndicator
                  size="large"
                  color="#007bff"
                  style={{ marginTop: 10 }}
                />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <FeaturedCard
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                      style={{
                        marginHorizontal: isLargeScreen ? 15 : 10, // Separación horizontal
                      }}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    marginTop: 10,
                    paddingHorizontal: isLargeScreen ? 20 : 10,
                  }}
                />
              )}
            </View>

            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", color: "#343a40" }}
                >
                  Our Recommendation
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#007bff",
                    }}
                  >
                    See all
                  </Text>
                </TouchableOpacity>
              </View>
              <Filters />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
