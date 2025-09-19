import React from "react";
import { ConfigProvider, Form, theme as antdTheme } from "antd";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useBooks } from "./hooks/useBooks";
import { useResponsive } from "./hooks/useResponsive";
import { useTheme } from "./hooks/useTheme";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import BookForm from "./components/books/BookForm";

// QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 0,
      cacheTime: 1000 * 60 * 5,
    },
  },
});

function BookManagement() {
  const [form] = Form.useForm();
  
  const {
    books,
    filteredBooks,
    paginatedBooks,
    stats,
    isLoading,
    currentPage,
    setCurrentPage,
    isModalOpen,
    editingBook,
    viewMode,
    setViewMode,
    searchText,
    setSearchText,
    sortBy,
    sortOrder,
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
    handleAddBook,
    handleEditBook,
    handleDeleteBook,
    handleSubmit,
    handleCancel,
    clearAllFilters,
    handleSortChange,
    refetch,
    isCreating,
    isUpdating,
  } = useBooks();

  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileDrawerVisible,
    setMobileDrawerVisible,
    isMobile,
  } = useResponsive();

  const { isDarkMode, setIsDarkMode } = useTheme();

  React.useEffect(() => {
    if (editingBook && isModalOpen) {
      form.setFieldsValue(editingBook);
    } else if (!editingBook && isModalOpen) {
      form.resetFields();
    }
  }, [editingBook, isModalOpen, form]);

  const onFormSubmit = (values) => {
    handleSubmit(values);
    form.resetFields();
  };

  const onModalCancel = () => {
    handleCancel();
    form.resetFields();
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <AppLayout
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isMobile={isMobile}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileDrawerVisible={mobileDrawerVisible}
        setMobileDrawerVisible={setMobileDrawerVisible}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onAddBook={handleAddBook}
      >
        <Dashboard
          books={books}
          filteredBooks={filteredBooks}
          paginatedBooks={paginatedBooks}
          stats={stats}
          isLoading={isLoading}
          currentPage={currentPage}
          viewMode={viewMode}
          searchText={searchText}
          setSearchText={setSearchText}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          yearFilter={yearFilter}
          setYearFilter={setYearFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          currentPageNum={currentPageNum}
          setCurrentPageNum={setCurrentPageNum}
          pageSize={pageSize}
          setPageSize={setPageSize}
          onClearAllFilters={clearAllFilters}
          onRefresh={refetch}
          onEditBook={handleEditBook}
          onDeleteBook={handleDeleteBook}
        />

        <BookForm
          isOpen={isModalOpen}
          editingBook={editingBook}
          form={form}
          onSubmit={onFormSubmit}
          onCancel={onModalCancel}
          isLoading={isCreating || isUpdating}
        />
      </AppLayout>
    </ConfigProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookManagement />
    </QueryClientProvider>
  );
}

export default App;
