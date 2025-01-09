import React from 'react';
import { Button, IconButton, TableCell, TableRow, TextField, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

interface Product {
    id: number;
    name: string;
    count: number;
    unitPrice: number;
    discount: number;
    added: boolean;
}

interface ProductRowProps {
    product: Product;
    handleInputChange: (id: number, field: string, value: any) => void;
    handleAdd: (id: number) => void;
    handleRemove: (id: number) => void;
    toggleAddButton: (id: number) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, handleInputChange, handleAdd, handleRemove, toggleAddButton }) => {
    // Helper function to format numbers with commas
    const formatNumber = (num: number) => num.toLocaleString();

    // Helper function to handle input change for number fields
    const handleNumberInputChange = (id: number, field: string, value: string) => {
        // Remove commas and handle the conversion to number
        const parsedValue = parseInt(value.replace(/,/g, ''), 10) || 0;
        handleInputChange(id, field, parsedValue);
    };

    return (
        <TableRow key={product.id}>
            <TableCell align="right">
                <TextField
                    value={product.name}
                    onChange={(e) => handleInputChange(product.id, "name", e.target.value)}
                    variant="standard"
                    style={{ backgroundColor: "#444", borderRadius: "5px", color: "#fff", width: "100%" }}
                    inputProps={{ style: { color: "#fff", textAlign: "center" } }}
                />
            </TableCell>
            <TableCell align="center">
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    width: "120px"
                }}>
                    <div style={{ width: "30px", textAlign: "center" }}>
                        <IconButton onClick={() => handleAdd(product.id)}
                                    sx={{ color: '#0073A4', '&:hover': { color: '#71c7ec' } }}>
                            <AddCircleOutlineIcon sx={{ color: '#0073A4' }} />
                        </IconButton>
                    </div>
                    <div style={{ width: "30px", textAlign: "center" }}>
                        <Typography variant="body1" style={{ color: "#fff", textAlign: "center", fontSize: "1.2rem" }}>
                            {formatNumber(product.count)}
                        </Typography>
                    </div>
                    <div style={{ width: "30px", textAlign: "center" }}>
                        {product.count > 1 ? (
                            <IconButton onClick={() => handleRemove(product.id)} color="error">
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        ) : product.count === 1 ? (
                            <IconButton onClick={() => handleRemove(product.id)} color="error">
                                <DeleteIcon />
                            </IconButton>
                        ) : null}
                    </div>
                </div>
            </TableCell>
            <TableCell align="center">
                <TextField
                    value={formatNumber(product.unitPrice)} // Display formatted number
                    onChange={(e) => handleNumberInputChange(product.id, "unitPrice", e.target.value)}
                    type="text"
                    variant="standard"
                    style={{ backgroundColor: "#444", borderRadius: "5px", color: "#fff", width: "100%" }}
                    inputProps={{ style: { color: "#fff", textAlign: "center" } }}
                />
            </TableCell>
            <TableCell align="center">
                <TextField
                    value={formatNumber(product.discount)} // Display formatted number
                    onChange={(e) => handleNumberInputChange(product.id, "discount", e.target.value)}
                    type="text"
                    variant="standard"
                    style={{ backgroundColor: "#444", borderRadius: "5px", color: "limegreen", width: "100%" }}
                    inputProps={{ style: { color: "limegreen", textAlign: "center" } }}
                />
            </TableCell>
            <TableCell align="center" style={{ color: "white", fontSize: "1.2rem" }}>
                {formatNumber((product.unitPrice - product.discount) * product.count)}
            </TableCell>
            <TableCell align="center">
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: product.added ? "#28a745" : "#0073A4",
                        color: "#fff",
                        transition: "background-color 0.3s ease",
                    }}
                    onClick={() => toggleAddButton(product.id)}
                    onMouseEnter={(e: any) => {
                        if (product.added) {
                            e.target.style.backgroundColor = "#dc3545";
                            e.target.innerText = "حذف";
                        }
                    }}
                    onMouseLeave={(e: any) => {
                        if (product.added) {
                            e.target.style.backgroundColor = "#28a745";
                            e.target.innerText = "اضافه شد";
                        } else {
                            e.target.style.backgroundColor = "#0073A4";
                            e.target.innerText = "افزودن";
                        }
                    }}
                >
                    {product.added ? "اضافه شد" : "افزودن"}
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default ProductRow;
