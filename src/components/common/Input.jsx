import { styles, checkErrorAndGetInputClass } from "../../styles/ui.jsx";

export function InputLayout({ label, children }) {
    return (
        <div className={styles.divInput}>
            { label && <label className={styles.label}>{label}</label> }
            {children}
        </div>
    )
}

export function Input({label, name, type, value, onChange, error, required, placeholder, step, onFocus, onBlur, className, classNameAdd}) {
    const inputClass = (className || checkErrorAndGetInputClass(error)) + ` ${classNameAdd || ''}`;
    return (
        <InputLayout label={label}>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className={inputClass}
                required={required}
                placeholder={placeholder}
                step={step}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </InputLayout>
    );
}

export function Select({label, name, options, value, onChange, error, required}) {
    return (
        <InputLayout label={label}>
            <select
                name={name}
                value={value}
                onChange={onChange}
                className={checkErrorAndGetInputClass(error)}
                required={required}
            >
                <option value="" disabled>Выберите вариант</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </InputLayout>
    );
}

export function TextArea({label, name, value, onChange, error, required, rows=1}) {
    return (
        <InputLayout label={label}>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
                className={checkErrorAndGetInputClass(error)}
                required={required}
            />
        </InputLayout>
    );
}