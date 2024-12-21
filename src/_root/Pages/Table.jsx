import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Table = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [tempValues, setTempValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    setData(storedData);
  }, []);

  const handleChange = (e, key) => {
    setTempValues({
      ...tempValues,
      [key]: e.target.value.trim(),
    });
  };

  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
    setTempValues({
      ...tempValues,
      usageDetails: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!tempValues.fullName) newErrors.fullName = "Full Name is required";
    if (!tempValues.displayName)
      newErrors.displayName = "Display Name is required";
    if (!tempValues.workspaceName)
      newErrors.workspaceName = "Workspace Name is required";
    if (!tempValues.usageDetails)
      newErrors.usageDetails = "Usage Details is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTempValues(data[index]);
    setErrors({});
  };

  const handleSave = (index) => {
    if (!validateForm()) return;

    const updatedData = [...data];
    updatedData[index] = { ...updatedData[index], ...tempValues };
    setData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem("formData", JSON.stringify(updatedData));
  };

  return (
    <div className="overflow-x-auto flex flex-col gap-5">
      <Button
        onClick={() => navigate("/form")}
        variant="primary"
        className="bg-primary w-max text-white"
      >
        Create user
      </Button>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">
              Full Name
            </th>
            <th className="border px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">
              Display Name
            </th>
            <th className="border px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">
              Workspace Name
            </th>
            <th className="border px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">
              Workspace URL
            </th>
            <th className="border px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">
              Usage Details
            </th>
            <th className="border px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                {editIndex === index ? (
                  <>
                    <Input
                      value={tempValues.fullName}
                      onChange={(e) => handleChange(e, "fullName")}
                    />
                    {errors.fullName && (
                      <span className="text-red-500 text-xs">
                        {errors.fullName}
                      </span>
                    )}
                  </>
                ) : (
                  row.fullName
                )}
              </td>
              <td className="border px-4 py-2">
                {editIndex === index ? (
                  <>
                    <Input
                      value={tempValues.displayName}
                      onChange={(e) => handleChange(e, "displayName")}
                    />
                    {errors.displayName && (
                      <span className="text-red-500 text-xs">
                        {errors.displayName}
                      </span>
                    )}
                  </>
                ) : (
                  row.displayName
                )}
              </td>
              <td className="border px-4 py-2">
                {editIndex === index ? (
                  <>
                    <Input
                      value={tempValues.workspaceName}
                      onChange={(e) => handleChange(e, "workspaceName")}
                    />
                    {errors.workspaceName && (
                      <span className="text-red-500 text-xs">
                        {errors.workspaceName}
                      </span>
                    )}
                  </>
                ) : (
                  row.workspaceName
                )}
              </td>
              <td className="border px-4 py-2">
                {editIndex === index ? (
                  <>
                    <Input
                      value={tempValues.workspaceUrl}
                      onChange={(e) => handleChange(e, "workspaceUrl")}
                    />
                    {errors.workspaceUrl && (
                      <span className="text-red-500 text-xs">
                        {errors.workspaceUrl}
                      </span>
                    )}
                  </>
                ) : (
                  row.workspaceUrl
                )}
              </td>
              <td className="border px-4 py-2">
                {editIndex === index ? (
                  <>
                    <Select
                      value={tempValues.usageDetails}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Usage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="For myself">For myself</SelectItem>
                        <SelectItem value="With my team">
                          With my team
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.usageDetails && (
                      <span className="text-red-500 text-xs">
                        {errors.usageDetails}
                      </span>
                    )}
                  </>
                ) : (
                  row.usageDetails
                )}
              </td>
              <td className="border  px-2">
                {editIndex === index ? (
                  <>
                    <Button
                      onClick={() => handleSave(index)}
                      variant="secondary"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditIndex(null)}
                      variant="secondary"
                      className="ml-2"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleEdit(index)}
                      variant="secondary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(index)}
                      variant="destructive"
                      className="ml-2"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
