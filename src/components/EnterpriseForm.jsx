import { useState } from "react";
import { AddressInput } from "./AddressInput.jsx";
import EquipmentInput from "./EquipmentInput.jsx";
import { styles, checkErrorAndGetInputClass } from "../styles.jsx";
import { submitEnterpriseForm } from "../api.js";

const readinessOptions = [
    { id: "operating", label: "Действующее" },
    { id: "reconstructing", label: "Реконструируемое" },
    { id: "building", label: "Строящееся" },
    { id: "designing", label: "Проектируемое" },
];

const fuelType = [
    { id: "fuel", label: "Условное топливо" },
    { id: "gas", label: "Природный газ" },
    { id: "coal", label: "Каменный уголь" },
    { id: "oil", label: "Мазут" },
];

const initialFormState = {
    name: "",             // название предпр.
    address: "",                // адрес
    readiness: "",              // готовность
    gasApproval: "",            // документы согл. газ
    projectDocument: "",        // документ - основание
    fuel: {
        type: "",               // вид топлива
        approvalDoc: "",        // документ - основание топлива 
    },
    equipmentList: [
        {
            developer: null,
            model: null,
            number: null,
        },
    ],          
};

export default function EnterpriseForm() {

    const [form, setForm] = useState(initialFormState);
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
                [e.target.name]: e.target.value.trim(),
            }
        });
    };
    
    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        // Проверка основных полей
        if (!form.name.trim()) {
            newErrors.name = true;
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
        if (!form.fuel.approvalDoc.trim()) {
            newErrors.fuel.approvalDoc = true;
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
        if (!form.fuel.approvalDoc.trim()) {
            newErrors.fuel = { ...newErrors.fuel, approvalDoc: "Документ одобрения обязателен." };
            isValid = false;
        }

        // Проверка полей оборудования
        if (!form.equipmentList.some((item) => item.developer)) {
            newErrors.equipmentList = { ...newErrors.equipmentList, developer: "Производитель оборудования обязателен." };
            isValid = false;
        }
        if (!form.equipmentList.some((item) => item.model)) {
            newErrors.equipmentList = { ...newErrors.equipmentList, model: "Модель оборудования обязательна." };
            isValid = false;
        }
        if (!form.equipmentList.some((item) => item.number)) {
            newErrors.equipmentList = { ...newErrors.equipmentList, number: "Количество оборудования обязательно." };
            isValid = false;
        } else {
            //
        }

        setErrors(newErrors);
        console.log(newErrors);

        return isValid
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(validateForm()){   
            console.log(form);
            submitEnterpriseForm(form);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className="font-bold text-xl text-gray-700">Заполните форму</h1>
            
            <div className={styles.divInput}>
                <label className={styles.label}>
                    Название предприятия
                </label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder=""
                    className={checkErrorAndGetInputClass(errors.name) + ""}
                    required
                />
            </div>

            <AddressInput currentAddress={form.address} errors={errors} setAddress={(e) => { 
                handleChange({ target: { name: "address", value: e } });
            }} />

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
                    <option value="" disabled>Выберите готовность</option>
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
                <legend className={styles.legend}>Запрашиваемое топливо</legend>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                </div>
            </fieldset>

            <EquipmentInput equipmentList={form.equipmentList} setEquipmentList={(l) => { 
                setForm({
                    ...form,
                    equipmentList: l,
                });
            }} errors={errors} />

            <button type="submit" className={`${styles.buttonBlack} w-full`}>Отправить</button>

        </form>
    );
}