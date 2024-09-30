import React, { useState } from "react";
import { Card, Button, Input, Form, message, InputNumber, Upload } from "antd";
import { useForm, Controller } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload/interface";
import { useCreateProductMutation } from "../../redux/features/Product/productApi";

const { TextArea } = Input;

interface ProductFormData {
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  ratings: number;
}

const CreateProduct: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [createProduct] = useCreateProductMutation();
  const cloudName = import.meta.env.VITE_Cloud_name as string;
  const uploadPreset = import.meta.env.VITE_upload_preset as string;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();

  // Function to handle image uploads
  const handleImageUpload = async (file: RcFile) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        return data.secure_url;
      } else {
        message.error("Failed to upload image");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      message.error("Error during image upload");
      return null;
    }
  };

  // Handle file change and upload
  const onFileChange = async ({ file }: { file: RcFile }) => {
    const uploadedImageUrl = await handleImageUpload(file);
    if (uploadedImageUrl) {
      setImageUrls((prev) => [...prev, uploadedImageUrl]);
      message.success("Image uploaded successfully");
    } else {
      message.error("Image upload failed");
    }
  };

  // Submit form handler
  const onSubmit = async (data: ProductFormData) => {
    try {
      const productData = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        ratings: Number(data.ratings),
        images: imageUrls, // Images from Cloudinary
      };
      const res = await createProduct(productData).unwrap();
      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      message.error("Failed to create product");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl lg:text-5xl font-bold text-center uppercase my-10">
        Add a Product
      </h1>
      <Card>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {/* Product Name */}
          <Form.Item label="Product Name" validateStatus={errors.name ? "error" : ""}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Product name is required" }}
              render={({ field }) => <Input {...field} placeholder="Enter Product Name" />}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </Form.Item>

          {/* Price */}
          <Form.Item label="Price" validateStatus={errors.price ? "error" : ""}>
            <Controller
              name="price"
              control={control}
              rules={{ required: "Price is required" }}
              render={({ field }) => (
                <InputNumber {...field} min={1} placeholder="Enter Price" style={{ width: "100%" }} />
              )}
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </Form.Item>

          {/* Stock */}
          <Form.Item label="Stock" validateStatus={errors.stock ? "error" : ""}>
            <Controller
              name="stock"
              control={control}
              rules={{ required: "Stock is required" }}
              render={({ field }) => (
                <InputNumber {...field} min={1} placeholder="Enter Stock" style={{ width: "100%" }} />
              )}
            />
            {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
          </Form.Item>

          {/* Description */}
          <Form.Item label="Description" validateStatus={errors.description ? "error" : ""}>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextArea {...field} rows={4} placeholder="Enter Product Description" />
              )}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </Form.Item>

          {/* Category */}
          <Form.Item label="Category" validateStatus={errors.category ? "error" : ""}>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => <Input {...field} placeholder="Enter Category" />}
            />
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
          </Form.Item>

          {/* Ratings */}
          <Form.Item label="Ratings" validateStatus={errors.ratings ? "error" : ""}>
            <Controller
              name="ratings"
              control={control}
              rules={{ required: "Ratings are required" }}
              render={({ field }) => (
                <InputNumber {...field} min={1} max={5} step={0.1} placeholder="Enter Rating" style={{ width: "100%" }} />
              )}
            />
            {errors.ratings && <p className="text-red-500">{errors.ratings.message}</p>}
          </Form.Item>

          {/* Image Upload */}
          <Form.Item label="Upload Images">
            <Upload
              customRequest={onFileChange}
              listType="picture"
              accept="image/*"
              multiple
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Images</Button>
            </Upload>
            <div className="mt-4">
              {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="Uploaded"
                  style={{ width: "100px", height: "100px", marginRight: "10px" }}
                />
              ))}
            </div>
          </Form.Item>

          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Product
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateProduct;
