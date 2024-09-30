import React, { useState } from "react";
import { Card, Button, Input, Form, message, InputNumber, Upload } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useCreateProductMutation } from "../../redux/features/Product/productApi";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const CreateProduct = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [createProduct] = useCreateProductMutation();
  const cloudName = import.meta.env.VITE_Cloud_name;
  const upload = import.meta.env.VITE_upload_preset

  const {
    control,
    handleSubmit,
    formState: { errors },
    
  } = useForm();


  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload); 

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

  
  const onFileChange = async ({ file }) => {
    const uploadedImageUrl = await handleImageUpload(file);
    if (uploadedImageUrl) {
      setImageUrls((prev) => [...prev, uploadedImageUrl]);
      message.success("Image uploaded successfully");
    } else {
      message.error("Image upload failed");
    }
  };

 
  const onSubmit = async (data: any) => {
    try {
      const productData = {
        name: data.name,
        price: Number(data.price),
        stock: Number(data.stock),
        description: data.description,
        category: data.category,
        ratings: Number(data.ratings),
        images: imageUrls, 
      };
      const res = await createProduct(productData).unwrap();
      if(res.success){
            message.success(res.message)
      }

    } catch (error) {
      message.error("Failed to create product");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-xl lg:text-5xl font-bold text-center uppercase mb-4">
        Add a Product
      </h1>
      <Card>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
         
          <Form.Item label="Product Name" validateStatus={errors.name && "error"}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Product name is required" }}
              render={({ field }) => <Input {...field} placeholder="Enter Product Name" />}
            />
            {errors.name && <p className="text-red-500">{String(errors.name.message)}</p>}
          </Form.Item>

          {/* Price */}
          <Form.Item label="Price" validateStatus={errors.price && "error"}>
            <Controller
              name="price"
              control={control}
              rules={{ required: "Price is required" }}
              render={({ field }) => (
                <InputNumber {...field} min={1} placeholder="Enter Price" style={{ width: "100%" }} />
              )}
            />
            {errors.price && <p className="text-red-500">{String(errors.price.message)}</p>}
          </Form.Item>

          {/* Stock */}
          <Form.Item label="Stock" validateStatus={errors.stock && "error"}>
            <Controller
              name="stock"
              control={control}
              rules={{ required: "Stock is required" }}
              render={({ field }) => (
                <InputNumber {...field} min={1} placeholder="Enter Stock" style={{ width: "100%" }} />
              )}
            />
            {errors.stock && <p className="text-red-500">{String(errors.stock.message)}</p>}
          </Form.Item>

          {/* Description */}
          <Form.Item label="Description" validateStatus={errors.description && "error"}>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextArea {...field} rows={4} placeholder="Enter Product Description" />
              )}
            />
            {errors.description && <p className="text-red-500">{String(errors.description.message)}</p>}
          </Form.Item>

          {/* Category */}
          <Form.Item label="Category" validateStatus={errors.category && "error"}>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => <Input {...field} placeholder="Enter Category" />}
            />
            {errors.category && <p className="text-red-500">{String(errors.category.message)}</p>}
          </Form.Item>

          {/* Ratings */}
          <Form.Item label="Ratings" validateStatus={errors.ratings && "error"}>
            <Controller
              name="ratings"
              control={control}
              rules={{ required: "Ratings are required" }}
              render={({ field }) => (
                <InputNumber {...field} min={1} max={5} step={0.1} placeholder="Enter Rating" style={{ width: "100%" }} />
              )}
            />
            {errors.ratings && <p className="text-red-500">{String(errors.ratings.message)}</p>}
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

          {/* Submit Button */}
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
