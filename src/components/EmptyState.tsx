import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "../theme";

// Requirement 4 (Improve the UX): "a suitable message when no menu items
// have been added". This is that message.
export default function EmptyState() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.emoji}>🍽️</Text>
      <Text style={styles.title}>No dishes yet</Text>
      <Text style={styles.subtitle}>
        Tap the + button above to add your first menu item.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.subtitle,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.body,
    color: colors.textMuted,
    textAlign: "center",
  },
});
