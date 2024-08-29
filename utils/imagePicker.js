import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    // aspect: [4, 3],
    quality: 0.4,
  });

  console.log("result of image picker", result.assets[0].uri);

  if (!result.canceled) {
    return result;
  } else return null;
};
