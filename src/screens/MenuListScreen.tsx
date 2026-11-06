import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { MenuItem, Course, COURSES } from "../types";
import MenuItemCard from "../components/MenuItemCard";
import EmptyState from "../components/EmptyState";
import { colors, spacing, radius, fontSize } from "../theme";

interface Props {
  items: MenuItem[];
  onAddPress: () => void;
  onEditPress: (item: MenuItem) => void;
  onDeletePress: (id: string) => void;
}

// Filter options include "All" plus every course.
type FilterCourse = "All" | Course;

export default function MenuListScreen({
  items,
  onAddPress,
  onEditPress,
  onDeletePress,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<FilterCourse>("All");

  // Derive the visible list from search + filter (Requirement 2).
  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      const matchesName =
        query.length === 0 || item.name.toLowerCase().includes(query);
      const matchesCourse =
        courseFilter === "All" || item.course === courseFilter;
      return matchesName && matchesCourse;
    });
  }, [items, searchQuery, courseFilter]);

  // Statistics (Requirement 3) – always computed from the full menu, not the filter.
  const stats = useMemo(() => {
    const total = items.length;
    const averagePrice =
      total === 0
        ? 0
        : items.reduce((sum, item) => sum + item.price, 0) / total;

    const byCourse: Record<Course, number> = {
      Starter: 0,
      Main: 0,
      Dessert: 0,
      Drink: 0,
    };
    items.forEach((item) => {
      byCourse[item.course] += 1;
    });

    return { total, averagePrice, byCourse };
  }, [items]);

  function clearSearchAndFilter() {
    setSearchQuery("");
    setCourseFilter("All");
  }

  const hasActiveFilters =
    searchQuery.trim().length > 0 || courseFilter !== "All";

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🍴 Menu</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={onAddPress}
          accessibilityLabel="Add a new menu item"
          accessibilityRole="button"
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Statistics panel (Requirement 3) */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>Menu Overview</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total items</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              R{stats.averagePrice.toFixed(2)}
            </Text>
            <Text style={styles.statLabel}>Avg price</Text>
          </View>
        </View>
        <View style={styles.courseStatsRow}>
          {COURSES.map((c) => (
            <View key={c} style={styles.courseStat}>
              <Text style={styles.courseStatCount}>{stats.byCourse[c]}</Text>
              <Text style={styles.courseStatLabel}>{c}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Search bar (Requirement 2) */}
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by dish name…"
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Course filter chips (Requirement 2) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {(["All", ...COURSES] as FilterCourse[]).map((c) => {
          const selected = courseFilter === c;
          return (
            <TouchableOpacity
              key={c}
              style={[styles.chip, selected && styles.chipSelected]}
              onPress={() => setCourseFilter(c)}
            >
              <Text
                style={[styles.chipText, selected && styles.chipTextSelected]}
              >
                {c}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Count + clear */}
      <View style={styles.countRow}>
        <Text style={styles.countLabel}>
          {filteredItems.length}{" "}
          {filteredItems.length === 1 ? "item" : "items"}
          {hasActiveFilters ? " (filtered)" : " on the menu"}
        </Text>
        {hasActiveFilters && (
          <TouchableOpacity onPress={clearSearchAndFilter}>
            <Text style={styles.clearLink}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItemCard
            item={item}
            onEdit={onEditPress}
            onDelete={onDeletePress}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          items.length === 0 ? (
            <EmptyState />
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsTitle}>No matching dishes</Text>
              <Text style={styles.noResultsSubtitle}>
                Try a different name or clear the filters.
              </Text>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearSearchAndFilter}
              >
                <Text style={styles.clearButtonText}>Clear search & filter</Text>
              </TouchableOpacity>
            </View>
          )
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: "700",
    color: colors.textDark,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginTop: -2,
  },

  // Stats
  statsCard: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsTitle: {
    fontSize: fontSize.label,
    fontWeight: "700",
    color: colors.textMuted,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: spacing.sm,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary,
  },
  statLabel: {
    fontSize: fontSize.label,
    color: colors.textMuted,
    marginTop: 2,
  },
  courseStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  courseStat: {
    alignItems: "center",
    flex: 1,
  },
  courseStatCount: {
    fontSize: fontSize.subtitle,
    fontWeight: "700",
    color: colors.textDark,
  },
  courseStatLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },

  // Search
  searchWrapper: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.body,
    color: colors.textDark,
  },

  // Filter chips
  filterRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.xs,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: fontSize.label,
    fontWeight: "600",
    color: colors.textDark,
  },
  chipTextSelected: {
    color: "#FFFFFF",
  },

  // Count row
  countRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  countLabel: {
    fontSize: fontSize.label,
    color: colors.textMuted,
  },
  clearLink: {
    fontSize: fontSize.label,
    color: colors.primary,
    fontWeight: "600",
  },

  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },

  // No results (when filters active but nothing matches)
  noResults: {
    alignItems: "center",
    paddingTop: spacing.xl * 2,
    paddingHorizontal: spacing.lg,
  },
  noResultsTitle: {
    fontSize: fontSize.subtitle,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  noResultsSubtitle: {
    fontSize: fontSize.body,
    color: colors.textMuted,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  clearButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: fontSize.body,
  },
});
