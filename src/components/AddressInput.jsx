import { getAddressList } from "../api";
import { useState, useRef } from "react";
import { styles, checkErrorAndGetInputClass } from "../styles.jsx";

export function AddressInput({ currentAddress, errors, setAddress }) {
    const [addressList, setAddressList] = useState([]);
    const [addressInputStyle, setAddressInputStyle] = useState(
        `${checkErrorAndGetInputClass(errors.address)} mt-2`);
    const [showSuggestions, setShowSuggestions] = useState(true);

    const addressListRef = useRef(null);
    const debounceRef = useRef(null);
    const requestIdRef = useRef(0);

    const toggleBottomBorder = (rounded) => {
        const newStyle = checkErrorAndGetInputClass(errors.address).replace(
            rounded ? "rounded-lg" : "rounded-t-lg",
            rounded ? "rounded-t-lg" : "rounded-lg",
        );
        console.log(newStyle);
        setAddressInputStyle(newStyle);
    }

    const handleChange = (e) => {
        const value = e.target.value;
        
        setAddress(value);
        clearTimeout(debounceRef.current);
        
        debounceRef.current = setTimeout(() => {
            const requestId = ++requestIdRef.current;
            getAddressList(value)
                .then((data) => {
                    if (requestId !== requestIdRef.current) return;
                    
                    setAddressList(data);
                    toggleBottomBorder(data.length > 0);
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 300);
    };
    
    return (
        <div className={`relative`}>
            <label className={styles.label}>Адрес расположения</label>

            <input
                type="text"
                value={currentAddress}
                onChange={handleChange}
                placeholder="Город, улица, дом, квартира/офис"
                className={addressInputStyle}
                onFocus={() => {
                    if(addressList.length > 0) {
                        toggleBottomBorder(true);
                        setShowSuggestions(true);
                    }
                    
                }}
                onBlur={() => {
                    setTimeout(() => {
                        toggleBottomBorder(false);
                        setShowSuggestions(false);
                    }, 100);
                }}
                required
            />

            {addressList.length > 0 && showSuggestions && (
                <ul
                    className={ styles.addressPromptContainer }
                    ref={addressListRef}
                >
                    {addressList.map((address) => (
                        <li
                            key={address}
                            onMouseDown={() => {
                                setAddress(address);
                                // setAddressList([]);
                            }}
                            className={ styles.addressPromptItem }
                        >
                            {address}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}