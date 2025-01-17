const Alerta = ({alerta, className}) => {
    return (
    <div
        className={`${alerta.error ? "from-red-400 to-red-600" : "from-indigo-400 to-indigo-600"} 
        bg-gradient-to-r p-3 rounded-xl uppercase text-white font-bold text-center text-sm ${className}`}
    >
        {alerta.msg}
    </div>
    )
};

export default Alerta
