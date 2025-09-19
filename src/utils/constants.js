// Genre colors mapping
export const genreColors = {
  Fiction: "#1890ff",
  "Non-Fiction": "#52c41a",
  Mystery: "#722ed1",
  Romance: "#eb2f96",
  "Science Fiction": "#13c2c2",
  Fantasy: "#fa8c16",
  Biography: "#fadb14",
  History: "#a0d911",
  "Classic Literature": "#f5222d",
  Technology: "#2f54eb",
  Business: "#096dd9",
  "Self-Help": "#08979c",
  Health: "#389e0d",
  Travel: "#d48806",
  Cooking: "#ad6800",
  Art: "#c41d7f",
  Philosophy: "#531dab",
  Religion: "#7cb305",
  Sports: "#fa541c",
  Children: "#ff7a45",
};

// Sidebar menu items (icons are handled in the component)
export const menuItemsData = [
  {
    key: "all",
    label: "All Books",
    iconType: "home",
  },
  {
    key: "available",
    label: "Available Books",
    iconType: "check",
  },
  {
    key: "issued",
    label: "Issued Books",
    iconType: "exclamation",
  },
];

// Sort options
export const sortOptions = [
  { label: "Title A-Z", value: "title-asc" },
  { label: "Title Z-A", value: "title-desc" },
  { label: "Author A-Z", value: "author-asc" },
  { label: "Author Z-A", value: "author-desc" },
  { label: "Year (Newest)", value: "publishedYear-desc" },
  { label: "Year (Oldest)", value: "publishedYear-asc" },
  { label: "Recently Added", value: "createdAt-desc" },
  { label: "Recently Updated", value: "updatedAt-desc" },
  { label: "Rating (High)", value: "rating-desc" },
  { label: "Rating (Low)", value: "rating-asc" },
];

// Page size options for pagination
export const pageSizeOptions = ["10", "20", "50", "100"];
