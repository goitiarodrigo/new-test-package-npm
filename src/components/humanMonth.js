const months_l = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const months_s = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

let humanMonth = (month, format) => {
    return (format === "long") ? months_l[month] : months_s[month]
};

export { humanMonth}