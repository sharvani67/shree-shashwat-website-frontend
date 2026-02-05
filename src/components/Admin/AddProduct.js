import React, { useState } from "react";
import { FaFire, FaPepperHot, FaLeaf, FaSeedling } from "react-icons/fa";
import baseURL from "../Api/Api";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tag: "",
    icon: "fire",
    rating: 0,
    spicyLevel: 0,
  });

  const [weightOptions, setWeightOptions] = useState([
    { weight: "", price: "", originalPrice: "", quantity: 0 },
  ]);

  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const tagOptions = ["New", "BestSeller", "Premium", "Organic"];
  const iconOptions = [
    { value: "fire", label: "Fire", icon: <FaFire className="text-danger" /> },
    { value: "pepper", label: "Pepper", icon: <FaPepperHot className="text-warning" /> },
    { value: "leaf", label: "Leaf", icon: <FaLeaf className="text-success" /> },
    { value: "seedling", label: "Seedling", icon: <FaSeedling className="text-info" /> },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "rating" || name === "spicyLevel" ? parseFloat(value) : value,
    }));
  };

  const handleWeightChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWeights = [...weightOptions];

    updatedWeights[index][name] =
      name === "quantity" ? parseInt(value) || 0 :
        name === "price" || name === "originalPrice" ? value.replace(/[^0-9.]/g, "") :
          value;

    setWeightOptions(updatedWeights);
  };

  const addWeightOption = () => {
    setWeightOptions([
      ...weightOptions,
      { weight: "", price: "", originalPrice: "", quantity: 0 },
    ]);
  };

  const removeWeightOption = (index) => {
    if (weightOptions.length > 1) {
      const updatedWeights = [...weightOptions];
      updatedWeights.splice(index, 1);
      setWeightOptions(updatedWeights);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 6) {
      setError("Maximum 6 images allowed");
      return;
    }

    // Validate file types
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setError("Only image files are allowed");
      return;
    }

    setImageFiles(files);
    setError(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Product name is required");
      return false;
    }

    if (weightOptions.some(opt => !opt.weight || !opt.price)) {
      setError("Please fill all weight options or remove empty ones");
      return false;
    }

    if (imageFiles.length === 0) {
      setError("At least one image is required");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      tag: "",
      icon: "fire",
      rating: 0,
      spicyLevel: 0,
    });
    setWeightOptions([{ weight: "", price: "", originalPrice: "", quantity: 0 }]);
    setImageFiles([]);
    setUploadProgress(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      const formDataToSend = new FormData();

      // Add product data
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("tag", formData.tag);
      formDataToSend.append("icon", formData.icon);
      formDataToSend.append("rating", formData.rating.toString());
      formDataToSend.append("spicyLevel", formData.spicyLevel.toString());
      
      // Add weight options
      formDataToSend.append("weight", weightOptions[0].weight);
      formDataToSend.append("price", weightOptions[0].price);
      if (weightOptions[0].originalPrice) {
        formDataToSend.append("originalPrice", weightOptions[0].originalPrice);
      }
      formDataToSend.append("weightOptions", JSON.stringify(weightOptions));

      // Add images
      imageFiles.forEach(file => {
        formDataToSend.append("images", file);
      });

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      });

      const response = await new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 0) {
              reject(new Error("Network error - failed to connect to server"));
            } else if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              try {
                const errorResponse = JSON.parse(xhr.responseText);
                reject(new Error(errorResponse.error || "Request failed"));
              } catch {
                reject(new Error(xhr.statusText));
              }
            }
          }
        };

        xhr.open("POST", `${baseURL}/add/products`);
        xhr.send(formDataToSend);
      });

      setSuccess(true);
      resetForm();
      setTimeout(() => setSuccess(false), 5000);

    } catch (err) {
      console.error("Error adding product:", err);
      setError(err.message || "Failed to add product. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="mb-4 text-center">Add New Product</h3>

          {success && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              Product added successfully!
              <button
                type="button"
                className="btn-close"
                onClick={() => setSuccess(false)}
                aria-label="Close"
              ></button>
            </div>
          )}

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError(null)}
                aria-label="Close"
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Rating (0-5)</label>
                <input
                  type="number"
                  name="rating"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Spicy Level (0-5)</label>
                <input
                  type="number"
                  name="spicyLevel"
                  min="0"
                  max="5"
                  value={formData.spicyLevel}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Icon</label>
                <div className="d-flex gap-3">
                  {iconOptions.map((option) => (
                    <div key={option.value} className="form-check">
                      <input
                        type="radio"
                        name="icon"
                        id={`icon-${option.value}`}
                        value={option.value}
                        checked={formData.icon === option.value}
                        onChange={handleChange}
                        className="form-check-input"
                      />
                      <label
                        htmlFor={`icon-${option.value}`}
                        className="form-check-label d-flex align-items-center gap-1"
                      >
                        {option.icon} {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tag</label>
                <select
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select a tag</option>
                  {tagOptions.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="form-control"
                  rows="3"
                />
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Product Images</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                  required
                  className="form-control"
                  disabled={uploading}
                />

                {imageFiles.length > 0 && (
                  <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted">
                        {imageFiles.length} file{imageFiles.length !== 1 ? 's' : ''} selected
                      </small>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setImageFiles([])}
                        disabled={uploading}
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="list-group">
                      {imageFiles.map((file, index) => (
                        <div key={index} className="list-group-item list-group-item-action">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-truncate">{file.name}</span>
                            <span className="badge bg-secondary">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {uploading && (
                  <div className="mt-3">
                    <div className="progress" style={{ height: "6px" }}>
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${uploadProgress}%` }}
                        aria-valuenow={uploadProgress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <small className="d-block text-center mt-1">
                      {uploadProgress < 100 ? `Uploading... ${uploadProgress}%` : "Processing..."}
                    </small>
                  </div>
                )}
              </div>
            </div>

            <hr />
            <h5 className="mb-3">Weight Options</h5>

            {weightOptions.map((option, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-4 mb-2">
                  <input
                    type="text"
                    name="weight"
                    placeholder="Weight (e.g., 100g)"
                    value={option.weight}
                    onChange={(e) => handleWeightChange(index, e)}
                    required
                    className="form-control"
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <input
                    type="text"
                    name="price"
                    placeholder="Price (e.g., ₹199)"
                    value={option.price}
                    onChange={(e) => handleWeightChange(index, e)}
                    required
                    className="form-control"
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <input
                    type="text"
                    name="originalPrice"
                    placeholder="Original Price (optional)"
                    value={option.originalPrice}
                    onChange={(e) => handleWeightChange(index, e)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-2 mb-2">
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    min="0"
                    value={option.quantity}
                    onChange={(e) => handleWeightChange(index, e)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-2 mb-2 d-flex align-items-center">
                  <button
                    type="button"
                    onClick={() => removeWeightOption(index)}
                    className="btn btn-outline-danger btn-sm w-100"
                    disabled={weightOptions.length <= 1 || uploading}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mb-3">
              <button
                type="button"
                onClick={addWeightOption}
                className="btn btn-outline-primary btn-sm"
                disabled={uploading}
              >
                + Add Another Weight Option
              </button>
            </div>

            <hr />
            <div className="text-center">
              <button
                type="submit"
                disabled={uploading}
                className="btn btn-success px-4"
              >
                {uploading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    {uploadProgress > 0 && uploadProgress < 100
                      ? `Uploading (${uploadProgress}%)...`
                      : "Processing..."}
                  </>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;