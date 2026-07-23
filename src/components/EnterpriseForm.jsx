import { useState } from "react";

const styles = {
    form: "max-w-4xl mx-auto p-8 space-y-6 bg-white rounded-xl shadow text-left",
    inputValid: "w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300",
    inputInvalid: "w-full rounded-lg border border-red-300 px-4 py-2 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300 placeholder-red-300",
    label: "block font-medium text-gray-700",
    labelSM: "block text-sm font-medium text-gray-600",
    fieldset: "space-y-4 rounded-lg border p-4",
    legend: "px-2 font-medium text-gray-700",
    button: "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
    divInput: "space-y-2",
};

const readinessOptions = [
    { id: "operating", label: "Действующее" },
    { id: "reconstructing", label: "Реконструируемое" },
    { id: "building", label: "Строящееся" },
    { id: "designing", label: "Проектируемое" },
];

const fuelType = [
    { id: "gas", label: "Природный газ" },
    { id: "coal", label: "Каменный уголь" },
    { id: "oil", label: "Мазут" },
];

const equipmentTypeOptions = [
    { id: "type1", label: "Тип 1" },
    { id: "type2", label: "Тип 2" },
    { id: "type3", label: "Тип 3" },
];

const equipmentBrandOptions = [
    { id: "brand1", label: "Марка 1" },
    { id: "brand2", label: "Марка 2" },
    { id: "brand3", label: "Марка 3" },
];

