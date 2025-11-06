import React, { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import customerService from "../services/customerService";
import Modal from "../components/common/Modal";
import ConfirmDialog from "../components/common/ConfirmDialog";
import LoadingSpinner from "../components/common/LoadingSpinner";
import CustomerForm from "../components/customers/CustomerForm";
import { formatDate } from "../utils/formatters";
import { toast } from "react-toastify";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await customerService.getAllCustomers();
      setCustomers(data);
    } catch (error) {
      toast.error("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    setShowModal(true);
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await customerService.deleteCustomer(customerToDelete.id);
      toast.success("Customer deleted successfully");
      fetchCustomers();
      setShowDeleteDialog(false);
      setCustomerToDelete(null);
    } catch (error) {
      toast.error("Failed to delete customer");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedCustomer) {
        await customerService.updateCustomer(selectedCustomer.id, formData);
        toast.success("Customer updated successfully");
      } else {
        await customerService.createCustomer(formData);
        toast.success("Customer created successfully");
      }
      setShowModal(false);
      fetchCustomers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact?.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customer database</p>
        </div>
        <button
          onClick={handleAddCustomer}
          className="btn-primary flex items-center space-x-2"
        >
          <FiPlus className="w-5 h-5" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Contact</th>
              <th className="table-header">Email</th>
              <th className="table-header">Address</th>
              <th className="table-header">Joined</th>
              <th className="table-header">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="table-cell">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold mr-3">
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{customer.name}</span>
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center text-gray-600">
                    <FiPhone className="w-4 h-4 mr-2" />
                    {customer.contact || "N/A"}
                  </div>
                </td>
                <td className="table-cell">
                  <div className="flex items-center text-gray-600">
                    <FiMail className="w-4 h-4 mr-2" />
                    {customer.email || "N/A"}
                  </div>
                </td>
                <td className="table-cell text-gray-600">
                  {customer.address || "N/A"}
                </td>
                <td className="table-cell text-gray-500 text-sm">
                  {formatDate(customer.createdAt)}
                </td>
                <td className="table-cell">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditCustomer(customer)}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <FiEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(customer)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No customers found</p>
        </div>
      )}

      {/* Customer Form Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedCustomer ? "Edit Customer" : "Add New Customer"}
        size="md"
      >
        <CustomerForm
          customer={selectedCustomer}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Customer"
        message={`Are you sure you want to delete "${customerToDelete?.name}"?`}
      />
    </div>
  );
};

export default Customers;
