import { getDevelopers, getBoilers } from "../api/equipment.js";
import { useState, useEffect } from "react";
import { styles } from "../styles/ui.jsx";
import { Select, Input } from "./common/Input.jsx";

export default function EquipmentInput({ equipmentList, setEquipmentList, errors }) {
    const [developers, setDevelopers] = useState([]);
    const [boilers, setBoilers] = useState({});
    
    useEffect(() => {
        getDevelopers()
            .then((data) => {
                setDevelopers(data);
            })
            .catch((error) => {
                console.log("Error fetching developers:", error);
            });
    }, []);

    const handleDeveloperChange = (index, developerId) => {
        const updatedEquipmentList = [...equipmentList];
        updatedEquipmentList[index].developer = developerId;
        updatedEquipmentList[index].model = null; // Reset model when developer changes
        setEquipmentList(updatedEquipmentList);

        if (developerId) {
            getBoilers(developerId)
                .then((data) => {
                    setBoilers((prevBoilers) => ({
                        ...prevBoilers,
                        [developerId]: data,
                    }));
                })
                .catch((error) => {
                    console.log("Error fetching boilers:", error);
                });
        }
    };

    const handleModelChange = (index, modelId) => {
        const updatedEquipmentList = [...equipmentList];
        updatedEquipmentList[index].model = modelId;
        setEquipmentList(updatedEquipmentList);
    }

    const handleNumberChange = (index, number) => {
        const updatedEquipmentList = [...equipmentList];
        updatedEquipmentList[index].number = number;
        setEquipmentList(updatedEquipmentList);
    }

    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Оборудование</legend>
            <div className="relative overflow-x-auto sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="border-b border-gray-200">
                        <tr>
                            <th className="px-2 py-2 text-left text-sm font-medium text-gray-700 w-4">Производитель</th>
                            <th className="px-2 py-2 text-left text-sm font-medium text-gray-700">Марка (модель)</th>
                            <th className="px-2 py-2 text-left text-sm font-medium text-gray-700">Мощность (кВт)</th>
                            <th className="px-2 py-2 text-left text-sm font-medium text-gray-700">КПД (%)</th>
                            <th className="px-2 py-2 text-left text-sm font-medium text-gray-700 w-4">Количество (шт)</th>
                            <th className="px-2 py-2 w-10 text-white">...</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipmentList.map((item, index) => {
                            const currentBoiler = boilers[item.developer]?.find((b) => b.id == item.model);
                            return (
                                <tr key={index} className="align-top border-b border-gray-200">
                                <td className="px-2 py-2">
                                    <Select
                                        name="developer"
                                        value={item.developer || ""}
                                        onChange={(e) => handleDeveloperChange(index, e.target.value)}
                                        options={developers}
                                        error={errors.equipmentList?.[index]?.developer}
                                        required
                                    />
                                </td>
                                <td className="px-2 py-2">
                                    <Select
                                        name="model"
                                        value={item.model || ""}
                                        onChange={(e) => handleModelChange(index, e.target.value)}
                                        options={boilers[item.developer]?.map(b => ({ id: b.id, name: b.model_name })) || []}
                                        error={errors.equipmentList?.[index]?.model}
                                        required
                                    />
                                </td>
                                <td className="px-2 py-2">
                                    <div className={`${styles.divInput} mt-2`}>
                                        <span className="text-gray-700 w-full px-4 py-2">
                                            {currentBoiler?.power || "-"}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-2 py-2">
                                    <div className={`${styles.divInput}  mt-2`}>
                                        <span className="text-gray-700 w-full px-4 py-2">
                                            {currentBoiler?.efficiency || "-"}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-2 py-2">
                                    <Input
                                        type="number"
                                        name="number"
                                        value={item.number || ""}
                                        onChange={(e) => handleNumberChange(index, e.target.value)}
                                        error={errors.equipment?.number}
                                        step="1"
                                        required
                                    />
                                </td>
                                <td className="px-2 py-2">
                                        <button 
                                            type="button" 
                                            className={`${styles.buttonRed} w-full`}
                                            onClick={() => {
                                                const updatedEquipmentList = equipmentList.filter((_, i) => i !== index);
                                                setEquipmentList(updatedEquipmentList);
                                            }}
                                            >
                                            -
                                        </button>
                                </td>
                            </tr>
                        )}
                    )}

                    </tbody>
                </table>
            </div>
                <div className={`${styles.divInput} px-2`}>
                    <button 
                        type="button" 
                        className={`${styles.buttonBlackInversed} w-full`} 
                        onClick={() => setEquipmentList([...equipmentList, { developer: null, model: null, number: null }])}
                        >
                        +
                    </button>
                </div>
            </fieldset>
    );
}