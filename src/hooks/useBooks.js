import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { bookApi } from "../services/bookApi";
import { filterBooks, sortBooks, calculateStats, paginateBooks } from "../utils/helpers";

export const useBooks = () => {
  const [currentPage, setCurrentPage] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [viewMode, setViewModeState] = useState(() => {
    // Get saved view mode from localStorage, default to 'card'
    try {
      return localStorage.getItem('bookViewMode') || 'card';
    } catch {
      // Fallback if localStorage is not available (SSR)
      return 'card';
    }
  });
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [genreFilter, setGenreFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [yearFilter, setYearFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const queryClient = useQueryClient();

  // Fetch books
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books"],
    queryFn: bookApi.getBooks,
    staleTime: 0,
    cacheTime: 0,
  });

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    const filters = {
      currentPage,
      searchText,
      genreFilter,
      statusFilter,
      yearFilter,
      dateFilter,
    };

    let filtered = filterBooks(books, filters);
    return sortBooks(filtered, sortBy, sortOrder);
  }, [
    books,
    currentPage,
    searchText,
    sortBy,
    sortOrder,
    genreFilter,
    statusFilter,
    yearFilter,
    dateFilter,
  ]);

  // Paginated books for card view
  const paginatedBooks = useMemo(() => {
    if (viewMode === "table") return filteredBooks; // Table has its own pagination
    return paginateBooks(filteredBooks, currentPageNum, pageSize);
  }, [filteredBooks, viewMode, currentPageNum, pageSize]);

  // Statistics
  const stats = useMemo(() => calculateStats(books), [books]);

  // Create book mutation
  const createMutation = useMutation({
    mutationFn: bookApi.createBook,
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      message.success("Book added successfully!");
      setIsModalOpen(false);
    },
    onError: () => {
      message.error("Failed to add book");
    },
  });

  // Update book mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, ...book }) => bookApi.updateBook(String(id), book),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      message.success("Book updated successfully!");
      setIsModalOpen(false);
      setEditingBook(null);
    },
    onError: (error) => {
      console.error("Update error:", error);
      message.error("Failed to update book");
    },
  });

  // Delete book mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => bookApi.deleteBook(String(id)),
    onSuccess: () => {
      queryClient.invalidateQueries(["books"]);
      message.success("Book deleted successfully!");
    },
    onError: () => {
      message.error("Failed to delete book");
    },
  });

  // Reset page when filters change
  useEffect(() => {
    setCurrentPageNum(1);
  }, [
    searchText,
    sortBy,
    sortOrder,
    genreFilter,
    statusFilter,
    yearFilter,
    dateFilter,
  ]);

  // Handler functions
  const handleAddBook = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleDeleteBook = (id) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = (values) => {
    if (editingBook) {
      updateMutation.mutate({ id: editingBook.id, ...values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingBook(null);
  };

  const clearAllFilters = () => {
    setSearchText("");
    setSortBy("title");
    setSortOrder("asc");
    setGenreFilter(null);
    setStatusFilter(null);
    setYearFilter(null);
    setDateFilter(null);
    setCurrentPageNum(1);
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split("-");
    setSortBy(field);
    setSortOrder(order);
  };

  // Custom setViewMode that persists to localStorage
  const setViewMode = (mode) => {
    setViewModeState(mode);
    try {
      localStorage.setItem('bookViewMode', mode);
    } catch (error) {
      // Silently fail if localStorage is not available
      console.warn('Could not save view mode to localStorage:', error);
    }
  };

  return {
    // Data
    books,
    filteredBooks,
    paginatedBooks,
    stats,
    isLoading,
    
    // State
    currentPage,
    setCurrentPage,
    isModalOpen,
    setIsModalOpen,
    editingBook,
    setEditingBook,
    viewMode,
    setViewMode,
    searchText,
    setSearchText,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    genreFilter,
    setGenreFilter,
    statusFilter,
    setStatusFilter,
    yearFilter,
    setYearFilter,
    dateFilter,
    setDateFilter,
    currentPageNum,
    setCurrentPageNum,
    pageSize,
    setPageSize,
    
    // Actions
    handleAddBook,
    handleEditBook,
    handleDeleteBook,
    handleSubmit,
    handleCancel,
    clearAllFilters,
    handleSortChange,
    refetch,
    
    // Loading states
    isCreating: createMutation.isLoading,
    isUpdating: updateMutation.isLoading,
    isDeleting: deleteMutation.isLoading,
  };
};
