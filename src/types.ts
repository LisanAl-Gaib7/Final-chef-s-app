// A single dish on the menu.
// Matches "What information must the application store?" from Part 1:
// name, description, category (course) and price.

export type Course = "Starter" | "Main" | "Dessert" | "Drink";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
}

export const COURSES: Course[] = ["Starter", "Main", "Dessert", "Drink"];
