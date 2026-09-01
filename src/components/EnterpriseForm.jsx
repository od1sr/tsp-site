import { useState, useEffect } from "react";
import EquipmentInput from "./EquipmentInput.jsx";
import BuildingInput from "./BuildingsInput.jsx";
import { styles } from "../styles/ui.jsx";
import { Input, Select, TextArea } from "./common/Input.jsx";
import { fetchFuelTypes } from "../api/fuel.js";
import { submitEnterpriseForm } from "../api/enterpriseForm.js";

const initialFormState = {
    buildings: [
        {             
            name: "",                   // название предпр.
            type: "",                   // тип здания
            address: "",                // адрес
            readiness: "",              // готовность
            projectDocument: "",        // документ - основание
            gasApproval: "",            // документы согл. газ
            innerTemperature: null,     // внутренняя температура
            volume: null,               // объем здания
        },
    ],
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
    const [errors, _] = useState({});
    //const [errors, setErrors] = useState({});
    const [fuelType, setFuelType] = useState([]);

    const ncv = (form.fuel && fuelType.filter((f) => f.type === form.fuel.type)[0]?.net_calorific_value) || "-";

    useEffect(() => {
        // Fetch fuel types from API
        fetchFuelTypes().then((types) => {
            setFuelType(types);
        }).catch((error) => {
            console.error('Error fetching fuel types:', error);
        });
    }, []);        

    // const handleChange = (e) => {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value,
    //     });
    // };
    
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
        return true;
        
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

        //setErrors(newErrors);
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

            <BuildingInput buildingList={form.buildings} setBuildingList={(l) => { 
                setForm({
                    ...form,
                    buildings: l,
                });
            }} errors={errors.buildings || {}} />
            
            <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Запрашиваемое топливо</legend>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <Select
                        label="Вид топлива"
                        name="type"
                        value={form.fuel.type}
                        onChange={(e) => handleChangeNested(e, "fuel")}
                        options={fuelType?.map(ft => ({ id: ft.type, name: ft.name })) || []}
                        error={errors?.fuel?.type}
                        required
                    />
                    <Input
                        label="Документ-основание"
                        type="text"
                        name="approvalDoc"
                        value={form.fuel.approvalDoc}
                        onChange={(e) => handleChangeNested(e, "fuel")}
                        placeholder="Дата, номер, кем выдaн"
                        error={errors?.fuel?.approvalDoc}
                        required
                    />
                    { form.fuel.type && 
                        <p className="text-gray-500 w-full px-2 py-0 italic">
                            { `Рабочая низшая теплота сгорания = ${ncv} ГКал/Т`.replace('.', ',') }
                        </p>
                    }
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