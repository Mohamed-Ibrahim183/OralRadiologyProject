import React from "react";

const CategoriesSection = ({
  categories = [], // Default to an empty array to avoid undefined issues
  handleFileUpload,
  isClosed,
  buttonLabel,
}) => {
  return (
    <section className="categories-section">
      <h2 className="assignment-section-title">Categories</h2>
      {categories.length > 0 ? (
        categories.map((cat) => (
          <div className="category-item" key={cat?.categoryId || Math.random()}>
            <div className="category-info">
              <p className="category-title">
                {cat?.categoryName || "Unknown Category"}
              </p>
            </div>
            <input
              type="file"
              id={`file-upload-${cat?.categoryId}`}
              className="file-input"
              onChange={(event) =>
                handleFileUpload(event, cat?.categoryId, cat?.categoryName)
              }
            />
            <button
              className="upload-button"
              onClick={() =>
                document
                  .getElementById(`file-upload-${cat?.categoryId}`)
                  ?.click()
              }
              disabled={isClosed}
            >
              {buttonLabel}
            </button>
          </div>
        ))
      ) : (
        <p>No categories available</p>
      )}
    </section>
  );
};

export default CategoriesSection;
