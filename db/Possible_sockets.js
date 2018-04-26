let possibleAMDSockets = ['AM4'];

let possibleIntelSockets = ['1151'];

let AmdProcHunt = (cpu_socket) => {
   return possibleAMDSockets.includes(cpu_socket);
};

let IntelProcHunt = (cpu_socket) => {
    return possibleIntelSockets.includes(cpu_socket);
};

module.exports = {
    AmdProcHunt,
    IntelProcHunt
};
