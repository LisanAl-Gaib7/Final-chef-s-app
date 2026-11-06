import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Course, COURSES, MenuItem } from "../types";
import { colors, spacing, radius, fontSize } from "../theme";

interface Props {
  // When provided, the form is in "edit" mode and fields are pre-filled.
  initialItem?: MenuItem | null;
  onSave: (item: Omit<MenuItem, "id">) => void;
  onCancel: () => void;
}

interface FormErrors {
  name: string;
  description: string;
  price: string;
}

const EMPTY_ERRORS: FormErrors = { name: "", description: "", price: "" };

export default function AddMenuItemScreen({
  initialItem,
  onSave,
  onCancel,
}: Props) {
  const isEditing = Boolean(initialItem);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState<Course>("Starter");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState<FormErrors>(EMPTY_ERRORS);
  const [savedMessageVisible, setSavedMessageVisible] = useState(false);

  // Prefill when editing.
  useEffect(() => {
    if (initialItem) {
      setName(initialItem.name);
      setDescription(initialItem.description);
      setCourse(initialItem.course);
      setPrice(String(initialItem.price));
    } else {
      setName("");
      setDescription("");
      setCourse("Starter");
      setPrice("");
    }
    setErrors(EMPTY_ERRORS);
    setSavedMessageVisible(false);
  }, [initialItem]);

  function validate(): boolean {
    const nextErrors: FormErrors = { ...EMPTY_ERRORS };
    let isValid = true;

    if (name.trim().length === 0) {
      nextErrors.name = "Please enter the dish name.";
      isValid = false;
    }

    if (description.trim().length === 0) {
      nextErrors.description = "Please enter a short description.";
      isValid = false;
    }

    const priceNumber = Number(price);
    if (price.trim().length === 0) {
      nextErrors.price = "Please enter a price.";
      isValid = false;
    } else if (Number.isNaN(priceNumber) || priceNumber <= 0) {
      nextErrors.price = "Price must be a number greater than 0.";
      isValid = false;
    }

    setErrors(nextErrors);
    return isValid;
  }

  function handleSave() {
    setSavedMessageVisible(false);
    if (!validate()) {
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      course,
      price: Number(price),
    });

    // For create we show a brief confirmation; parent navigates for edit.
    if (!isEditing) {
      setName("");
      setDescription("");
      setCourse("Starter");
      setPrice("");
      setErrors(EMPTY_ERRORS);
      setSavedMessageVisible(true);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel} accessibilityRole="button">
            <Text style={styles.backButton}>‹ Menu</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            {isEditing ? "Edit Menu Item" : "Add Menu Item"}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.formContent}
          keyboardShouldPersistTaps="handled"
        >
          {savedMessageVisible && (
            <View style={styles.successBanner}>
              <Text style={styles.successText}>
                ✅ Menu item saved successfully.
              </Text>
            </View>
          )}

          {/* Dish name */}
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={[styles.input, errors.name ? styles.inputError : null]}
            placeholder="e.g. Garlic Bread"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[
              styles.input,
              styles.multilineInput,
              errors.description ? styles.inputError : null,
            ]}
            placeholder="Short description of the dish"
            placeholderTextColor={colors.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
          {errors.description ? (
            <Text style={styles.errorText}>{errors.description}</Text>
          ) : null}

          {/* Course */}
          <Text style={styles.label}>Course</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={course}
              onValueChange={(value) => setCourse(value as Course)}
            >
              {COURSES.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>
          </View>

          {/* Price */}
          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={[styles.input, errors.price ? styles.inputError : null]}
            placeholder="e.g. 45.00"
            placeholderTextColor={colors.textMuted}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          {errors.price ? (
            <Text style={styles.errorText}>{errors.price}</Text>
          ) : null}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {isEditing ? "Update Menu Item" : "Save Menu Item"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  backButton: {
    color: colors.primary,
    fontSize: fontSize.subtitle,
    fontWeight: "600",
  },
  headerSpacer: {
    width: 50,
  },
  title: {
    fontSize: fontSize.subtitle,
    fontWeight: "700",
    color: colors.textDark,
  },
  formContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  successBanner: {
    backgroundColor: "#E7F5E8",
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  successText: {
    color: colors.success,
    fontWeight: "600",
    fontSize: fontSize.body,
  },
  label: {
    fontSize: fontSize.label,
    fontWeight: "600",
    color: colors.textDark,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.body,
    color: colors.textDark,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSize.label,
    marginTop: spacing.xs,
  },
  pickerWrapper: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    overflow: "hidden",
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: fontSize.subtitle,
    fontWeight: "700",
  },
});
