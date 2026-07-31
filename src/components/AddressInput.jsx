import { getAddressList } from "../api";
import { useState, useRef } from "react";
import { styles, checkErrorAndGetInputClass } from "../styles.jsx";

export function AddressInput({ currentAddress, errors, setAddress }) {
    const [addressList, setAddressList] = useState([]);
    const [addressInputStyle, setAddressInputStyle] = useState(
        `${checkErrorAndGetInputClass(errors.address)} mt-2`);
    const addressListRef = useRef(null);

    const toggleBottomBorder = (rounded) => {
        const newStyle = checkErrorAndGetInputClass(errors.address).replace(
            rounded ? "rounded-lg" : "rounded-t-lg",
            rounded ? "rounded-t-lg" : "rounded-lg",
        );
        console.log(newStyle);
        setAddressInputStyle(newStyle);
    }

    const handleChange = (e) => {
        setAddress(e.target.value);
        
        getAddressList(e.target.value)
            .then((data) => {
                setAddressList(data);
                toggleBottomBorder(data.length > 0);
            })
            .catch((error) => {
                console.log(error);
            });
        
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
                        addressListRef.current.style.display = "block";
                    }
                    
                }}
                onBlur={() => {
                    setTimeout(() => {
                        toggleBottomBorder(false);
                        addressList.length > 0 && (addressListRef.current.style.display = "none");
                    }, 100);
                }}
                required
            />

            {addressList.length > 0 && (
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