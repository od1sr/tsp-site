export const styles = {
    form: "max-w-4xl mx-auto p-8 space-y-6 bg-white rounded-xl shadow text-left",
    inputBasic: "w-full rounded-lg border px-4 py-2 outline-none focus:ring-2",
    inputValid: `border-gray-300 focus:border-blue-500 focus:ring-blue-300`,
    inputInvalid: `border-red-300 focus:border-red-500 focus:ring-red-300 placeholder-red-300`,
    label: "block font-medium text-gray-700",
    labelSM: "block text-sm font-medium text-gray-600",
    fieldset: "space-y-4 rounded-lg border p-4",
    legend: "px-2 font-medium text-gray-700",
    button: "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
    divInput: "space-y-2",
    addressPromptContainer: "absolute top-full left-0 right-0 z-50 max-h-64 overflow-y-auto rounded-b-xl border border-gray-200 bg-white shadow-lg ",
    addressPromptItem: "cursor-pointer px-4 py-3 text-sm transition-colors hover:bg-gray-100 "
}

export const checkErrorAndGetInputClass = (errorText) => {
    return styles.inputBasic + ' ' + (errorText ? styles.inputInvalid : styles.inputValid);
};

export const errorMsg = (message) => {
    if (message)
        return (<span className="text-xs text-red-300">{message}</span>);
}