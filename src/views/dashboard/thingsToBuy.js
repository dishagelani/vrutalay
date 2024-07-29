import { useState, useEffect, useContext } from 'react';
import Navbar from '../../components/navbar';
import Alert from '../../components/alert';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../../context/toDoContext';
import Loader from '../../components/loader';

const ProductItem = ({ name, id, status, onEdit, onDelete, }) => (
    <tr className="even:bg-white odd:bg-gray-50">
        <td className="p-2 w-full">{name}</td>
        <td className="flex py-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 cursor-pointer mx-1"
                onClick={() => onEdit(id, status)}
            >
                {status ? <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />}
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 cursor-pointer mx-1"
                onClick={() => onDelete(id)}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </td>
    </tr>
);

const ThingsToBuy = () => {
    const navigate = useNavigate();
    const {
        addProductToFirestore,
        getAllProductsFromFirestore,
        setProductStatusInFirestore,
        deleteProductInFirestore,
        error,
        setError
    } = useContext(TodoContext);

    const [product, setProduct] = useState({ name: '', fromIndia: false });
    const [productList, setProductList] = useState(null);
    const [productsFromIndia, setProductsFromIndia] = useState(null);
    const [flag, setFlag] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        addProductToFirestore(product)
            .then(() => {
                setFlag(prevFlag => !prevFlag);
                setProduct({ name: '', fromIndia: false });
            })
            .catch(() => setError('Yikes! 😕 Something broke. Try again shortly!'));
    };

    const handleEdit = (id, status) => {
        setProductStatusInFirestore(id, status)
            .then(() => setFlag(prevFlag => !prevFlag))
            .catch(() => setError('Yikes! 😕 Something broke. Try again shortly!'));
    };


    const handleDelete = (id) => {
        deleteProductInFirestore(id)
            .then(() => setFlag(prevFlag => !prevFlag))
            .catch(() => setError('Yikes! 😕 Something broke. Try again shortly!'));
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const documents = await getAllProductsFromFirestore();
                const products_I = [];
                const products = [];

                documents.docs.forEach(doc => {
                    const productData = { id: doc.id, ...doc.data() };
                    if (productData.fromIndia) {
                        products_I.push(productData);
                    } else {
                        products.push(productData);
                    }
                });

                setProductsFromIndia(products_I);
                setProductList(products);

            } catch (err) {
                setError('Failed to fetch products.');
            }
        };
        fetchProducts();
    }, [flag]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [error, setError]);

    return (
        <>
            <Navbar />

            {error && (
                <div className="flex justify-center my-2">
                    <Alert message={error} />
                </div>
            )}
            
            {productList && productsFromIndia ? <> <div className='w-full h-full'>
            {/* BACK BUTTON  */}
                <div className="max-w-full font-semibold text-blueGray-700 my-4 mx-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>

                {/* PRODUCT LISTING */}

                {productList.length === 0 && productsFromIndia.length === 0 ? (
                    <div className="relative h-50vh flex items-center justify-center">
                        <div className="text-center">
                            <p className="bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient font-bold">
                                The only thing growing today is our savings account.
                            </p>
                            <span>😋</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {productList.length > 0 && (
                            <>
                                <p className="m-4 text-sm leading-6 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient">
                                    House wants vs. wallet’s screams!
                                </p>
                                <div className="mx-4 overflow-y-scroll shadow-md sm:rounded-lg max-h-25vh">
                                    <table className="text-sm text-left border-grey-500">
                                        <tbody >
                                            {productList.map(product => (
                                                <ProductItem
                                                    key={product.id}
                                                    name={product.name}
                                                    id={product.id}
                                                    onEdit={handleEdit}
                                                    onDelete={handleDelete}
                                                    status={true}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}

                        {productsFromIndia.length > 0 && (
                            <>
                                <p className="m-4 text-sm leading-6 font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-gradient">
                                    Essentials we're ordering from our hometown!
                                </p>
                                <div className="mx-4 overflow-y-scroll shadow-md sm:rounded-lg max-h-25vh">
                                    <table className="text-sm text-left border-grey-500">
                                        <tbody >
                                            {productsFromIndia.map(product => (
                                                <ProductItem
                                                    key={product.id}
                                                    name={product.name}
                                                    id={product.id}
                                                    onEdit={handleEdit}
                                                    onDelete={handleDelete}
                                                    status={false}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>


            {/* ADD A NEW PRODUCT */}

            <div className="fixed bottom-0 right-0 w-full">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between p-4">
                        <input
                            type="text"
                            required
                            placeholder="Sneak in another purchase!"
                            value={product.name}
                            className="block w-full p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        />
                        <div
                            className={`text-white cursor-pointer p-3 ml-2 rounded-full ${product.fromIndia ? 'bg-gradient-to-r from-cyan-500 to-blue-500 z-50 shadow-xl' : 'shadow-custom'}`}
                            onClick={() => setProduct(prev => ({ ...prev, fromIndia: !prev.fromIndia }))}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke='white'
                                className="size-6"
                            >
                                {product.fromIndia ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 12L11.204 3.045c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                    />
                                ) : (
                                    <>
                                        <defs>
                                            <linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#06b6d4" />
                                                <stop offset="100%" stopColor="#3b82f6" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            stroke="url(#gradientStroke)"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.25 12L11.204 3.045c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                        />
                                    </>
                                )}
                            </svg>
                        </div>
                        <div
                            className="text-white cursor-pointer shadow-xl p-3 ml-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            onClick={handleSubmit}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </div>
                    </div>
                </form>
            </div></> : <Loader/>}

           
        </>
    );
};

export default ThingsToBuy;
