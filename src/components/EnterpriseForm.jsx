import { useState } from "react";

export default function EnterpriseForm() {
    const [form, setForm] = useState({
        enterprise: "",             // название предпр.
        address: "",                // адрес
        readiness: "Действующее",   // готовность
        gasApproval: "",            // документы согл. газ
        projectDocument: "",        // документ - основание
        fuelType: "",               // вид топлива
        fuelAmount: "",             // количество топлива (тыс. т. у. т.)
        fuelApprovalDoc: "",        // документ основание топлива 
        equipment: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 space-y-6 bg-white rounded-xl shadow text-left">
            <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                    Название предприятия
                </label>
                <input
                    type="text"
                    name="enterprise"
                    value={form.enterprise}
                    onChange={handleChange}
                    placeholder=""
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                />
            </div>

            <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                    Адрес расположения
                </label>
                <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Республика, область, населенный пункт"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                />
            </div>

            <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                    Готовность предприятия
                </label>
                <select
                    name="readiness"
                    value={form.readiness}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                >
                    <option>Действующее</option>
                    <option>Реконструируемое</option>
                    <option>Строящееся</option>
                    <option>Проектируемое</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                    Документы согласования об использовании природного газа
                </label>
                <textarea
                    name="gasApproval"
                    value={form.gasApproval}
                    onChange={handleChange}
                    placeholder="Дата, номер, наименование организации"
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-y outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                />
            </div>

            <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                    Заключение добывающих (производящих) уголь, торф, сланец и дрова предприятий, объединений, ассоциаций, концернов
                </label>
                <textarea
                    name="fuelConclusion"
                    value={form.fuelConclusion}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-y outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                />
            </div>

            <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                    На основании какого документа проектируется, строится, расширяется, реконструируется предприятие
                </label>
                <textarea
                    name="projectDocument"
                    value={form.projectDocument}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-y outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                />
            </div>

            <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                    Вид и количество (тыс. т. у. т.) используемого топлива и документ-основание
                </label>
                <textarea
                    name="currentFuel"
                    value={form.currentFuel}
                    onChange={handleChange}
                    placeholder="Вид топлива, количество, дата документа, номер, установленный расход, месторождение (для твердого топлива)"
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-y outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                />
            </div>

            <div className="space-y-2">
                <label className="block font-medium text-gray-700">
                    Тип и марка оборудования, количество штук
                </label>
                <textarea
                    name="equipment"
                    value={form.equipment}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 resize-y outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                />
            </div>

            <button type="submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                Отправить
            </button>

        </form>
    );
}