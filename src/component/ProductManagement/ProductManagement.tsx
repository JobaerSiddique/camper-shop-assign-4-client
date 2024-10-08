import React, { useState } from "react";
import { Button, Form, Input, message, Modal, Space, Table, Tag } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from "../../redux/features/Product/productApi";
import { Link } from "react-router-dom";

const { confirm } = Modal;

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  images: string[];
  isDeleted: boolean;
}

const ProductManagement: React.FC = () => {
  const { data } = useGetProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  
  const products: Product[] = data?.data || [];
  const activeProducts = products.filter(p => !p.isDeleted); // Filter out deleted products
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Allow null for initial state

  const showDeleteConfirm = (productId: string) => {
    confirm({
      title: "Are you sure you want to delete this product?",
      icon: <ExclamationCircleOutlined />,
      content: "Once deleted, this action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteProduct(productId);
      },
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const res = await deleteProduct(productId).unwrap();
      if (res.success) {
        message.success(res.message);
      }
    } catch (error) {
      console.error("Failed to delete the product:", error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleUpdateProduct = async (values: Partial<Product>) => {
    try {
      if (selectedProduct) {
        const res = await updateProduct({ id: selectedProduct._id, data: values }).unwrap();
        if (res.success) {
          message.success("Product updated successfully!");
          setIsModalVisible(false);
        }
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const onFinish = (values: any) => {
    const updatedProduct: Partial<Product> = {
      name: values.name,
      price: Number(values.price),
      stock: Number(values.stock),
      category: values.category,
      description: values.description,
    };

    handleUpdateProduct(updatedProduct);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images: string[]) => (
        <img src={images[0]} alt="product" style={{ width: "50px", height: "50px", objectFit: "cover" }} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <span>${price}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (record: Product) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditProduct(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => showDeleteConfirm(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4">
        <Link to="/createProduct">
          <Button type="primary">Create New Product</Button>
        </Link>
      </div>

      {/* Use activeProducts as dataSource */}
      <Table columns={columns} dataSource={activeProducts} rowKey="_id" />

      {/* Modal for editing a product */}
      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedProduct && (
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              name: selectedProduct.name,
              price: selectedProduct.price,
              category: selectedProduct.category,
              stock: selectedProduct.stock,
              description: selectedProduct.description,
            }}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input the product name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please input the product price!" }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please input the product category!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Stock"
              name="stock"
              rules={[{ required: true, message: "Please input the product stock!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input the product description!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Product
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default ProductManagement;
