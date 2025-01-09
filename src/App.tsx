import {useState} from "react";
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import InputField from "./components/InputField.tsx";
import ProductRow from "./components/ProductRow.tsx";

const App = () => {
    const [products, setProducts] = useState([
        {id: 1, name: "محصول یک", count: 0, unitPrice: 120000, discount: 10000, added: false},
        {id: 2, name: "محصول دو", count: 0, unitPrice: 130000, discount: 7000, added: false},
        {id: 3, name: "محصول چهار", count: 0, unitPrice: 140000, discount: 8200, added: false},
        {id: 4, name: "محصول پنج", count: 0, unitPrice: 150000, discount: 8500, added: false},
        {id: 5, name: "محصول شش", count: 0, unitPrice: 160000, discount: 8500, added: false},
    ]);

    const validationSchema = Yup.object({
        buyerName: Yup.string().required("نام خریدار الزامی است"),
        mobile: Yup.string()
            .matches(/^09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/, "شماره موبایل باید به صورت 9190719287 باشد")
            .required("موبایل الزامی است"),
        address: Yup.string().required("آدرس الزامی است"),
    });

    const handleInputChange = (id: number, field: string, value: any) => {
        setProducts(prev => prev.map(product => product.id === id ? {...product, [field]: value} : product));
    };

    const handleAdd = (id: number) => {
        setProducts(prev => prev.map(product => product.id === id ? {...product, count: product.count + 1} : product));
    };

    const handleRemove = (id: number) => {
        setProducts(prev => prev.map(product => product.id === id && product.count > 0 ? {
            ...product,
            count: product.count - 1
        } : product));
    };

    const toggleAddButton = (id: number) => {
        setProducts(prev => prev.map(product => product.id === id ? {...product, added: !product.added} : product));
    };

    return (
        <Container maxWidth="xl" style={{marginTop: "30px", color: "#fff"}}>
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
            <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '30px'}}>
                <Typography style={{margin: '10px 50px', padding: 10, fontSize: 20, fontWeight: 'bold'}}> قیمت
                    نهایی </Typography>
                <Typography style={{
                    border: '1px solid #0073A4',
                    margin: '10px 0px',
                    padding: '10px 60px',
                    borderRadius: 15,
                    fontSize: 20,
                    fontWeight: 'bold'
                }}> {products.filter(f => f.added)
                    .map(product => (product.unitPrice - product.discount) * product.count)
                    .reduce((a, sum) => a + sum, 0)
                    .toLocaleString()} </Typography>
            </div>
        </Container>
    );
};

export default App;
