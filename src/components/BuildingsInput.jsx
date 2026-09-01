import { useState, useEffect } from "react";
import { AddressInput } from "./AddressInput.jsx";
import { styles } from "../styles/ui.jsx";
import { getBuildingTypes } from "../api/building.js";
import { Select, TextArea, Input } from "./common/Input.jsx";

const readinessOptions = [
    { id: "operating", label: "Действующее" },
    { id: "reconstructing", label: "Реконструируемое" },
    { id: "building", label: "Строящееся" },
    { id: "designing", label: "Проектируемое" },
];

function BuildingItem({ index, buildingList, setBuildingList, errors, buildingTypes }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const building = buildingList[index];

    const handleChange = (e, name, value) => {

        if (typeof e === 'object' && e?.target && !name) {
            name = e.target.name;
            value = e.target.value;
        }

        setBuildingList(buildingList.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    [name]: value,
                };
            }
            return item;
        }))
    };
    const rdops = readinessOptions.map((option) => {return { id: option.id, name: option.label }});
    
    return(
        <div className={ (isExpanded ? "bg-slate-50 p-4 rounded-lg shadow" : "") }>
            <div className="flex items-end gap-2">
                <div className="flex-1">
                    <Input
                        label={ isExpanded ? "" : "" }
                        type="text"
                        name="name"
                        value={building.name}
                        placeholder="Название предприятия"
                        onChange={handleChange}
                        error={errors.name}
                        required
                    />
                </div>

                <button
                    type="button"
                    className={styles.buttonBlack}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? "▲" : "▼"}
                </button>
                <button 
                    type="button" 
                    className={`${styles.buttonRed}`}
                    onClick={() => {
                        const updatedBuildingList = buildingList.filter((_, i) => i !== index);
                        setBuildingList(updatedBuildingList);
                    }}
                >
                    -
                </button>
            </div>

            {isExpanded && (
            <>
                <div className="mt-2">
                    <AddressInput currentAddress={building.address} errors={errors.address || {}} setAddress={
                        (v) => handleChange(null, 'address', v)} 
                    />
                </div>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-4">
                    <Select 
                        label="Готовность предприятия" 
                        name="readiness"
                        value={ building.readiness } 
                        options={ rdops }
                        onChange={handleChange} 
                        error={errors.readiness}
                        required
                    />

                    <Select
                        label="Тип здания"
                        name="type"
                        value={ building.type }
                        options={ buildingTypes || [] }
                        onChange={handleChange}
                        error={errors.type}
                        required
                    />
                </div>
                
                <div className="grid grid-cols-2 gap-2 md:grid-cols-2 mt-2 mb-4">
                    <Input
                        label="Внутренняя температура (°C)"
                        type="number"
                        name="innerTemperature"
                        value={building.innerTemperature || ""}
                        onChange={handleChange}
                        step="0.1"
                        error={errors.innerTemperature}
                    />

                    <Input
                        label="Наружный объем здания (м³)"
                        type="number"
                        name="volume"
                        value={building.volume || ""}
                        onChange={handleChange}
                        step="0.1"
                        error={errors.volume}
                    />
                </div>

                <TextArea
                    label="Документы согласования об использовании природного газа"
                    name="gasApproval"
                    value={building.gasApproval}
                    onChange={handleChange}
                    placeholder="Дата, номер, наименование организации"
                    error={errors.gasApproval}
                    required
                />

                <TextArea 
                    label="На основании какого документа проектируется, строится, расширяется, реконструируется предприятие" 
                    name="projectDocument"
                    value={ building.projectDocument } 
                    onChange={handleChange} 
                    error={errors.projectDocument}
                    required
                />

            </>)}

        </div>
    );
}

export default function BuildingInput({ buildingList, setBuildingList, errors }) {
    const [buildingTypes, setBuildingTypes] = useState([]);

    useEffect(() => {
        getBuildingTypes()
            .then((data) => {
                setBuildingTypes(data.sort((a, b) => a.name.localeCompare(b.name, 'ru')));
            })
            .catch((error) => {
                console.log("Error fetching building types:", error);
            });
    }, []);

    return (
        <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Здания</legend>
            {buildingList && buildingList.map((item, index) => (
                <BuildingItem 
                    key={index} 
                    index={index} 
                    buildingList={buildingList} 
                    setBuildingList={setBuildingList}
                    errors={errors} 
                    buildingTypes={buildingTypes}
                />
            ))}
            <div className={`${styles.divInput}`}>
                <button 
                    type="button" 
                    className={`${styles.buttonBlackInversed} w-full`} 
                    onClick={() => setBuildingList([...buildingList, { 
                        name: "", 
                        type: "", 
                        address: "", 
                        readiness: "", 
                        projectDocument: "", 
                        gasApproval: "", 
                        innerTemperature: null, 
                        volume: null, 
                     }])}
                >
                    +
                </button>
            </div>
        </fieldset>
    );
}