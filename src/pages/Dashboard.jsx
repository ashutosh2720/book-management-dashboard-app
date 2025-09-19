import React from "react";
import { Card, Row, Col, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "../components/books/BookPagination.css";
import BookStats from "../components/books/BookStats";
import BookFilters from "../components/books/BookFilters";
import BookTable from "../components/books/BookTable";
import BookTableSkeleton from "../components/books/BookTableSkeleton";
import BookCard from "../components/books/BookCard";
import BookCardSkeleton from "../components/books/BookCardSkeleton";
import { getPageTitle } from "../utils/helpers";

const Dashboard = ({
  books,
  filteredBooks,
  paginatedBooks,
  stats,
  isLoading,
  currentPage,
  viewMode,
  searchText,
  setSearchText,
  sortBy,
  sortOrder,
  onSortChange,
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
  onClearAllFilters,
  onRefresh,
  onEditBook,
  onDeleteBook,
}) => {
  const handlePageChange = (page, size) => {
    setCurrentPageNum(page);
    setPageSize(size);
  };

  const handlePageSizeChange = (current, size) => {
    setCurrentPageNum(1);
    setPageSize(size);
  };


  return (
    <>
      <Breadcrumb 
        style={{ marginBottom: "24px" }}
        items={[
          {
            path: '/',
            title: <HomeOutlined />,
          },
          {
            title: 'Books',
          },
          {
            title: getPageTitle(currentPage),
          },
        ]}
      />

      {/* Statistics Cards */}
      <BookStats stats={stats} />

      {/* Filters and Search */}
      <BookFilters
        books={books}
        searchText={searchText}
        setSearchText={setSearchText}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={onSortChange}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        onClearAllFilters={onClearAllFilters}
        onRefresh={onRefresh}
        isLoading={isLoading}
      />

      {/* Books Display */}
      {viewMode === "table" ? (
        <Card>
          {isLoading || books.length === 0 ? (
            <BookTableSkeleton
              currentPageNum={currentPageNum}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          ) : (
            <BookTable
              books={filteredBooks}
              currentPageNum={currentPageNum}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onEdit={onEditBook}
              onDelete={onDeleteBook}
            />
          )}
        </Card>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {isLoading || books.length === 0 ? 
              // Show skeleton cards when loading or no data yet
              Array.from({ length: pageSize || 10 }, (_, index) => (
                <Col key={`skeleton-${index}`} xs={24} sm={12} md={8} lg={6} xl={6}>
                  <BookCardSkeleton />
                </Col>
              ))
              :
              // Show actual book cards when data is available
              paginatedBooks.map((book) => (
                <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                  <BookCard
                    book={book}
                    onEdit={onEditBook}
                    onDelete={onDeleteBook}
                  />
                </Col>
              ))
            }
          </Row>

          {/* Card View Pagination */}
          <Card style={{ marginTop: "24px", textAlign: "center", overflow: "hidden" }}>
            <Row justify="center">
              <Col xs={24} sm={24} md={24} lg={24}>
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "16px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  padding: "8px"
                }}>
                  <span>Show</span>
                  <select
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(1, Number(e.target.value))}
                    className="pagination-select"
                    style={{ 
                      padding: "4px 8px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "4px",
                      background: "#fff",
                      color: "#000",
                      minWidth: "70px"
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="pagination-text">per page</span>

                  <div className="pagination-divider" style={{ 
                    height: "20px", 
                    width: "1px", 
                    background: "#d9d9d9",
                    display: "none",
                    "@media (min-width: 768px)": {
                      display: "block"
                    }
                  }} />

                  <div style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    margin: "8px 0",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}>
                    <button
                      disabled={currentPageNum === 1}
                      onClick={() => setCurrentPageNum(currentPageNum - 1)}
                      className="pagination-button"
                      style={{
                        padding: "4px 12px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        background: currentPageNum === 1 ? "#f5f5f5" : "#fff",
                        color: "#000",
                        cursor: currentPageNum === 1 ? "not-allowed" : "pointer",
                        minWidth: "90px"
                      }}
                    >
                      Previous
                    </button>
                    <span style={{ minWidth: "max-content" }}>
                      Page {currentPageNum} of {Math.ceil(filteredBooks.length / pageSize)}
                    </span>
                    <button
                      disabled={currentPageNum >= Math.ceil(filteredBooks.length / pageSize)}
                      onClick={() => setCurrentPageNum(currentPageNum + 1)}
                      className="pagination-button"
                      style={{
                        padding: "4px 12px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        background: currentPageNum >= Math.ceil(filteredBooks.length / pageSize) ? "#f5f5f5" : "#fff",
                        color: "#000",
                        cursor: currentPageNum >= Math.ceil(filteredBooks.length / pageSize) ? "not-allowed" : "pointer",
                        minWidth: "90px"
                      }}
                    >
                      Next
                    </button>
                  </div>

                  <div className="pagination-divider" style={{ 
                    height: "20px", 
                    width: "1px", 
                    background: "#d9d9d9",
                    display: "none",
                    "@media (min-width: 768px)": {
                      display: "block"
                    }
                  }} />

                  <span className="pagination-info" style={{ 
                    color: "#666",
                    textAlign: "center",
                    minWidth: "max-content"
                  }}>
                    {(currentPageNum - 1) * pageSize + 1}-
                    {Math.min(currentPageNum * pageSize, filteredBooks.length)} of{" "}
                    {filteredBooks.length} books
                  </span>
                </div>
              </Col>
            </Row>
          </Card>
        </>
      )}
    </>
  );
};

export default Dashboard;
