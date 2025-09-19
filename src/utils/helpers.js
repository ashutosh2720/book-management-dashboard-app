import dayjs from "dayjs";

// Filter books based on various criteria
export const filterBooks = (books, filters) => {
  let filtered = books;

  // Page filter
  if (filters.currentPage === "available") {
    filtered = filtered.filter((book) => book.status === "Available");
  } else if (filters.currentPage === "issued") {
    filtered = filtered.filter((book) => book.status === "Issued");
  }

  // Search filter
  if (filters.searchText) {
    const search = filters.searchText.toLowerCase();
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search) ||
        book.genre.toLowerCase().includes(search)
    );
  }

  // Genre filter
  if (filters.genreFilter) {
    filtered = filtered.filter((book) => book.genre === filters.genreFilter);
  }

  // Status filter
  if (filters.statusFilter) {
    filtered = filtered.filter((book) => book.status === filters.statusFilter);
  }

  // Year filter
  if (filters.yearFilter) {
    filtered = filtered.filter((book) => book.publishedYear === filters.yearFilter);
  }

  // Date filter
  if (filters.dateFilter) {
    const filterDate = dayjs(filters.dateFilter);
    filtered = filtered.filter((book) =>
      dayjs(book.createdAt).isSame(filterDate, "day")
    );
  }

  return filtered;
};

// Sort books based on field and order
export const sortBooks = (books, sortBy, sortOrder) => {
  return books.sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === "publishedYear" || sortBy === "rating") {
      aValue = Number(aValue) || 0;
      bValue = Number(bValue) || 0;
    } else if (sortBy === "createdAt" || sortBy === "updatedAt") {
      // Handle null timestamps by treating them as very old dates
      aValue = aValue ? new Date(aValue).getTime() : 0;
      bValue = bValue ? new Date(bValue).getTime() : 0;
    } else {
      aValue = String(aValue || "").toLowerCase();
      bValue = String(bValue || "").toLowerCase();
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

// Get page title based on current page
export const getPageTitle = (currentPage) => {
  switch (currentPage) {
    case "all":
      return "All Books";
    case "available":
      return "Available Books";
    case "issued":
      return "Issued Books";
    default:
      return "All Books";
  }
};

// Calculate statistics from books array
export const calculateStats = (books) => {
  return {
    total: books.length,
    available: books.filter((book) => book.status === "Available").length,
    issued: books.filter((book) => book.status === "Issued").length,
    genres: new Set(books.map((book) => book.genre)).size,
  };
};

// Paginate books array
export const paginateBooks = (books, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return books.slice(startIndex, endIndex);
};
