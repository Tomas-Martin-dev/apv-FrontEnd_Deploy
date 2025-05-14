const Alerta = ({alerta, className}) => {
    return (
    <div
        className={`${alerta.error ? "from-red-400 to-red-600" : alerta.alert ? "from-amber-200 to-amber-200" : alerta.msgg ? "bg-slate-100 border border-slate-100 font-semibold !text-neutral-500" : "from-indigo-400 to-indigo-600"} 
        bg-gradient-to-r p-3 rounded-xl uppercase text-white font-bold text-center text-sm ${className}`}
    >
        {alerta.msg}
    </div>
    )
};

export default Alerta