export default function EnterpriseForm() {


    const [form, setForm] = useState({
        enterprise: "",             // название предпр.
        address: "",                // адрес
        readiness: "",              // готовность
        gasApproval: "",            // документы согл. газ
        fuelConclusion: "",         // заключение добывающих топливо предприятий
        projectDocument: "",        // документ - основание
        fuel: {
            type: "",               // вид топлива
            amount: "",             // количество топлива (тыс. т. у. т.)
            approvalDoc: "",        // документ - основание топлива 
        },
        equipment: {
            type: "",               // тип оборудования
            brand: "",              // марка оборудования
            number: "",             // количество штук
        },
    });
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleChangeNested = (e, node) => { 
        setForm({
            ...form,
            [node]: {
                ...form[node],
                [e.target.name]: e.target.value,
            }
        });
    };
    
    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        // Проверка основных полей
        if (!form.enterprise.trim()) {
            newErrors.enterprise = true;
            isValid = false;
        }
        if (!form.address.trim()) {
            newErrors.address = true;
            isValid = false;
        }
        if (!form.readiness) {
            newErrors.readiness = true;
            isValid = false;
        }
        if (!form.gasApproval.trim()) {
            newErrors.gasApproval = true;
            isValid = false;
        }
        if (!form.fuelConclusion.trim()) {
            newErrors.fuelConclusion = true;
            isValid = false;
        }
        if (!form.projectDocument.trim()) {
            newErrors.projectDocument = true;
            isValid = false;
        }

        // Проверка полей топлива
        if (!form.fuel.type) {
            newErrors.fuel = { ...newErrors.fuel, type: "Вид топлива обязателен." };
            isValid = false;
        }
        if (!form.fuel.amount) {
            newErrors.fuel = { ...newErrors.fuel, amount: "Количество топлива обязательно." };
            isValid = false;
        } else {
            const amount = parseFloat(form.fuel.amount);
            if (isNaN(amount) || amount <= 0) {
                newErrors.fuel = { ...newErrors.fuel, amount: "Количество топлива должно быть числом больше нуля." };
                isValid = false;
            }
        }
        if (!form.fuel.approvalDoc.trim()) {
            newErrors.fuel = { ...newErrors.fuel, approvalDoc: true };
            isValid = false;
        }

        // Проверка полей оборудования
        if (!form.equipment.type) {
            newErrors.equipment = { ...newErrors.equipment, type: true };
            isValid = false;
        }
        if (!form.equipment.brand) {
            newErrors.equipment = { ...newErrors.equipment, brand: true };
            isValid = false;
        }
        if (!form.equipment.number) {
            newErrors.equipment = { ...newErrors.equipment, number: "Количество оборудования обязательно." };
            isValid = false;
        } else {
            const num = parseInt(form.equipment.number);
            if (isNaN(num) || num <= 0 || !Number.isSafeInteger(num) || form.equipment.number.indexOf('.') != -1) {
                newErrors.equipment = { 
                    ...newErrors.equipment, 
                    number: "Количество оборудования должно быть целым числом больше нуля." 
                };
                isValid = false;
            }
        }

        setErrors(newErrors);
        console.log(newErrors);

        return isValid
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(validateForm()){   
            console.log(form);
        }
    };

    const checkErrorAndGetInputClass = (errorText) => {
        return errorText ? styles.inputInvalid : styles.inputValid;
    };
    
    const errorMsg = (message) => {
        if (message)
            return (<span className="text-xs text-red-300">{message}</span>);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className="font-bold text-xl text-gray-700">Заполните форму</h1>
            
            <div className={styles.divInput}>
                <label className={styles.label}>
                    Название предприятия
                </label>
                <input
                    type="text"
                    name="enterprise"
                    value={form.enterprise}
                    onChange={handleChange}
                    placeholder=""
                    className={checkErrorAndGetInputClass(errors.enterprise) + ""}
                    required
                />
            </div>

            <div className={styles.divInput}>
                <label className={styles.label}>
                    Адрес расположения
                </label>
                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Республика, область, населенный пункт"
                    className={checkErrorAndGetInputClass(errors.address)}
                    required
                />
            </div>

            <div className={styles.divInput}>
                <label className={styles.label}>
                    Готовность предприятия
                </label>
                <select
                    name="readiness"
                    value={form.readiness}
                    onChange={handleChange}
                    className={checkErrorAndGetInputClass(errors.readiness)}
                    required
                >
                    <option value="" disabled></option>
                    {readinessOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.divInput}>
                <label className={styles.label}>
                    Документы согласования об использовании природного газа
                </label>
                <textarea
                    name="gasApproval"
                    value={form.gasApproval}
                    onChange={handleChange}
                    placeholder="Дата, номер, наименование организации"
                    rows={3}
                    className={checkErrorAndGetInputClass(errors.gasApproval)}
                    required
                />
            </div>

            <div className={styles.divInput}>
                <label className={styles.label}>
                    Заключение добывающих (производящих) уголь, торф, сланец и дрова предприятий, объединений, ассоциаций, концернов
                </label>
                <textarea
                    name="fuelConclusion"
                    value={form.fuelConclusion}
                    onChange={handleChange}
                    rows={4}
                    className={checkErrorAndGetInputClass(errors.fuelConclusion)}
                    required
                />
            </div>

            <div className={styles.divInput}>
                <label className={styles.label}>
                    На основании какого документа проектируется, строится, расширяется, реконструируется предприятие
                </label>
                <textarea
                    name="projectDocument"
                    value={form.projectDocument}
                    onChange={handleChange}
                    rows={3}
                    className={checkErrorAndGetInputClass(errors.projectDocument)}
                    required
                />
            </div>

            {/* --- Секция Топливо --- */}
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Используемое топливо</legend>
                <div className={styles.divInput}>
                    <label className={styles.label}>
                        Вид топлива
                    </label>
                    <select
                        name="type"
                        value={form.fuel.type}
                        onChange={(e) => handleChangeNested(e, "fuel")}
                        className={checkErrorAndGetInputClass(errors?.fuel?.type)}
                    required
                    >
                        <option value="" disabled>Выберите тип</option>
                        {fuelType.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.divInput}>
                    <label className={styles.label}>Количество топлива (тыс. т. у. т.)</label>
                    <input
                        type="number"
                        name="amount"
                        value={form.fuel.amount}
                        onChange={(e) => handleChangeNested(e, "fuel")}
                        className={checkErrorAndGetInputClass(errors?.fuel?.amount)}
                        required
                    />
                    { errorMsg(errors.fuel?.amount) } 
                </div>
                <div className={styles.divInput}>
                    <label className={styles.label}>Документ-основание</label>
                    <input
                        type="text"
                        name="approvalDoc"
                        value={form.fuel.approvalDoc}
                        onChange={(e) => handleChangeNested(e, "fuel")}
                        placeholder="Дата, номер, кем выдан"
                        className={checkErrorAndGetInputClass(errors?.fuel?.approvalDoc)}
                        required
                    />
                </div>
            </fieldset>

            {/* --- Секция Оборудование --- */}
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Оборудование</legend>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className={styles.divInput}>
                        <label className={styles.label}>Тип</label>
                        <select 
                            name="type" 
                            value={form.equipment.type} 
                            onChange={(e) => handleChangeNested(e, "equipment")} 
                            className={checkErrorAndGetInputClass(errors.equipment?.type)}
                            required
                        >
                            <option value="" disabled>Выберите тип</option>
                            {equipmentTypeOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.divInput}>
                        <label className={styles.label}>Марка</label>
                        <select 
                            name="brand"
                            value={form.equipment.brand} 
                            onChange={(e) => handleChangeNested(e, "equipment")} 
                            className={checkErrorAndGetInputClass(errors.equipment?.brand)}
                            required
                        >
                            <option value="" disabled>Выберите марку</option>
                            {equipmentBrandOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>                                                                                                                          
                    <div className={styles.divInput}>
                        <label className={styles.label}>Количество (шт)</label>
                        <input 
                            type="number" 
                            name="number" 
                            value={form.equipment.number} 
                            onChange={(e) => handleChangeNested(e, "equipment")} 
                            className={checkErrorAndGetInputClass(errors.equipment?.number)} 
                            step="1" 
                            required
                        />
                    { errorMsg(errors.equipment?.number) } 
                    </div>
                </div>
            </fieldset>

            <button type="submit" className={styles.button}>Отправить</button>

        </form>
    );
}