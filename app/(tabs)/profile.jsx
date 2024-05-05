import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyState from "../../components/empty-state";
import { getUserPosts, signout } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/video-card";
import { useGlobalContext } from "../../context/global-provider";
import { icons } from "../../constants";
import InfoBox from "../../components/info-box";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const [refreshing, setRefresing] = useState();

  const onRefresh = async () => {
    setRefresing(true);

    // re call videos
    await refetch();

    setRefresing(false);
  };

  const logout = async () => {
    await signout();
    setUser(null);
    setIsLoggedIn(false);

    console.log("Logout", user);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return <VideoCard video={item} />;
        }}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyle="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subTitle="Posts"
                containerStyles="mr-10"
                titleStyle="text-xl"
              />
              <InfoBox title="15k" subTitle="Followers" titleStyle="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Videos Found!"
              subTitle="No videos found for this search query"
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

export default Profile;
