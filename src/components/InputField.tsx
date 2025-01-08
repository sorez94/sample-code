import React from 'react';

// Type definitions for the props
interface InputFieldProps {
    name: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    placeholder: string;
    errors: { [key: string]: string };
    touched: { [key: string]: boolean };
    type?: string; // Optional prop with default value 'text'
}

const InputField: React.FC<InputFieldProps> = ({
                                                   name,
                                                   value,
                                                   onChange,
                                                   onBlur,
                                                   placeholder,
                                                   errors,
                                                   touched,
                                                   type = "text",
                                               }) => {
    return (
        <div style={{ flex: 1 }}>
            <input
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                type={type}
                style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#212121",
                    color: "#fff",
                    borderRadius: "5px",
                    border: "1px solid #fff",
                    textAlign: "right",
                }}
            />
            {touched[name] && errors[name] && (
                <span
                    style={{
                        color: "red",
                        fontSize: "0.875rem",
                        fontWeight: "bold",
                        marginTop: "5px",
                        display: "block",
                    }}
                >
                    {errors[name]}
                </span>
            )}
        </div>
    );
};

export default InputField;
