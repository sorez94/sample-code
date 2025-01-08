import {useState} from "react";
import {Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@mui/material";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "./components/InputField.tsx";
import ProductRow from "./components/ProductRow.tsx";

const App = () => {
    const [products, setProducts] = useState([
        {id: 1, name: "محصول یک", count: 0, unitPrice: 120000, discount: 10000, added: false},
        {id: 2, name: "محصول دو", count: 1, unitPrice: 130000, discount: 7000, added: false},
        {id: 3, name: "محصول چهار", count: 2, unitPrice: 140000, discount: 8200, added: false},
        {id: 4, name: "محصول پنج", count: 2, unitPrice: 150000, discount: 8500, added: true},
        {id: 5, name: "محصول شش", count: 2, unitPrice: 160000, discount: 8500, added: false},
    ]);

    const validationSchema = Yup.object({
        buyerName: Yup.string().required("نام خریدار الزامی است"),
        mobile: Yup.string()
            .matches(/^91\d{8}$/, "شماره موبایل باید به صورت 9190719287 باشد")
            .required("موبایل الزامی است"),
        address: Yup.string().required("آدرس الزامی است"),
    });

    const handleInputChange = (id:number, field: string, value:any) => {
        setProducts(prev => prev.map(product => product.id === id ? {...product, [field]: value} : product));
    };

    const handleAdd = (id:number) => {
        setProducts(prev => prev.map(product => product.id === id ? {...product, count: product.count + 1} : product));
    };

    const handleRemove = (id:number) => {
        setProducts(prev => prev.map(product => product.id === id && product.count > 0 ? {
            ...product,
            count: product.count - 1
        } : product));
    };

    const toggleAddButton = (id:number) => {
        setProducts(prev => prev.map(product => product.id === id ? {...product, added: !product.added} : product));
    };

    return (
        <Container maxWidth="lg" style={{marginTop: "30px", color: "#fff"}}>
            <Formik
                initialValues={{buyerName: "", mobile: "", address: ""}}
                validationSchema={validationSchema}
                onSubmit={(values) => console.log("Form Submitted", values)}
            >
                {({errors, touched, handleChange, handleBlur, values}) => (
                    <Form style={{width: "100%", marginBottom: '30px'}}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "20px",
                            marginBottom: "10px"
                        }}>
                            <InputField name="buyerName" value={values.buyerName} onChange={handleChange}
                                        onBlur={handleBlur} placeholder="نام خریدار" errors={errors} touched={touched}/>
                            <InputField name="mobile" value={values.mobile} onChange={handleChange} onBlur={handleBlur}
                                        placeholder="موبایل" errors={errors} touched={touched}/>
                        </div>
                        <InputField name="address" value={values.address} onChange={handleChange} onBlur={handleBlur}
                                    placeholder="آدرس" errors={errors} touched={touched}/>
                    </Form>
                )}
            </Formik>

            <hr style={{border: "1px solid #fff"}}/>

            <TableContainer component={Paper} style={{backgroundColor: "#212121"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="right" style={{color: "white", fontWeight: "bold", fontSize: "1.2rem"}}>نام
                                محصول</TableCell>
                            <TableCell align="center" style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "1.2rem"
                            }}>تعداد</TableCell>
                            <TableCell align="center" style={{color: "white", fontWeight: "bold", fontSize: "1.2rem"}}>قیمت
                                واحد</TableCell>
                            <TableCell align="center" style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "1.2rem"
                            }}>تخفیف</TableCell>
                            <TableCell align="center" style={{color: "white", fontWeight: "bold", fontSize: "1.2rem"}}>قیمت
                                کل</TableCell>
                            <TableCell align="center" style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "1.2rem"
                            }}>فعالیت</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <ProductRow
                                key={product.id}
                                product={product}
                                handleInputChange={handleInputChange}
                                handleAdd={handleAdd}
                                handleRemove={handleRemove}
                                toggleAddButton={toggleAddButton}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default App;
