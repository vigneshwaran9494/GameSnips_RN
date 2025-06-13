import { useCreateFeed } from "@/hooks/Feeds/useCreateFeed";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import React from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Yup from "yup";

/*
 * validationSchema is used to validate the form fields
 */
const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(100, "Description must be less than 100 characters"),
  creatorName: Yup.string().optional(),
  image: Yup.string().required("Image is required"),
});

export default function NewFeedScreen() {
  const { createFeed, isLoading } = useCreateFeed();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: { title: "", description: "", creatorName: "", image: "" },
    validationSchema,
    onSubmit: async (values) => {
      const result = await createFeed(values);
      if (result.success) {
        console.log("Feed created successfully");
      } else {
        console.log("Failed to create feed");
      }
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFieldValue("image", result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.bodyContainer}>
          <Text>Game Title</Text>
          <TextInput
            placeholder="Game Title"
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            value={values.title}
          />
          {touched.title && errors.title && (
            <Text style={styles.errorText}>{errors.title}</Text>
          )}
          <Text>Game Description</Text>
          <TextInput
            multiline={true}
            placeholder="Game Description"
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            value={values.description}
          />
          {touched.description && errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}
          <Text>Creator Name(Optional)</Text>
          <TextInput
            placeholder="Creator Name"
            onChangeText={handleChange("creatorName")}
            onBlur={handleBlur("creatorName")}
            value={values.creatorName}
          />
          {touched.creatorName && errors.creatorName && (
            <Text style={styles.errorText}>{errors.creatorName}</Text>
          )}
          <Text>Preview Image</Text>
          <Button title="Pick Image" onPress={pickImage} />
          {values.image && (
            <Image source={{ uri: values.image }} style={styles.previewImage} />
          )}
          {touched.image && errors.image && (
            <Text style={styles.errorText}>{errors.image}</Text>
          )}

          <Button
            title={isLoading ? "Creating..." : "Submit"}
            onPress={() => handleSubmit()}
            disabled={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    flexDirection: "column",
    gap: 10,
  },
  previewImage: {
    width: 200,
    height: 200,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
