export type Unit = "b" | "kb" | "mb" | "gb";

const conversionRate: Record<Unit, number> = {
    b: 1,
    kb: 1e3,
    mb: 1e6,
    gb: 1e9,
};

export function convertUnit(value: number, fromUnit: Unit, toUnit: Unit) {
    return (value * conversionRate[fromUnit]) / conversionRate[toUnit];
}

export function convertFromBytesToSensible(value: number){
    if(value < 1e3){
        return {value, unit: "b" as Unit}
    }
    if(value < 1e6){
        return {value: convertUnit(value, "b", "kb"), unit: "kb" as Unit}
    }
    if(value < 1e9){
        return {value: convertUnit(value, "b", "mb"), unit: "mb" as Unit}
    }
    return {value: convertUnit(value, "b", "gb"), unit: "gb" as Unit}
}