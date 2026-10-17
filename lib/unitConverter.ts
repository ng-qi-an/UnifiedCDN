export type Unit = "b" | "kb" | "mb" | "gb";

const conversionRate: Record<Unit, number> = {
    b: 1,
    kb: 1024,
    mb: 1024 ** 2,
    gb: 1024 ** 3,
};

export function convertUnit(value: number, fromUnit: Unit, toUnit: Unit) {
    return (value * conversionRate[fromUnit]) / conversionRate[toUnit];
}

export function convertFromBytesToSensible(value: number){
    if(value < conversionRate.kb){
        return {value: value, unit: "b" as Unit}
    }
    if(value < conversionRate.mb){
        return {value: convertUnit(value, "b", "kb"), unit: "kb" as Unit}
    }
    if(value < conversionRate.gb){
        return {value: convertUnit(value, "b", "mb"), unit: "mb" as Unit}
    }
    return {value: convertUnit(value, "b", "gb"), unit: "gb" as Unit}
}