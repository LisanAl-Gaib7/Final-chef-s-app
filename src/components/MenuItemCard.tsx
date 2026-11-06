import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { MenuItem } from "../types";
import { colors, spacing, radius, fontSize } from "../theme";

// Small emoji per course so each card has a bit of visual identity.
const COURSE_EMOJI: Record<string, string> = {
  Starter: "🥗",
  Main: "🍽️",
  Dessert: "🍰",
  Drink: "🥤",
};

interface Props {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

export default function MenuItemCard({ item, onEdit, onDelete }: Props) {
  function confirmDelete() {
    Alert.alert(
      "Delete menu item",
      `Are you sure you want to remove "${item.name}" from the menu?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(item.id),
        },
      ]
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>{COURSE_EMOJI[item.course] ?? "🍴"}</Text>
        </View>

        <View style={styles.nameCoursePriceWrapper}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
          </View>
          <Text style={styles.course}>{item.course.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={3}>
        {item.description}
      </Text>

      {/* Action buttons for edit & delete (Requirement 1) */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(item)}
          accessibilityRole="button"
          accessibilityLabel={`Edit ${item.name}`}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={confirmDelete}
          accessibilityRole="button"
          accessibilityLabel={`Delete ${item.name}`}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  icon: {
    fontSize: 22,
  },
  nameCoursePriceWrapper: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: fontSize.subtitle,
    fontWeight: "700",
    color: colors.textDark,
    flexShrink: 1,
    marginRight: spacing.sm,
  },
  price: {
    fontSize: fontSize.price,
    fontWeight: "700",
    color: colors.primary,
  },
  course: {
    fontSize: fontSize.label,
    fontWeight: "600",
    color: colors.primary,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: fontSize.body,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
  },
  editButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.sm,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editButtonText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: fontSize.label,
  },
  deleteButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.sm,
    backgroundColor: "#FDECEC",
    borderWidth: 1,
    borderColor: colors.danger,
  },
  deleteButtonText: {
    color: colors.danger,
    fontWeight: "600",
    fontSize: fontSize.label,
  },
});
