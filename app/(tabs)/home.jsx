import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import SearchInput from "../../components/search-input";
import Trending from "../../components/trending";
import EmptyState from "../../components/empty-state";

const Home = () => {
  const [refreshing, setRefresing] = useState();

  const onRefresh = async () => {
    setRefresing(true);

    // re call videos

    setRefresing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <Text className="text-3xl text-white">{item.id}</Text>;
        }}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JS Mastery
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Video
              </Text>

              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Videos Found!"
              subTitle="Be the first one to upload video"
            />
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
