Chef's Menu Manager — Final POE (Enhanced)

A working React Native + TypeScript app for the Chef's Menu Manager.
Built on the Part 2 foundation and extended with full management, search/filter,
statistics and polished UX.

What it does

 1. Manage Menu Items
- **Add** a new dish (name, description, course, price)
- **Edit** an existing dish – tap “Edit” on any card, change the details, tap Update
- **Delete** a dish – tap “Delete”, confirm in the dialog; the item disappears immediately

2. Search & Filter
- Search box filters the list by dish **name** (case-insensitive)
- Horizontal course chips filter by **Starter / Main / Dessert / Drink** (or All)
- “Clear” link (or the empty-state button) resets both search and filter

3. Menu Statistics
A summary card at the top of the home screen shows:
- Total number of menu items
- Average price of all items
- Count of items in each course

4 & 5. Code quality & UX
- Shared theme, reusable `MenuItemCard` and `EmptyState` components
- Single form component used for both Add and Edit
- Validation with inline error messages
- Success confirmation after adding an item
- Confirmation dialog before delete
- Consistent colours, spacing and typography throughout
- Empty states for “no dishes yet” and “no matching results”

 How to run it

You'll need [Node.js](https://nodejs.org) and the free **Expo Go** app
(iOS/Android) or an emulator.

1. Open a terminal inside this folder.
2. Install the dependencies:
   
   npm install
   
3. Start the app:
   
   npm start
   
4. Scan the QR code with Expo Go, or press `a` / `i` for an emulator.


