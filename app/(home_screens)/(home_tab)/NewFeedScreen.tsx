import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import BodyContainer from "@/components/ui/BodyContainer";
import { useCreateFeed } from "@/hooks/Feeds/useCreateFeed";
import { hp, wp } from "@/resources/dimensions";
import { router } from "expo-router";
import { useFormik } from "formik";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
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
  image: Yup.string().optional(),
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
    resetForm,
  } = useFormik({
    initialValues: { title: "", description: "", creatorName: "" },
    validationSchema,
    onSubmit: async (values) => {
      const result = await createFeed(values);
      if (result.success) {
        console.log("Feed created successfully");
        resetForm();
        Toast.show({
          type: "success",
          text1: "Feed created successfully",
        });
        router.navigate("/(home_screens)");
      } else {
        console.log("Failed to create feed");
        Toast.show({
          type: "error",
          text1: "Failed to create feed",
        });
      }
    },
  });

  return (
    <BodyContainer style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.bodyContainer}>
          <View style={styles.titleContainer}>
            <ThemedText type="title">New Feed</ThemedText>
          </View>

          <View style={styles.inputContainer}>
            <ThemedText type="default">Game Title</ThemedText>
            <ThemedTextInput
              placeholder="Enter game title"
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              value={values.title}
              error={errors.title}
              touched={touched.title}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText type="default">Game Description</ThemedText>
            <ThemedTextInput
              multiline={true}
              placeholder="Enter game description"
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              error={errors.description}
              touched={touched.description}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText type="default">Creator Name(Optional)</ThemedText>
            <ThemedTextInput
              placeholder="Enter creator name"
              onChangeText={handleChange("creatorName")}
              onBlur={handleBlur("creatorName")}
              value={values.creatorName}
              error={errors.creatorName}
              touched={touched.creatorName}
            />
          </View>
          <ThemedButton
            title={"Submit"}
            onPress={() => handleSubmit()}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </ThemedView>
      </ScrollView>
    </BodyContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  scrollView: {
    flex: 1,
    width: "100%",
    paddingHorizontal: wp(4),
  },
  bodyContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: hp(2),
  },
  previewImage: {
    width: 200,
    height: 200,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  titleContainer: {
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "column",
    gap: hp(1),
  },
});
